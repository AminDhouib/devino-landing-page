// app/api/applications/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { FormConfig } from '~/lib/forms/form-types';
import { jobs } from '~/data/jobs';
import { ApplicationScorer } from '~/lib/application-scorer';
import { sendEmail } from '~/lib/emails/sendEmail';
import { applicantEmail, hrNotificationEmail } from '~/lib/emails/templates';

// Ensure this route runs on the server side
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const positionId = formData.get('positionId') as string;
    const responsesJson = formData.get('responses') as string;
    const formName = formData.get('formName') as string || 'ai-engineer-application';

    console.log('API Request received:', { positionId, formName });

    if (!positionId || !responsesJson) {
      return NextResponse.json({ 
        error: 'Missing required fields: positionId and responses' 
      }, { status: 400 });
    }

    // Parse responses
    let responses: Record<string, any>;
    try {
      responses = JSON.parse(responsesJson);
    } catch {
      return NextResponse.json({ 
        error: 'Invalid responses format' 
      }, { status: 400 });
    }

    // Extract applicant info
    const applicantEmail = responses.contact_email || responses.email as string;
    const applicantName = responses.full_name || responses.fullName || responses.name as string;

    if (!applicantEmail || !applicantName) {
      console.log('Missing fields:', { applicantEmail, applicantName, availableFields: Object.keys(responses) });
      return NextResponse.json({ 
        error: 'Missing required applicant information',
        details: `Email: ${!!applicantEmail}, Name: ${!!applicantName}`,
        availableFields: Object.keys(responses)
      }, { status: 400 });
    }

    // Get or create job form in database
    let jobForm = await prisma.jobForm.findFirst({
      where: { positionId: positionId },
      include: {
        sections: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!jobForm) {
      // Create job form based on the configuration
      const formConfig = getFormConfig(formName);
      if (!formConfig) {
        return NextResponse.json({ 
          error: 'Unknown form configuration' 
        }, { status: 400 });
      }

      jobForm = await prisma.jobForm.create({
        data: {
          positionId: positionId,
          title: formConfig.title,
          description: formConfig.description,
          status: 'PUBLISHED',
          sections: {
            create: formConfig.sections.map((section, sectionIndex) => ({
              title: section.title,
              description: section.description,
              order: sectionIndex,
              questions: {
                create: section.questions.map((question, questionIndex) => ({
                  key: question.fieldKey,
                  label: question.label,
                  description: question.description,
                  type: question.fieldType,
                  required: question.required,
                  order: questionIndex,
                  validation: question.validation || {},
                  weight: question.weight || 1,
                  scoring: {
                    type: question.scoreType || 'COMPLETION'
                  }
                }))
              }
            }))
          }
        },
        include: {
          sections: {
            include: {
              questions: true
            }
          }
        }
      });
    }

    // Process file uploads
    const fileRecords: Array<{
      questionKey: string;
      originalName: string;
      fileName: string;
      filePath: string;
      mimeType: string;
      fileSize: number;
    }> = [];
    const uploadDir = 'uploads/applications';
    
    // Create upload directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Process each file upload
    const formDataEntries = Array.from(formData.entries());
    for (const [key, value] of formDataEntries) {
      if (key.startsWith('file_') && value instanceof File) {
        const fieldKey = key.replace('file_', '');
        const fileName = `${Date.now()}_${value.name}`;
        const filePath = path.join(uploadDir, fileName);
        
        // Save file
        const buffer = await value.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));
        
        // Find question for this field
        const question = jobForm.sections
          .flatMap((s: any) => s.questions)
          .find((q: any) => q.key === fieldKey);
        
        if (question) {
          fileRecords.push({
            questionKey: fieldKey,
            originalName: value.name,
            fileName,
            filePath,
            mimeType: value.type || 'application/octet-stream',
            fileSize: value.size || 0
          });
        }
      }
    }

    // Calculate score using existing ApplicationScorer
    const applicationResponses = Object.entries(responses).map(([fieldKey, value]) => {
      const question = jobForm!.sections
        .flatMap((s: any) => s.questions)
        .find((q: any) => q.key === fieldKey);
      
      return {
        questionId: question?.id || fieldKey,
        value: value
      };
    });

    // Convert jobForm to ApplicationConfig format for scorer
    const applicationConfig = {
      positionId: positionId,
      positionTitle: getPositionTitle(positionId),
      requiredDocuments: [], // Add if needed
      sections: jobForm.sections.map((section: any) => ({
        ...section,
        questions: section.questions.map((q: any) => ({
          id: q.key,
          type: q.type.toLowerCase(),
          weight: q.weight || 1,
          validation: q.validation,
          options: q.options
        }))
      }))
    };

    const score = await ApplicationScorer.calculateScore(applicationResponses, applicationConfig);

    // Create application record in database
    const application = await prisma.jobApplication.create({
      data: {
        formId: jobForm.id,
        email: applicantEmail,
        name: applicantName,
        score,
        status: 'PENDING',
        answers: {
          create: Object.entries(responses).map(([fieldKey, value]) => {
            const question = jobForm!.sections
              .flatMap((s: any) => s.questions)
              .find((q: any) => q.key === fieldKey);
            
            if (!question) return null;

            return {
              questionId: question.id,
              value: value
            };
          }).filter(Boolean) as any[]
        },
        files: {
          create: fileRecords.map(file => ({
            questionKey: file.questionKey,
            originalName: file.originalName,
            fileName: file.fileName,
            filePath: file.filePath,
            fileSize: file.fileSize,
            mimeType: file.mimeType
          }))
        }
      },
      include: {
        answers: true,
        files: true
      }
    });

    // Send confirmation emails
    try {
      await sendApplicationConfirmation({
        id: application.id,
        name: applicantName,
        email: applicantEmail,
        positionTitle: getPositionTitle(positionId),
        score: score,
        submittedAt: new Date()
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the application if email fails
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      applicantName,
      score,
      positionTitle: getPositionTitle(positionId),
      submittedAt: application.submittedAt.toISOString(),
    }, { status: 201 });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

function getFormConfig(formName: string): FormConfig | null {
  console.log('Looking for form config with name:', formName);
  console.log('Available jobs:', jobs.map(j => ({ id: j.id, formConfigId: j.formConfig?.id })));
  
  // Try multiple strategies to find the form config
  let job = jobs.find((j: any) => j.formConfig?.id === formName);
  
  if (!job) {
    // Try without the -application suffix
    const baseFormName = formName.replace('-application', '');
    job = jobs.find((j: any) => j.id === baseFormName);
  }
  
  if (!job) {
    // Try direct ID match
    job = jobs.find((j: any) => j.id === formName);
  }
  
  if (!job) {
    // Fallback to first job with a form config
    job = jobs.find((j: any) => j.formConfig);
  }
  
  console.log('Found job:', job?.id, 'with formConfig:', !!job?.formConfig);
  return job?.formConfig || null;
}

function getPositionTitle(positionId: string): string {
  const job = jobs.find((j: any) => j.id === positionId);
  return job?.meta?.title || 'Software Engineer';
}

async function sendApplicationConfirmation(application: {
  id: string;
  name: string;
  email: string;
  positionTitle: string;
  score: number;
  submittedAt: Date;
}) {
  try {
    // Send confirmation email to applicant
    const applicantEmailContent = applicantEmail({
      name: application.name,
      positionTitle: application.positionTitle,
      applicationId: application.id
    });

    await sendEmail({
      to: application.email,
      subject: `Application Received - ${application.positionTitle} Position`,
      html: applicantEmailContent,
    });

    // Send notification to HR team
    const hrEmailContent = hrNotificationEmail({
      applicantName: application.name,
      positionTitle: application.positionTitle,
      score: application.score,
      applicationId: application.id,
      applicantEmail: application.email
    });

    const hrEmail = process.env.HR_EMAIL || process.env.SMTP_FROM_ADDRESS;
    if (hrEmail) {
      await sendEmail({
        to: hrEmail,
        subject: `New Application: ${application.name} - ${application.positionTitle} (Score: ${application.score}%)`,
        html: hrEmailContent,
      });
    }

    console.log(`Confirmation emails sent for application ${application.id}`);
  } catch (error) {
    console.error('Failed to send confirmation emails:', error);
    throw error;
  }
}

// GET endpoint to retrieve applications (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');
    const positionId = searchParams.get('positionId');

    // Build where clause
    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (positionId) {
      where.form = { positionId: positionId };
    }

    // Fetch applications from database
    const applications = await prisma.jobApplication.findMany({
      where,
      include: {
        answers: {
          include: {
            question: true
          }
        },
        files: true,
        form: {
          include: {
            sections: {
              include: {
                questions: true
              }
            }
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      },
      skip: offset,
      take: limit
    });

    const total = await prisma.jobApplication.count({ where });

    return NextResponse.json({
      applications,
      total,
      limit,
      offset,
    });

  } catch (error) {
    console.error('Error retrieving applications:', error);
    return NextResponse.json({
      error: 'Failed to retrieve applications'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

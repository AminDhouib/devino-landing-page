// app/api/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getJobById } from '~/data/jobs';
import { Scorer } from '~/lib/scoring/scorer';
import { ApplicationResponse } from '~/lib/scoring/types';
import { sendEmail } from '~/lib/emails/sendEmail';
import { applicantEmail as applicantEmailTpl, hrNotificationEmail } from '~/lib/emails/templates';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const positionId = formData.get('positionId') as string;
        const responsesJson = formData.get('responses') as string;

        if (!positionId || !responsesJson) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get job definition
        const job = getJobById(positionId);
        if (!job) {
            return NextResponse.json({ error: 'Invalid position ID' }, { status: 400 });
        }

        console.log(`Processing application for ${job.meta.title}`);

        // Parse responses
        let responses: ApplicationResponse[];
        try {
            responses = JSON.parse(responsesJson);
        } catch {
            return NextResponse.json({ error: 'Invalid responses format' }, { status: 400 });
        }

        // Process file uploads
        const attachments = await processFileUploads(formData, responses);

        // Calculate score using the clean scorer
        const score = await Scorer.score(job, responses);

        // Generate application ID
        const applicationId = `APP_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        // Extract applicant details
        const applicantName = getApplicantName(responses);
        const applicantEmail = getApplicantEmail(responses);

        if (!applicantEmail) {
            return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
        }

        // Send notifications
        await sendNotifications({
            job,
            applicantName,
            applicantEmail,
            applicationId,
            score,
            attachments,
        });

        console.log(`Application submitted: ${applicationId}, Score: ${score}%`);

        return NextResponse.json({
            success: true,
            applicationId,
            applicantName,
            score,
            positionTitle: job.meta.title,
            submittedAt: new Date().toISOString(),
        }, { status: 201 });

    } catch (error) {
        console.error('Application submission error:', error);

        if (error instanceof Error && error.message.includes('AI')) {
            return NextResponse.json({
                error: 'Evaluation service temporarily unavailable. Please try again.'
            }, { status: 503 });
        }

        return NextResponse.json({
            error: 'Application submission failed. Please try again.'
        }, { status: 500 });
    }
}

/* ---------- Helper Functions ---------- */

async function processFileUploads(
    formData: FormData,
    responses: ApplicationResponse[]
): Promise<Array<{ filename: string; content: Buffer; contentType: string }>> {
    const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

    for (const [key, value] of Array.from(formData.entries())) {
        if (key.startsWith('file_') && value instanceof File) {
            const questionId = key.replace('file_', '');

            try {
                const fileBuffer = Buffer.from(await value.arrayBuffer());

                // Basic validation
                if (fileBuffer.length === 0) {
                    console.warn(`Empty file for question ${questionId}`);
                    continue;
                }

                if (fileBuffer.length > 5 * 1024 * 1024) { // 5MB limit
                    console.warn(`File too large for question ${questionId}: ${fileBuffer.length} bytes`);
                    continue;
                }

                attachments.push({
                    filename: value.name,
                    content: fileBuffer,
                    contentType: value.type || 'application/octet-stream',
                });

                // Update response with file metadata
                const responseIndex = responses.findIndex(r => r.questionId === questionId);
                if (responseIndex !== -1) {
                    responses[responseIndex].value = {
                        filename: value.name,
                        size: value.size,
                        type: value.type,
                        uploadedAt: new Date().toISOString()
                    } as any;
                }

            } catch (fileError) {
                console.error(`Error processing file for question ${questionId}:`, fileError);
            }
        }
    }

    return attachments;
}

function getApplicantName(responses: ApplicationResponse[]): string {
    const firstName = responses.find(r => r.questionId === 'firstName')?.value || '';
    const lastName = responses.find(r => r.questionId === 'lastName')?.value || '';
    return `${firstName} ${lastName}`.trim();
}

function getApplicantEmail(responses: ApplicationResponse[]): string | null {
    const email = responses.find(r => r.questionId === 'email')?.value as string;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return null;
    }
    return email;
}

interface NotificationParams {
    job: any;
    applicantName: string;
    applicantEmail: string;
    applicationId: string;
    score: number;
    attachments: Array<{ filename: string; content: Buffer; contentType: string }>;
}

async function sendNotifications(params: NotificationParams): Promise<void> {
    const { job, applicantName, applicantEmail, applicationId, score, attachments } = params;

    try {
        // Send confirmation email to applicant
        await sendEmail({
            to: applicantEmail,
            subject: `Application Received - ${job.meta.title} at Devino`,
            html: applicantEmailTpl({
                name: applicantName,
                positionTitle: job.meta.title,
                applicationId
            }),
        });

        console.log(`Confirmation email sent to ${applicantEmail}`);

        // Send HR notification if score meets threshold
        const hrThreshold = parseInt(process.env.HR_EMAIL_THRESHOLD || '70', 10);

        if (score >= hrThreshold) {
            const scoreCategory = getScoreCategory(score);

            await sendEmail({
                to: process.env.HR_EMAIL || 'aladdin@devino.ca',
                subject: `${scoreCategory} Application: ${job.meta.title} - ${applicantName} (${score}%)`,
                html: hrNotificationEmail({
                    applicantName,
                    positionTitle: job.meta.title,
                    score,
                    applicationId,
                    applicantEmail,
                }),
                attachments: attachments.length > 0 ? attachments : undefined,
            });

            console.log(`HR notification sent for ${scoreCategory.toLowerCase()} candidate: ${score}%`);
        } else {
            console.log(`Score ${score}% below threshold ${hrThreshold}%, no HR notification sent`);
        }

    } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the application submission if email fails
    }
}

function getScoreCategory(score: number): string {
    if (score >= 85) return '🌟 Exceptional';
    if (score >= 75) return '⭐ Strong';
    return '👍 Good';
}
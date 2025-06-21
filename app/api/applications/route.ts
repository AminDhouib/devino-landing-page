// app/api/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {applicationConfigs, ApplicationScorer} from "~/lib/application-config";
import {applicantEmail, hrNotificationEmail} from "~/lib/emails/templates";
import {sendEmail} from "~/lib/emails/sendEmail";

// Force this API route to use Node.js runtime instead of Edge Runtime
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const positionId = formData.get('positionId') as string;
        const responsesJson = formData.get('responses') as string;

        if (!positionId || !responsesJson) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const responses = JSON.parse(responsesJson);
        const config = applicationConfigs[positionId];
        if (!config) {
            return NextResponse.json({ error: 'Invalid position' }, { status: 400 });
        }

        const score = ApplicationScorer.calculateScore(responses, config);
        const applicationId = `DEV_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        const firstName = responses.find((r: any) => r.questionId === 'firstName')?.value || '';
        const lastName = responses.find((r: any) => r.questionId === 'lastName')?.value || '';
        const email = responses.find((r: any) => r.questionId === 'email')?.value || '';
        const applicantName = `${firstName} ${lastName}`.trim();

        // Validate email before proceeding
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
        }

        // Collect file attachments
        const attachments: Array<{
            filename: string;
            content: Buffer;
            contentType: string;
        }> = [];

        // Process uploaded files
        for (const [key, value] of Array.from(formData.entries())) {
            if (key.startsWith('file_') && value instanceof File) {
                const questionId = key.replace('file_', '');
                const fileBuffer = Buffer.from(await value.arrayBuffer());

                attachments.push({
                    filename: value.name,
                    content: fileBuffer,
                    contentType: value.type || 'application/octet-stream'
                });

                // Update the response to include file info
                const responseIndex = responses.findIndex((r: any) => r.questionId === questionId);
                if (responseIndex !== -1) {
                    responses[responseIndex].value = {
                        filename: value.name,
                        size: value.size,
                        type: value.type
                    };
                }
            }
        }

        try {
            // Send confirmation email to applicant (no attachments needed)
            console.log('Sending email to applicant:', email);
            await sendEmail({
                to: email,
                subject: `Application Received - ${config.positionTitle} at Devino`,
                html: applicantEmail({
                    name: applicantName,
                    positionTitle: config.positionTitle,
                    applicationId
                })
            });

            // Send notification email to HR with attachments
            // if HR_EMAIL_THRESHOLD is set, only send if score exceeds threshold
            console.log('Sending email to HR with attachments:', attachments.length);

            if(score >  parseInt(process.env.HR_EMAIL_THRESHOLD as string, 10)) {
                await sendEmail({
                    to: 'aladdin@devino.ca',
                    subject: `${score >= 85 ? '🌟 High-Score' : 'New'} Application: ${config.positionTitle} - ${applicantName}`,
                    html: hrNotificationEmail({
                        applicantName,
                        positionTitle: config.positionTitle,
                        score,
                        applicationId,
                        applicantEmail: email
                    }),
                    attachments: attachments.length > 0 ? attachments : undefined
                });
            }


            console.log('Emails sent successfully');

        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the entire request if email fails
        }

        return NextResponse.json({
            success: true,
            applicationId,
            applicantName,
            score
        }, { status: 201 });

    } catch (error) {
        console.error('Application API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
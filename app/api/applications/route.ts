import { NextRequest, NextResponse } from 'next/server';
import { applicationConfigs } from '~/lib/application-config';
import { ApplicationScorer } from '~/lib/application-scorer';
import { applicantEmail, hrNotificationEmail } from '~/lib/emails/templates';
import { sendEmail } from '~/lib/emails/sendEmail';

/* Node runtime still required */
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

        /* ---------- uses new async scorer ---------- */
        const score = await ApplicationScorer.calculateScore(responses, config);

        const applicationId = `DEV_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        const firstName = responses.find((r: any) => r.questionId === 'firstName')?.value || '';
        const lastName  = responses.find((r: any) => r.questionId === 'lastName')?.value || '';
        const email     = responses.find((r: any) => r.questionId === 'email')?.value || '';
        const applicantName = `${firstName} ${lastName}`.trim();

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
        }

        /* ------------ file handling unchanged ------------ */
        const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

        for (const [key, value] of Array.from(formData.entries())) {
            if (key.startsWith('file_') && value instanceof File) {
                const questionId = key.replace('file_', '');
                const fileBuffer = Buffer.from(await value.arrayBuffer());

                attachments.push({
                    filename: value.name,
                    content: fileBuffer,
                    contentType: value.type || 'application/octet-stream',
                });

                const idx = responses.findIndex((r: any) => r.questionId === questionId);
                if (idx !== -1) {
                    responses[idx].value = { filename: value.name, size: value.size, type: value.type };
                }
            }
        }

        /* ------------ email sending unchanged ------------ */
        try {
            await sendEmail({
                to: email,
                subject: `Application Received - ${config.positionTitle} at Devino`,
                html: applicantEmail({ name: applicantName, positionTitle: config.positionTitle, applicationId }),
            });

            if (score > parseInt(process.env.HR_EMAIL_THRESHOLD as string, 10)) {
                await sendEmail({
                    to: 'hello@devino.ca',
                    subject: `${score >= 85 ? '🌟 High‑Score' : 'New'} Application: ${config.positionTitle} - ${applicantName}`,
                    html: hrNotificationEmail({
                        applicantName,
                        positionTitle: config.positionTitle,
                        score,
                        applicationId,
                        applicantEmail: email,
                    }),
                    attachments: attachments.length ? attachments : undefined,
                });
            }
        } catch (err) {
            console.error('Email send failed', err);
        }

        return NextResponse.json({ success: true, applicationId, applicantName, score }, { status: 201 });
    } catch (err) {
        console.error('Application API error', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

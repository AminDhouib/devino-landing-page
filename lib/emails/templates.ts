// lib/emails/templates.ts
import { emailTemplate } from './base-template';

interface ApplicantEmailProps {
    name: string;
    positionTitle: string;
    applicationId: string;
}

export function applicantEmail({ name, positionTitle, applicationId }: ApplicantEmailProps): string {
    const content = `
        <h1>Application Received! 🎉</h1>
        <p>Assalamu Alaikum ${name},</p>
        <p>Jazakallahu khair for applying for the <strong>${positionTitle}</strong> position at Devino!</p>
        
        <div class="info-box">
            <h2>📋 Application Details</h2>
            <p><strong>Position:</strong> ${positionTitle}</p>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <p>We've received your application and our team will review it carefully. We'll reach out if your qualifications match what we're looking for.</p>

        <h2>🌟 What We're Looking For:</h2>
        <ul>
            <li>Technical excellence and problem-solving skills</li>
            <li>Alignment with our Islamic values and remote culture</li>
            <li>Passion for learning and growth</li>
            <li>Strong communication and collaboration abilities</li>
        </ul>

        <p>Thank you for your interest in joining the Devino family. We appreciate the time you took to apply.</p>

        <p>Barakallahu feek,</p>
        <p><strong>The Devino Careers Team</strong></p>
    `;

    return emailTemplate(content);
}

interface HRNotificationEmailProps {
    applicantName: string;
    positionTitle: string;
    score: number;
    applicationId: string;
    applicantEmail: string;
}

export function hrNotificationEmail({
                                        applicantName,
                                        positionTitle,
                                        score,
                                        applicationId,
                                        applicantEmail
                                    }: HRNotificationEmailProps): string {
    const content = `
        <h1>${score >= 85 ? '🌟 High-Score' : '📋 New'} Application</h1>
        <p>Assalamu Alaikum Team,</p>
        <p>New application received for <strong>${positionTitle}</strong>:</p>
        
        <div class="info-box">
            <h2>👤 Candidate Information</h2>
            <p><strong>Name:</strong> ${applicantName}</p>
            <p><strong>Email:</strong> ${applicantEmail}</p>
            <p><strong>Position:</strong> ${positionTitle}</p>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <div class="score-badge">Score: ${score}/100</div>
        </div>

        ${score >= 85 ? `
        <div class="info-box" style="border-left-color: #10b981; background: #ecfdf5;">
            <h2>⚡ Priority Review Recommended</h2>
            <p>This candidate scored above our threshold and should be reviewed immediately.</p>
        </div>
        ` : ''}

        <p>Please review the application details and proceed with your standard evaluation process.</p>

        <p>Barakallahu feekum,</p>
        <p><strong>Devino Hiring System</strong></p>
    `;

    return emailTemplate(content);
}
// lib/emails/sendEmail.ts
import nodemailer from "nodemailer";

interface EmailAttachment {
    filename: string;
    content: Buffer;
    contentType: string;
}

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    attachments?: EmailAttachment[];
}

export async function sendEmail({ to, subject, html, attachments }: EmailOptions) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions: nodemailer.SendMailOptions = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_ADDRESS}>`,
        to,
        subject,
        html,
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
        mailOptions.attachments = attachments.map(attachment => ({
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType
        }));
    }

    await transporter.sendMail(mailOptions);
}
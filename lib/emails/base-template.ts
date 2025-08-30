// lib/emails/base-template.ts
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://devino.ca";

export function emailTemplate(content: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Devino Careers</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          color: #1e293b;
          line-height: 1.6;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          padding: 32px 24px;
          text-align: center;
        }
        .logo {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          margin-bottom: 12px;
          position: relative;
        }
        .logo::before {
          content: '💻';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 28px;
        }
        .brand-name {
          color: white;
          font-size: 28px;
          font-weight: bold;
          margin: 0;
        }
        .tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin: 4px 0 0 0;
        }
        .content {
          padding: 40px 32px;
        }
        .content h1 {
          font-size: 28px;
          margin-bottom: 24px;
          color: #1e293b;
          font-weight: bold;
        }
        .content h2 {
          font-size: 22px;
          margin: 32px 0 16px 0;
          color: #1e40af;
          font-weight: 600;
        }
        .content p {
          font-size: 16px;
          color: #374151;
          margin-bottom: 16px;
        }
        .content ul {
          margin: 16px 0;
          padding-left: 20px;
        }
        .content li {
          margin-bottom: 8px;
          color: #374151;
        }
        .info-box {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 20px;
          margin: 16px 0;
          border-left: 4px solid #3b82f6;
        }
        .score-badge {
          background: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
          font-weight: bold;
          margin: 10px 0;
        }
        .footer {
          padding: 32px 24px;
          text-align: center;
          background: #f8fafc;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          font-size: 14px;
          color: #6b7280;
          margin: 8px 0;
        }
        @media only screen and (max-width: 600px) {
          .container { margin: 10px; }
          .header { padding: 24px 16px; }
          .content { padding: 24px 20px; }
          .content h1 { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <table class="container" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="header">
            <div class="logo"></div>
            <h1 class="brand-name">Devino</h1>
            <p class="tagline">Anticipating Tomorrow's Challenges</p>
          </td>
        </tr>
        <tr>
          <td class="content">
            ${content}
          </td>
        </tr>
        <tr>
          <td class="footer">
            <p><strong>Devino</strong> - Software Development Company</p>
            <p>&copy; ${new Date().getFullYear()} Devino Solutions. All rights reserved.</p>
            <p>📧 careers@devino.ca | 🌐 devino.ca</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
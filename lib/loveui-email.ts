const emailShellWidth = 560;

type LoveUIEmailAction = {
  href: string;
  label: string;
};

type LoveUIEmailBadge = {
  label: string;
  variant?: 'pro' | 'team' | 'enterprise' | 'neutral';
};

type LoveUIEmailOptions = {
  action?: LoveUIEmailAction;
  body: string;
  eyebrow?: LoveUIEmailBadge;
  footer?: string;
  title: string;
};

export function getLoveUIAppUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.BETTER_AUTH_URL ??
    'https://www.loveui.dev'
  ).replace(/\/$/, '');
}

export function renderLoveUIOtpEmail({ otp }: { otp: string }) {
  return {
    subject: 'Your LoveUI login code',
    text: `Your LoveUI login code is ${otp}. It expires in 5 minutes.`,
    html: renderLoveUIEmail({
      eyebrow: {
        label: 'Pro',
        variant: 'pro',
      },
      title: 'Your login code',
      body: `
        <p style="${paragraphStyle}">
          Use this code to finish signing in to LoveUI Pro.
        </p>
        ${renderOtpCode(otp)}
        <p style="${mutedParagraphStyle}">
          This code expires in 5 minutes. If you did not request it, you can ignore this email.
        </p>
      `,
      footer: 'LoveUI Pro access is tied to the email used for your plan.',
    }),
  };
}

export function renderLoveUITeamInvitationEmail({
  invitationUrl,
  memberEmail,
  ownerEmail,
}: {
  invitationUrl: string;
  memberEmail: string;
  ownerEmail: string;
}) {
  const safeMemberEmail = escapeHtml(memberEmail);
  const safeOwnerEmail = escapeHtml(ownerEmail);

  return {
    subject: 'Accept your LoveUI Pro invitation',
    text: `${ownerEmail} invited you to LoveUI Pro. Open ${invitationUrl} to verify access, then sign in with ${memberEmail}.`,
    html: renderLoveUIEmail({
      eyebrow: {
        label: 'Team',
        variant: 'team',
      },
      title: 'Accept your LoveUI Pro invitation',
      body: `
        <p style="${paragraphStyle}">
          <strong style="color: #111111;">${safeOwnerEmail}</strong> invited you to LoveUI Pro.
        </p>
        <p style="${mutedParagraphStyle}">
          Verify access for <strong style="color: #111111;">${safeMemberEmail}</strong>, then sign in to use LoveUI Pro.
        </p>
      `,
      action: {
        href: invitationUrl,
        label: 'Accept invitation',
      },
      footer: 'This invitation is for the email address shown above.',
    }),
  };
}

function renderLoveUIEmail({
  action,
  body,
  eyebrow,
  footer,
  title,
}: LoveUIEmailOptions) {
  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin: 0; padding: 0; background: #ffffff; color: #111111; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #ffffff; border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width: 100%; max-width: ${emailShellWidth}px; border-collapse: collapse;">
            <tr>
              <td style="border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; padding: 28px 0 30px;">
                ${renderBrand()}
                ${eyebrow ? renderBadge(eyebrow) : ''}
                <h1 style="margin: 14px 0 0; color: #0a0a0a; font-size: 34px; line-height: 1.08; font-weight: 650; letter-spacing: 0;">
                  ${escapeHtml(title)}
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 28px 0 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e5e5e5; border-radius: 16px; border-collapse: separate; overflow: hidden;">
                  <tr>
                    <td style="padding: 28px;">
                      ${body}
                      ${action ? renderButton(action) : ''}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${
              footer
                ? `<tr><td style="padding: 18px 0 0;"><p style="${footerStyle}">${escapeHtml(footer)}</p></td></tr>`
                : ''
            }
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

function renderBrand() {
  const appUrl = getLoveUIAppUrl();
  const logoUrl = `${appUrl}/logo.png`;

  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
      <tr>
        <td style="width: 32px;">
          <a href="${escapeHtml(appUrl)}" style="display: block; text-decoration: none;">
            <img alt="LoveUI" height="32" src="${escapeHtml(logoUrl)}" width="32" style="display: block; height: 32px; width: 32px; border: 0; border-radius: 8px;">
          </a>
        </td>
        <td style="padding-left: 10px; color: #111111; font-size: 15px; line-height: 1; font-weight: 650;">LoveUI</td>
      </tr>
    </table>
  `;
}

function renderBadge({ label, variant = 'neutral' }: LoveUIEmailBadge) {
  const colors: Record<NonNullable<LoveUIEmailBadge['variant']>, string> = {
    enterprise: '#d97706',
    neutral: '#171717',
    pro: '#0d74fd',
    team: '#059669',
  };

  return `
    <div style="display: inline-block; margin-top: 22px; border-radius: 3px; background: ${colors[variant]}; color: #ffffff; padding: 4px 7px; font-size: 10px; line-height: 1; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase;">
      ${escapeHtml(label)}
    </div>
  `;
}

function renderButton({ href, label }: LoveUIEmailAction) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 24px; border-collapse: collapse;">
      <tr>
        <td style="border-radius: 8px; background: #171717; box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);">
          <a href="${escapeHtml(href)}" style="display: inline-block; padding: 12px 16px; color: #ffffff; font-size: 14px; line-height: 1; font-weight: 650; text-decoration: none;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

function renderOtpCode(otp: string) {
  const safeOtp = escapeHtml(otp);

  return `
    <div style="margin: 22px 0; border: 1px solid #e5e5e5; border-radius: 12px; background: #fafafa; padding: 18px 20px; text-align: center;">
      <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; color: #0a0a0a; font-size: 36px; line-height: 1; font-weight: 700; letter-spacing: 0.18em;">
        ${safeOtp}
      </div>
    </div>
  `;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const paragraphStyle =
  'margin: 0 0 14px; color: #171717; font-size: 16px; line-height: 1.6; font-weight: 400;';
const mutedParagraphStyle =
  'margin: 0; color: #737373; font-size: 14px; line-height: 1.6; font-weight: 400;';
const footerStyle =
  'margin: 0; color: #737373; font-size: 12px; line-height: 1.5;';

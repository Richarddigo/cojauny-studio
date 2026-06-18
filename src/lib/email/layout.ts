import { BRAND } from './brand-tokens';
import { escapeHtml } from '../email';

export interface EmailLayoutOptions {
  preheader?: string;
  badge: string;
  title: string;
  bodyHtml: string;
  footer?: string;
  cta?: { label: string; href: string };
}

export function wrapEmailHtml(options: EmailLayoutOptions): string {
  const { preheader, badge, title, bodyHtml, footer, cta } = options;

  const ctaBlock = cta
    ? `<div style="margin-top: 28px; text-align: center;">
        <a href="${escapeHtml(cta.href)}" style="display: inline-block; background: ${BRAND.accent}; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 12px;">${escapeHtml(cta.label)}</a>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${preheader ? `<span style="display:none;max-height:0;overflow:hidden;color:transparent;">${escapeHtml(preheader)}</span>` : ''}
</head>
<body style="margin:0;padding:24px;background:#0a0e18;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px;background:${BRAND.bg};color:${BRAND.text};border-radius:16px;border:1px solid ${BRAND.border};">
    <div style="margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid ${BRAND.border};">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.accent};margin-bottom:8px;">${escapeHtml(badge)}</div>
      <h1 style="margin:0;font-size:22px;font-weight:700;line-height:1.3;color:${BRAND.text};">${escapeHtml(title)}</h1>
    </div>
    <div style="font-size:15px;line-height:1.65;color:${BRAND.muted};">
      ${bodyHtml}
    </div>
    ${ctaBlock}
    <p style="margin-top:32px;padding-top:20px;border-top:1px solid ${BRAND.border};font-size:12px;color:${BRAND.faint};line-height:1.5;">
      ${escapeHtml(footer ?? `Cojauny Studio · ${BRAND.siteUrl}`)}
    </p>
  </div>
</body>
</html>`;
}

export function emailCard(html: string): string {
  return `<div style="background:${BRAND.surface};border-radius:12px;padding:18px;border:1px solid ${BRAND.border};margin:16px 0;">${html}</div>`;
}

export function emailLabel(text: string): string {
  return `<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.accent};">${escapeHtml(text)}</p>`;
}

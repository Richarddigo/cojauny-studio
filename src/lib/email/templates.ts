import { BRAND, resolveEmailLocale, type EmailLocale } from './brand-tokens';
import { escapeHtml } from '../email';
import { emailCard, emailLabel, wrapEmailHtml } from './layout';

const typeLabels: Record<EmailLocale, Record<string, string>> = {
  en: {
    app: 'App Development',
    web: 'Web Development',
    consulting: 'Technical Consulting',
    other: 'Other',
  },
  es: {
    app: 'Desarrollo de apps',
    web: 'Desarrollo web',
    consulting: 'Consultoría técnica',
    other: 'Otro',
  },
  de: {
    app: 'App-Entwicklung',
    web: 'Web-Entwicklung',
    consulting: 'Technische Beratung',
    other: 'Sonstiges',
  },
  fr: {
    app: 'Développement d\'applications',
    web: 'Développement web',
    consulting: 'Conseil technique',
    other: 'Autre',
  },
};

const userCopy: Record<
  EmailLocale,
  {
    subject: string;
    preheader: string;
    badge: string;
    title: (name: string) => string;
    body: string;
    summaryLabel: string;
    cta: string;
    footer: string;
  }
> = {
  en: {
    subject: 'We received your message — Cojauny Studio',
    preheader: 'Thanks for contacting Cojauny Studio.',
    badge: 'Cojauny Studio',
    title: (name) => `Thank you, ${name}`,
    body: 'We have received your enquiry and will get back to you within 48 hours. In the meantime, feel free to explore our work at studio.cojauny.com.',
    summaryLabel: 'Your message',
    cta: 'Visit Cojauny Studio',
    footer: 'Cojauny Studio · Building software that matters · studio.cojauny.com',
  },
  es: {
    subject: 'Hemos recibido tu mensaje — Cojauny Studio',
    preheader: 'Gracias por contactar con Cojauny Studio.',
    badge: 'Cojauny Studio',
    title: (name) => `Gracias, ${name}`,
    body: 'Hemos recibido tu consulta y te responderemos en un plazo de 48 horas. Mientras tanto, puedes conocer nuestro trabajo en studio.cojauny.com.',
    summaryLabel: 'Tu mensaje',
    cta: 'Visitar Cojauny Studio',
    footer: 'Cojauny Studio · Construimos software que importa · studio.cojauny.com',
  },
  de: {
    subject: 'Wir haben deine Nachricht erhalten — Cojauny Studio',
    preheader: 'Danke für deine Nachricht an Cojauny Studio.',
    badge: 'Cojauny Studio',
    title: (name) => `Danke, ${name}`,
    body: 'Wir haben deine Anfrage erhalten und melden uns innerhalb von 48 Stunden. In der Zwischenzeit kannst du unsere Arbeit auf studio.cojauny.com ansehen.',
    summaryLabel: 'Deine Nachricht',
    cta: 'Cojauny Studio besuchen',
    footer: 'Cojauny Studio · Software, die zählt · studio.cojauny.com',
  },
  fr: {
    subject: 'Nous avons reçu votre message — Cojauny Studio',
    preheader: 'Merci d\'avoir contacté Cojauny Studio.',
    badge: 'Cojauny Studio',
    title: (name) => `Merci, ${name}`,
    body: 'Nous avons bien reçu votre demande et vous répondrons sous 48 heures. En attendant, découvrez notre travail sur studio.cojauny.com.',
    summaryLabel: 'Votre message',
    cta: 'Visiter Cojauny Studio',
    footer: 'Cojauny Studio · Des logiciels qui comptent · studio.cojauny.com',
  },
};

const adminBadge: Record<EmailLocale, string> = {
  en: 'New enquiry via Cojauny Studio',
  es: 'Nueva consulta vía Cojauny Studio',
  de: 'Neue Anfrage über Cojauny Studio',
  fr: 'Nouvelle demande via Cojauny Studio',
};

const adminMessageLabel: Record<EmailLocale, string> = {
  en: 'Message',
  es: 'Mensaje',
  de: 'Nachricht',
  fr: 'Message',
};

export function getContactTypeLabel(type: string, locale: string): string {
  const loc = resolveEmailLocale(locale);
  return typeLabels[loc][type] ?? typeLabels.en[type] ?? type;
}

export function buildContactUserEmail(name: string, message: string, locale: string) {
  const loc = resolveEmailLocale(locale);
  const copy = userCopy[loc];

  const html = wrapEmailHtml({
    preheader: copy.preheader,
    badge: copy.badge,
    title: copy.title(name),
    bodyHtml: `
      <p style="margin:0 0 16px;color:${BRAND.text};">${escapeHtml(copy.body)}</p>
      ${emailCard(`${emailLabel(copy.summaryLabel)}<p style="margin:0;white-space:pre-wrap;color:${BRAND.text};">${escapeHtml(message)}</p>`)}
    `,
    cta: { label: copy.cta, href: BRAND.siteUrl },
    footer: copy.footer,
  });

  return { subject: copy.subject, html };
}

export function buildContactAdminEmail(data: {
  name: string;
  email: string;
  type: string;
  message: string;
  locale: string;
}) {
  const loc = resolveEmailLocale(data.locale);
  const typeLabel = getContactTypeLabel(data.type, data.locale);

  const html = wrapEmailHtml({
    badge: adminBadge[loc],
    title: data.name,
    bodyHtml: `
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr>
          <td style="padding:6px 12px 6px 0;color:${BRAND.faint};font-size:13px;width:120px;">Email</td>
          <td style="padding:6px 0;font-size:13px;"><a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND.accent};">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 12px 6px 0;color:${BRAND.faint};font-size:13px;">Type</td>
          <td style="padding:6px 0;font-size:13px;color:${BRAND.text};">${escapeHtml(typeLabel)}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px 6px 0;color:${BRAND.faint};font-size:13px;">Locale</td>
          <td style="padding:6px 0;font-size:13px;color:${BRAND.text};">${escapeHtml(data.locale)}</td>
        </tr>
      </table>
      ${emailCard(`${emailLabel(adminMessageLabel[loc])}<p style="margin:0;white-space:pre-wrap;color:${BRAND.text};">${escapeHtml(data.message)}</p>`)}
    `,
    footer: 'Sent from studio.cojauny.com contact form',
  });

  return {
    subject: `[Studio] New enquiry from ${data.name} — ${typeLabel}`,
    html,
  };
}

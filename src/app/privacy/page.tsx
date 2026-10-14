"use client";

import LegalPage from "@/components/internal/LegalPage";
import { useLanguage } from "@/i18n/LanguageProvider";

const content = {
  en: {
    label: "Legal", title: "Privacy Policy", updated: "Last updated: 2026",
    sections: [
      { title: "Information We Collect", body: "We may collect your name, email, company name, message details, and any information you voluntarily submit through our contact forms or email communications." },
      { title: "How We Use Information", body: "We use submitted information to respond to inquiries, evaluate partnership or funding opportunities, provide strategic advisory communication, improve our website, and maintain business records." },
      { title: "Funding & Partnership Requests", body: "If you contact us about funding, investment, acquisition, advisory, or partnership opportunities, we may review the information internally to determine whether there is a potential fit." },
      { title: "No Sale of Personal Data", body: "SEAINT Enterprise does not sell your personal information. We may share information only with trusted service providers, advisors, or legal professionals when necessary for business operations or compliance." },
      { title: "Data Security", body: "We use reasonable administrative and technical safeguards to protect submitted information. However, no online transmission or storage system can be guaranteed to be fully secure." },
      { title: "Cookies & Analytics", body: "Our website may use basic analytics or cookies to understand traffic, performance, and user interaction. You can control cookies through your browser settings." },
      { title: "Your Rights", body: "You may request access, correction, or deletion of information you have provided by contacting us at support@seaintenterprise.com." },
      { title: "Contact", body: "For privacy questions, email support@seaintenterprise.com." },
    ],
  },
  es: {
    label: "Legal", title: "Política de Privacidad", updated: "Última actualización: 2026",
    sections: [
      { title: "Información que Recopilamos", body: "Podemos recopilar tu nombre, correo electrónico, nombre de la empresa, detalles del mensaje y cualquier información que envíes voluntariamente mediante nuestros formularios de contacto o comunicaciones por correo electrónico." },
      { title: "Cómo Utilizamos la Información", body: "Utilizamos la información enviada para responder consultas, evaluar oportunidades de alianza o financiamiento, brindar comunicación de asesoría estratégica, mejorar nuestro sitio web y mantener registros comerciales." },
      { title: "Solicitudes de Capital y Alianzas", body: "Si nos contactas sobre oportunidades de financiamiento, inversión, adquisición, asesoría o alianza, podemos revisar la información internamente para determinar si existe compatibilidad potencial." },
      { title: "No Vendemos Datos Personales", body: "SEAINT Enterprise no vende tu información personal. Solo podemos compartir información con proveedores de servicios, asesores o profesionales legales de confianza cuando sea necesario para las operaciones comerciales o el cumplimiento normativo." },
      { title: "Seguridad de los Datos", body: "Utilizamos medidas administrativas y técnicas razonables para proteger la información enviada. Sin embargo, ningún sistema de transmisión o almacenamiento en línea puede garantizar una seguridad absoluta." },
      { title: "Cookies y Analítica", body: "Nuestro sitio web puede utilizar analítica básica o cookies para comprender el tráfico, el rendimiento y la interacción del usuario. Puedes controlar las cookies desde la configuración de tu navegador." },
      { title: "Tus Derechos", body: "Puedes solicitar acceso, corrección o eliminación de la información que hayas proporcionado escribiendo a support@seaintenterprise.com." },
      { title: "Contacto", body: "Para preguntas sobre privacidad, escribe a support@seaintenterprise.com." },
    ],
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  return <LegalPage {...content[language]} />;
}


"use client";

import LegalPage from "@/components/internal/LegalPage";
import { useLanguage } from "@/i18n/LanguageProvider";

const content = {
  en: {
    label: "Legal", title: "Terms of Service", updated: "Last updated: 2026",
    sections: [
      { title: "Use of Website", body: "By using this website, you agree to use it only for lawful purposes and in a way that does not interfere with the site, its security, or other users." },
      { title: "Informational Purposes Only", body: "Content on this website is provided for general informational and business communication purposes only. It does not constitute legal, tax, accounting, investment, fundraising, securities, or financial advice." },
      { title: "No Investment Offer", body: "Nothing on this website is an offer to sell securities, a solicitation to buy securities, or a commitment to provide funding, investment, acquisition, advisory, or financing services." },
      { title: "Funding Inquiries", body: "Submitting a funding or partnership inquiry does not create a client, investor, advisor, fiduciary, or business relationship with SEAINT Enterprise." },
      { title: "Intellectual Property", body: "All website content, branding, copy, designs, and materials are owned by or licensed to SEAINT Enterprise and may not be copied or reused without permission." },
      { title: "Third-Party Links", body: "This website may link to third-party sites. SEAINT Enterprise is not responsible for third-party content, policies, or practices." },
      { title: "Limitation of Liability", body: "SEAINT Enterprise is not liable for damages arising from use of this website, reliance on website information, or inability to access the site." },
      { title: "Contact", body: "For questions about these terms, email support@seaintenterprise.com." },
    ],
  },
  es: {
    label: "Legal", title: "Términos de Servicio", updated: "Última actualización: 2026",
    sections: [
      { title: "Uso del Sitio Web", body: "Al utilizar este sitio web, aceptas usarlo únicamente con fines lícitos y de una manera que no interfiera con el sitio, su seguridad ni otros usuarios." },
      { title: "Solo con Fines Informativos", body: "El contenido de este sitio web se proporciona únicamente con fines informativos generales y de comunicación empresarial. No constituye asesoría legal, fiscal, contable, de inversión, recaudación de fondos, valores ni financiera." },
      { title: "No Constituye una Oferta de Inversión", body: "Nada en este sitio web constituye una oferta para vender valores, una solicitud para comprar valores ni un compromiso de proporcionar financiamiento, inversión, adquisición, asesoría o servicios financieros." },
      { title: "Consultas de Financiamiento", body: "Enviar una consulta de financiamiento o alianza no crea una relación de cliente, inversionista, asesor, fiduciario ni comercial con SEAINT Enterprise." },
      { title: "Propiedad Intelectual", body: "Todo el contenido, marca, textos, diseños y materiales del sitio web son propiedad de SEAINT Enterprise o se utilizan bajo licencia, y no pueden copiarse ni reutilizarse sin autorización." },
      { title: "Enlaces de Terceros", body: "Este sitio web puede incluir enlaces a sitios de terceros. SEAINT Enterprise no es responsable del contenido, las políticas ni las prácticas de terceros." },
      { title: "Limitación de Responsabilidad", body: "SEAINT Enterprise no es responsable de daños derivados del uso de este sitio web, de la confianza en su información o de la imposibilidad de acceder al sitio." },
      { title: "Contacto", body: "Para preguntas sobre estos términos, escribe a support@seaintenterprise.com." },
    ],
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  return <LegalPage {...content[language]} />;
}

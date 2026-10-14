"use client";

import InternalPage from "@/components/internal/InternalPage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { internalPageContent } from "@/i18n/internalPageContent";

export default function ProgramsPage() {
  const { language } = useLanguage();
  const content = internalPageContent.programs[language];

  const event =
    language === "en"
      ? {
          number: "06",
          title: "Invest in Your Future",
          meta: "Free Seminar · August 29 · 2:00–3:30 PM · 10/20 Booked",
          description:
            "A free in-person seminar for business owners and entrepreneurs covering software, investments and business growth. Limited to 20 spots. 803 North Thompson Lane, Suite 102B, Murfreesboro, Tennessee.",
        }
      : {
          number: "06",
          title: "Invierte en Tu Futuro",
          meta: "Seminario Gratis · 29 de agosto · 2:00–3:30 PM · 10/20 Reservados",
          description:
            "Seminario presencial gratuito para dueños de negocios y emprendedores sobre software, inversiones y crecimiento empresarial. Limitado a 20 lugares. 803 North Thompson Lane, Suite 102B, Murfreesboro, Tennessee.",
        };

  return <InternalPage {...content} details={[...content.details, event]} />;
}

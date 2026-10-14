"use client";

import InternalPage from "@/components/internal/InternalPage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { internalPageContent } from "@/i18n/internalPageContent";

export default function FoundersPage() {
  const { language } = useLanguage();
  return <InternalPage {...internalPageContent.founders[language]} />;
}

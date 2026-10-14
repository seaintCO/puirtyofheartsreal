"use client";

import InternalPage from "@/components/internal/InternalPage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { internalPageContent } from "@/i18n/internalPageContent";

export default function TeamPage() {
  const { language } = useLanguage();
  return <InternalPage {...internalPageContent.team[language]} />;
}

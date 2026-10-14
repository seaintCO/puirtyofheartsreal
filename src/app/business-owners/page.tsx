"use client";

import InternalPage from "@/components/internal/InternalPage";
import { useLanguage } from "@/i18n/LanguageProvider";
import { internalPageContent } from "@/i18n/internalPageContent";

export default function BusinessOwnersPage() {
  const { language } = useLanguage();
  return <InternalPage {...internalPageContent.owners[language]} />;
}

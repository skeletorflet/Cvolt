import { useMemo } from "react";
import { useCVStore } from "@/store/cvStore";
import { messages } from "@/i18n/translations";
import type { AppLocale } from "@/store/cvStore";

const resolve = (map: Record<string, string>, id: string, fallback: string) => map[id] ?? fallback;

export const getLocaleMessages = (locale: AppLocale) => messages[locale] ?? messages.en;

export function useI18n() {
  const locale = useCVStore((s) => s.locale);
  const setLocale = useCVStore((s) => s.setLocale);

  const m = useMemo(() => getLocaleMessages(locale), [locale]);

  return {
    locale,
    setLocale,
    m,
    sectionTitleById: (id: string, fallback: string) => resolve(m.sectionById, id, fallback),
    sectionTitleLabel: (title: string) => resolve(m.sectionAliases, title, title),
    templateName: (id: string, fallback: string) => resolve(m.templateNames, id, fallback),
    templateBlurb: (id: string, fallback: string | undefined) => resolve(m.templateBlurbs, id, fallback ?? ""),
    paletteName: (id: string, fallback: string) => resolve(m.paletteNames, id, fallback),
    fontName: (id: string, fallback: string) => resolve(m.fontNames, id, fallback),
    templateCategory: (category: string) => resolve(m.templateCategories, category, category),
    templateCountLabel: (count: number) => `${count} ${count === 1 ? m.design.templateCountSingular : m.design.templateCountPlural}`,
  };
}

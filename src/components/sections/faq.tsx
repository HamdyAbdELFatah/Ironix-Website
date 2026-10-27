"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HelpCircle } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { StaticPageData } from "@/lib/static-pages/static-pages-service";

interface FAQProps {
  liveData?: StaticPageData | null;
}

export function FAQ({ liveData }: FAQProps) {
  const t = useTranslations("faq");
  const shouldReduceMotion = useReducedMotion();

  const fallbackIds = ["1", "2", "3", "4", "5", "6"];

  const items =
    liveData?.sections && liveData.sections.length > 0
      ? liveData.sections.map((s, idx) => ({
          id: s.id || String(idx + 1),
          question: s.heading,
          answer: s.content,
        }))
      : fallbackIds.map((id) => ({
          id,
          question: t(`questions.${id}.question`),
          answer: t(`questions.${id}.answer`),
        }));

  const sectionTitle = liveData?.title || t("title");

  return (
    <SectionWrapper sectionId="faq" dark>
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, transform: "translateY(14px)" }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t("badge")}</span>
        </motion.div>

        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, transform: "translateY(16px)" }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-sans tracking-tight mb-4"
        >
          {sectionTitle}
        </motion.h2>
      </div>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, transform: "translateY(18px)" }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, transform: "translateY(0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-3xl mx-auto"
      >
        <Accordion className="w-full space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="overflow-hidden rounded-2xl border border-border/80 bg-card/80 px-6 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] data-[state=open]:border-primary/50 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="cursor-pointer py-5 text-left text-base font-bold text-foreground hover:text-primary hover:no-underline rtl:text-right sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-5 leading-relaxed whitespace-pre-line">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </SectionWrapper>
  );
}

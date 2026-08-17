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
import { generateFAQSchema } from "@/lib/seo/structured-data";
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
  const jsonLd = generateFAQSchema(items.map((i) => ({ question: i.question, answer: i.answer })));

  return (
    <SectionWrapper sectionId="faq" dark>
      {/* FAQ Schema for Rich Google Search Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-4"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>HELP & FREQUENTLY ASKED QUESTIONS</span>
        </motion.div>

        <motion.h2
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-sans tracking-tight mb-4"
        >
          {sectionTitle}
        </motion.h2>
      </div>

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion className="w-full space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="border border-border/80 bg-card/80 backdrop-blur-sm rounded-2xl px-6 data-[state=open]:border-amber-500/50 data-[state=open]:shadow-lg data-[state=open]:shadow-amber-500/5 transition-all shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="text-left rtl:text-right font-bold text-base sm:text-lg text-foreground hover:text-amber-400 py-5 hover:no-underline cursor-pointer">
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

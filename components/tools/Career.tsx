"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Users, Phone, ArrowRight, ArrowUpRight } from "@/components/ui/icon";

// TODO(content) benefit values in EUR
const K_BENEFITS = [
  { id: "sachbezug", value: 50 },
  { id: "lunch", value: 108 },
  { id: "internet", value: 50 },
  { id: "jobrad", value: 45 },
  { id: "kita", value: 100 },
  { id: "vwl", value: 40 },
] as const;

const K_CULTURE_SCORES = [
  [1, 0],   // Question 1
  [1, 0],   // Question 2
  [1, 0.5], // Question 3
  [1, 0],   // Question 4
  [1, 0.5], // Question 5
] as const;

const CHAR_PERCENT = "%";
const CHAR_EURO = "€";
const CHAR_PLUS = "+";
const CHAR_SPACE = " ";
const CHAR_SLASH = "/";
const STR_TOTAL_QUESTIONS = "5";
const TOTAL_QUESTIONS = 5;

const APPLY_MAILTO_HREF = "mailto:andrea.nickel@k-aqua.de?subject=Bewerbung%20bei%20K-Aqua";
const PHONE_TEL_HREF = "tel:+4960859868410";

interface CareerProps {
  careerData: {
    locale: string;
    eyebrow: string;
    title1: string;
    titleGrad: string;
    lead: string;
    benEyebrow: string;
    benTitle: string;
    benLead: string;
    benefits: {
      sachbezug: [string, string];
      lunch: [string, string];
      internet: [string, string];
      jobrad: [string, string];
      kita: [string, string];
      vwl: [string, string];
    };
    resultLabel: string;
    resultNote1: string;
    resultNote2: string;
    resultNote3: string;
    resultNote4: string;
    apply: string;
    call: string;
    cmEyebrow: string;
    cmTitle: string;
    cmIntro: string;
    cmStart: string;
    qLabel: string;
    cmQ: Array<{ q: string; o: [string, string] }>;
    resHigh: string;
    resMid: string;
    resLow: string;
    again: string;
  };
}

export default function Career({ careerData }: CareerProps) {
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([
    "sachbezug",
    "lunch",
  ]);

  // Culture Matcher State
  const [cStep, setCStep] = useState<number>(-1);
  const [cScore, setCScore] = useState<number>(0);

  const toggleBenefit = (id: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const formatNum = (val: number) => {
    return new Intl.NumberFormat(careerData.locale).format(val);
  };

  const nettoSum = K_BENEFITS.filter((b) =>
    selectedBenefits.includes(b.id)
  ).reduce((sum, b) => sum + b.value, 0);

  const bruttoEquivalent = Math.round(nettoSum / 0.55 / 10) * 10;

  const startQuiz = () => {
    setCStep(0);
    setCScore(0);
  };

  const answerQuestion = (optionIndex: number) => {
    if (cStep >= 0 && cStep < TOTAL_QUESTIONS) {
      const additionalScore = K_CULTURE_SCORES[cStep]?.[optionIndex as 0 | 1] || 0;
      setCScore((prev) => prev + additionalScore);
      setCStep((prev) => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCStep(-1);
    setCScore(0);
  };

  const matchPercentage = Math.round((cScore / TOTAL_QUESTIONS) * 100);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border kq-band kq-band--blob">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4 font-body">
              {careerData.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
              {careerData.title1}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                {careerData.titleGrad}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] text-wrap-pretty">
              <span className="sr-only" aria-hidden="true">{careerData.title1} {careerData.titleGrad} </span>
              {careerData.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits-Rechner */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            {/* Checklist */}
            <Reveal>
              <div className="text-start">
                <SectionHead
                  eyebrow={careerData.benEyebrow}
                  title={careerData.benTitle}
                  lead={careerData.benLead}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {K_BENEFITS.map((b) => {
                    const isSelected = selectedBenefits.includes(b.id);
                    const benefitText =
                      careerData.benefits[b.id as keyof typeof careerData.benefits];
                    return (
                      <label
                        key={b.id}
                        className={`k-doc-check ${isSelected ? "is-on" : ""}`}
                        style={{ alignItems: "flex-start", paddingBlock: "var(--sp-4)" }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleBenefit(b.id)}
                          style={{ marginTop: 4 }}
                        />
                        <div className="flex flex-col text-start">
                          <span className="font-heading font-bold text-foreground">
                            {benefitText[0]}{" "}
                            <span className="text-primary">
                              {CHAR_PLUS}
                              {formatNum(b.value)}
                              {CHAR_SPACE}
                              {CHAR_EURO}
                            </span>
                          </span>
                          <span className="text-small text-muted-foreground mt-1 leading-relaxed">
                            {benefitText[1]}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Results Card */}
            <Reveal delay={0.1}>
              <Card tint className="sticky top-24 flex flex-col gap-6 text-start">
                <span className="text-tiny font-bold tracking-wider uppercase text-muted-foreground">
                  {careerData.resultLabel}
                </span>
                <span className="text-h2 font-heading font-extrabold text-primary leading-none">
                  {formatNum(nettoSum)}
                  {CHAR_SPACE}
                  {CHAR_EURO}
                </span>
                <p className="text-body text-muted-foreground leading-relaxed text-wrap-pretty">
                  {careerData.resultNote1}{" "}
                  <strong className="text-foreground">
                    {careerData.resultNote2.replace(
                      "{n}",
                      formatNum(bruttoEquivalent)
                    )}
                  </strong>{" "}
                  {careerData.resultNote3}
                  <br />
                  <span className="text-small mt-2 block opacity-80">
                    {careerData.resultNote4}
                  </span>
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    href={APPLY_MAILTO_HREF}
                    variant="primary"
                    size="lg"
                    icon={<ArrowUpRight className="w-5 h-5" />}
                  >
                    {careerData.apply}
                  </Button>
                  <Button
                    href={PHONE_TEL_HREF}
                    variant="ghost"
                    size="lg"
                    icon={<Phone className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    {careerData.call}
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Culture Matcher */}
      <section className="py-16 bg-background-subtle border-t border-card-border">
        <div className="max-w-[720px] mx-auto px-6">
          <SectionHead
            align="center"
            eyebrow={careerData.cmEyebrow}
            title={careerData.cmTitle}
          />

          <Reveal>
            <Card className="min-h-[300px] flex flex-col justify-center items-center p-5 sm:p-8 text-center bg-card">
              {cStep === -1 ? (
                <div className="flex flex-col gap-6 items-center">
                  <div className="w-16 h-16 rounded-[20px] grid place-items-center bg-primary-soft text-primary shrink-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="text-lead text-muted-foreground max-w-[50ch] text-wrap-pretty">
                    {careerData.cmIntro}
                  </p>
                  <Button
                    onClick={startQuiz}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {careerData.cmStart}
                  </Button>
                </div>
              ) : cStep < TOTAL_QUESTIONS ? (
                <div className="flex flex-col gap-6 w-full text-start items-start">
                  <span className="text-tiny font-bold tracking-wider uppercase text-primary">
                    {careerData.qLabel}
                    {CHAR_SPACE}
                    {cStep + 1}
                    {CHAR_SPACE}
                    {CHAR_SLASH}
                    {CHAR_SPACE}
                    {STR_TOTAL_QUESTIONS}
                  </span>
                  <h3 className="text-h3 font-heading font-bold text-foreground">
                    {careerData.cmQ[cStep]?.q}
                  </h3>
                  <div className="flex flex-col gap-3 w-full">
                    {careerData.cmQ[cStep]?.o.map((opt, i) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => answerQuestion(i)}
                        className="w-full text-start p-4 rounded-lg border border-card-border hover:border-primary hover:bg-primary-soft transition-all duration-fast font-body text-body text-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-ring outline-none active:scale-[0.99]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6 items-center">
                  <span className="text-display font-heading font-extrabold text-primary leading-none">
                    {matchPercentage}
                    {CHAR_PERCENT}
                  </span>
                  <p className="text-lead text-muted-foreground max-w-[50ch] text-wrap-pretty">
                    {matchPercentage >= 80
                      ? careerData.resHigh
                      : matchPercentage >= 50
                      ? careerData.resMid
                      : careerData.resLow}
                  </p>
                  <div className="flex gap-4 flex-wrap justify-center mt-2">
                    <Button href={APPLY_MAILTO_HREF} variant="primary" size="lg">
                      {careerData.apply}
                    </Button>
                    <Button onClick={resetQuiz} variant="ghost" size="lg">
                      {careerData.again}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

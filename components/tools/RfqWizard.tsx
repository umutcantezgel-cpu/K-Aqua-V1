"use client";

import React, { useState } from "react";
import { Link } from "@/lib/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/FilterChip";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import {
  Factory,
  MapPin,
  Layers,
  Handshake,
  Check,
  ArrowRight,
  ArrowUpRight,
  Phone,
} from "@/components/ui/icon";

const CHAR_METER = "m";
const CHAR_COLON = ":";
const CHAR_DASH = "—";
const CHAR_SPACE = " ";
const CHAR_TILDE = "~";
const CHAR_DOT = ".";
const CHAR_STAR = "*";
const STR_PHONE_CTA = "+49 (0)60 85 / 9868-410";
const PHONE_TEL_HREF = "tel:+4960859868410";
const MAIL_TO_BASE = "mailto:info@k-aqua.de";
const LINK_HOME_HREF = "/";

const EMAIL_REGEX = /.+@.+\..+/;

const TYPE_ICONS = [Factory, MapPin, Layers, Handshake] as const;
const DIM_GROUPS = [
  "d20 – d63",
  "d75 – d160",
  "d200 – d315",
  "d355 – d630",
] as const;

interface RfqWizardProps {
  rfqData: {
    locale: string;
    eyebrow: string;
    title1: string;
    titleGrad: string;
    lead: string;
    steps: string[];
    types: Array<{ t: string; d: string }>;
    fType: string;
    fDims: string;
    fMeters: string;
    dimsHint: string;
    fTime: string;
    fRegion: string;
    timelines: string[];
    regions: string[];
    fName: string;
    fCompany: string;
    fEmail: string;
    fPhone: string;
    fMsg: string;
    privacy: string;
    back: string;
    next: string;
    send: string;
    mailSubject: string;
    promise: string[];
    doneTitle: string;
    doneText: string;
    doneBack: string;
  };
}

export default function RfqWizard({ rfqData }: RfqWizardProps) {
  const [step, setStep] = useState<number>(0);
  const [sent, setSent] = useState<boolean>(false);
  const [d, setD] = useState({
    type: null as number | null,
    meters: 1000,
    dims: [] as string[],
    timeline: null as string | null,
    region: null as string | null,
    name: "",
    company: "",
    email: "",
    phone: "",
    msg: "",
  });

  const set = <K extends keyof typeof d>(k: K, v: (typeof d)[K]) => {
    setD((prev) => ({ ...prev, [k]: v }));
  };

  const toggleDim = (dim: string) => {
    setD((prev) => ({
      ...prev,
      dims: prev.dims.includes(dim)
        ? prev.dims.filter((x) => x !== dim)
        : [...prev.dims, dim],
    }));
  };

  const formatNum = (val: number) => {
    return new Intl.NumberFormat(rfqData.locale).format(val);
  };

  const valid = [
    d.type !== null,
    d.dims.length > 0,
    d.timeline !== null && d.region !== null,
    d.name.trim() !== "" &&
      d.company.trim() !== "" &&
      EMAIL_REGEX.test(d.email.trim()),
  ];

  const send = () => {
    const selectedTypeName =
      d.type !== null && rfqData.types[d.type]
        ? rfqData.types[d.type]?.t
        : CHAR_DASH;

    const body = [
      `${rfqData.fType}${CHAR_COLON}${CHAR_SPACE}${selectedTypeName}`,
      `${rfqData.fDims}${CHAR_COLON}${CHAR_SPACE}${d.dims.join(
        ", "
      )}${CHAR_SPACE}${CHAR_DOT}${CHAR_SPACE}${CHAR_TILDE}${formatNum(
        d.meters
      )}${CHAR_SPACE}${CHAR_METER}`,
      `${rfqData.fTime}${CHAR_COLON}${CHAR_SPACE}${d.timeline}${CHAR_SPACE}${CHAR_DOT}${CHAR_SPACE}${rfqData.fRegion}${CHAR_COLON}${CHAR_SPACE}${d.region}`,
      `${rfqData.fName}${CHAR_COLON}${CHAR_SPACE}${d.name}${CHAR_SPACE}${CHAR_DOT}${CHAR_SPACE}${rfqData.fCompany}${CHAR_COLON}${CHAR_SPACE}${d.company}`,
      `${rfqData.fEmail}${CHAR_COLON}${CHAR_SPACE}${d.email}${CHAR_SPACE}${CHAR_DOT}${CHAR_SPACE}${rfqData.fPhone}${CHAR_COLON}${CHAR_SPACE}${
        d.phone || CHAR_DASH
      }`,
      d.msg.trim() ? `${rfqData.fMsg}${CHAR_COLON}${CHAR_SPACE}${d.msg}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const subjectText = `${rfqData.mailSubject}${CHAR_SPACE}${CHAR_DASH}${CHAR_SPACE}${d.company}`;
    const mailtoHref = `${MAIL_TO_BASE}?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoHref, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <main className="flex flex-col w-full min-h-screen bg-background">
        {/* Success Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4 font-body">
                {rfqData.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
                {rfqData.title1}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {rfqData.titleGrad}
                </span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Success Content Section */}
        <section className="py-16 bg-background">
          <div className="max-w-[640px] mx-auto px-6 text-center flex flex-col items-center">
            <Reveal>
              <div className="w-16 h-16 rounded-[22px] grid place-items-center bg-primary-soft text-primary mb-6 mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-h2 font-heading font-bold text-foreground mb-4">
                {rfqData.doneTitle}
              </h2>
              <p className="text-lead text-muted-foreground leading-relaxed mb-8 text-wrap-pretty">
                {rfqData.doneText}
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Button
                  href={PHONE_TEL_HREF}
                  variant="ghost"
                  size="lg"
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                >
                  {STR_PHONE_CTA}
                </Button>
                <Link href={LINK_HOME_HREF}>
                  <Button variant="primary" size="lg">
                    {rfqData.doneBack}
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <span className="inline-block px-3 py-1 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-4 font-body">
              {rfqData.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
              {rfqData.title1}{" "}
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                {rfqData.titleGrad}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] text-wrap-pretty">
              <span className="sr-only" aria-hidden="true">{rfqData.title1} {rfqData.titleGrad} </span>
              {rfqData.lead}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Wizard Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[860px] mx-auto px-6">
          {/* Step indicator */}
          <div className="k-steps" role="list">
            {rfqData.steps.map((s, i) => (
              <span
                key={s}
                role="listitem"
                className={`k-step ${i === step ? "is-now" : ""} ${
                  i < step ? "is-done" : ""
                }`}
              >
                <i>
                  {i < step ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    i + 1
                  )}
                </i>
                {s}
              </span>
            ))}
          </div>

          {/* Wizard Card */}
          <Reveal delay={0.08}>
            <Card className="min-h-[380px] p-4 sm:p-8 flex flex-col justify-between text-start bg-card">
              <div>
                {/* Step 0: Project Type */}
                <div className={step === 0 ? "block" : "hidden"}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rfqData.types.map((tp, i) => {
                      const IconComp = TYPE_ICONS[i] || Factory;
                      const isSelected = d.type === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          className={`k-type-card ${isSelected ? "is-on" : ""}`}
                          aria-pressed={isSelected}
                          onClick={() => set("type", i)}
                        >
                          <span className="w-10 h-10 rounded-[12px] grid place-items-center bg-primary-soft text-primary shrink-0">
                            <IconComp className="w-5 h-5" />
                          </span>
                          <strong className="text-foreground">{tp.t}</strong>
                          <span className="text-small text-muted-foreground leading-relaxed">
                            {tp.d}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1: Bedarf */}
                <div className={step === 1 ? "block" : "hidden"}>
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="font-semibold text-foreground mb-3">
                        {rfqData.fDims}
                      </p>
                      <div className="k-chips">
                        {DIM_GROUPS.map((g) => {
                          const isSelected = d.dims.includes(g);
                          return (
                            <FilterChip
                              key={g}
                              pressed={isSelected}
                              onClick={() => toggleDim(g)}
                            >
                              {g}
                            </FilterChip>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-semibold text-foreground">
                          {rfqData.fMeters}
                        </p>
                        <span className="font-heading font-bold text-primary">
                          {CHAR_TILDE}
                          {formatNum(d.meters)}
                          {CHAR_SPACE}
                          {CHAR_METER}
                        </span>
                      </div>
                      <input
                        className="k-range"
                        type="range"
                        min="100"
                        max="50000"
                        step="100"
                        value={d.meters}
                        aria-label={rfqData.fMeters}
                        onChange={(e) =>
                          set("meters", parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                    <p className="text-small text-muted-foreground leading-relaxed">
                      {rfqData.dimsHint}
                    </p>
                  </div>
                </div>

                {/* Step 2: Termin & Region */}
                <div className={step === 2 ? "block" : "hidden"}>
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="font-semibold text-foreground mb-3">
                        {rfqData.fTime}
                      </p>
                      <div className="k-chips">
                        {rfqData.timelines.map((tl) => {
                          const isSelected = d.timeline === tl;
                          return (
                            <FilterChip
                              key={tl}
                              pressed={isSelected}
                              onClick={() => set("timeline", tl)}
                            >
                              {tl}
                            </FilterChip>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-3">
                        {rfqData.fRegion}
                      </p>
                      <div className="k-chips">
                        {rfqData.regions.map((reg) => {
                          const isSelected = d.region === reg;
                          return (
                            <FilterChip
                              key={reg}
                              pressed={isSelected}
                              onClick={() => set("region", reg)}
                            >
                              {reg}
                            </FilterChip>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Kontakt */}
                <div className={step === 3 ? "block" : "hidden"}>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="k-field">
                        <span>
                          {rfqData.fName}
                          {CHAR_SPACE}
                          {CHAR_STAR}
                        </span>
                        <input
                          className="k-input font-body"
                          type="text"
                          value={d.name}
                          onChange={(e) => set("name", e.target.value)}
                          autoComplete="name"
                        />
                      </label>
                      <label className="k-field">
                        <span>
                          {rfqData.fCompany}
                          {CHAR_SPACE}
                          {CHAR_STAR}
                        </span>
                        <input
                          className="k-input font-body"
                          type="text"
                          value={d.company}
                          onChange={(e) => set("company", e.target.value)}
                          autoComplete="organization"
                        />
                      </label>
                      <label className="k-field">
                        <span>
                          {rfqData.fEmail}
                          {CHAR_SPACE}
                          {CHAR_STAR}
                        </span>
                        <input
                          className="k-input font-body"
                          type="email"
                          value={d.email}
                          onChange={(e) => set("email", e.target.value)}
                          autoComplete="email"
                        />
                      </label>
                      <label className="k-field">
                        <span>{rfqData.fPhone}</span>
                        <input
                          className="k-input font-body"
                          type="tel"
                          value={d.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          autoComplete="tel"
                        />
                      </label>
                    </div>
                    <label className="k-field">
                      <span>{rfqData.fMsg}</span>
                      <textarea
                        className="k-input font-body"
                        rows={3}
                        value={d.msg}
                        onChange={(e) => set("msg", e.target.value)}
                      />
                    </label>
                    <p className="text-small text-muted-foreground leading-relaxed">
                      {rfqData.privacy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wizard Footer Controls */}
              <div className="flex justify-between items-center gap-4 mt-8 pt-4 border-t border-card-border">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => setStep(step - 1)}>
                    {rfqData.back}
                  </Button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!valid[step]}
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {rfqData.next}
                  </Button>
                ) : (
                  <Button
                    onClick={send}
                    disabled={!valid[3]}
                    icon={<ArrowUpRight className="w-5 h-5" />}
                  >
                    {rfqData.send}
                  </Button>
                )}
              </div>

              {/* Vertrauens-Chips at the bottom of the card */}
              <div className="flex flex-wrap justify-center gap-2 mt-6 pt-4 border-t border-card-border">
                {rfqData.promise.map((pr) => (
                  <Chip
                    key={pr}
                    className="flex items-center gap-1.5 text-small font-semibold select-none"
                  >
                    <Check className="w-4 h-4 text-accent-strong shrink-0" />
                    <span>{pr}</span>
                  </Chip>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Download, FileText, Check } from "@/components/ui/icon";

// TODO(content) certificate numbers
const CERT_NUMBERS = [
  "Q-2025-6732",
  "U-2025-6733",
  "E-2025-6734"
];

const VALIDITY_DATES = [
  "10/2025 – 10/2028",
  "10/2025 – 10/2028",
  "10/2025 – 10/2028"
];

const DOWNLOAD_URL = "/pdf/kwt-iso-zertifikat-de.pdf";
const SUPPORT_EMAIL_PREFIX = "mailto:support@k-aqua.de";
const QUERY_SUBJECT = "?subject=";
const QUERY_BODY = "&body=";
const NEWLINE_MINUS = "\n\n- ";
const NEWLINE_MINUS_JOIN = "\n- ";
const ENSPACE = " ";
const SLASH = " / ";
const COLON = ": ";
const OPEN_PAREN = " (";
const CLOSE_PAREN = ")";
const GENAU_LETTERS = ["G", "E", "N", "A", "U"];

interface TrustCenterData {
  eyebrow: string;
  title1: string;
  titleGrad: string;
  lead: string;
  certs: [string, string][];
  accred: string;
  certNo: string;
  valid: string;
  download: string;
  genauEyebrow: string;
  genauTitle: string;
  genauLead: string;
  genau: [string, string][];
  rfpEyebrow: string;
  rfpTitle: string;
  rfpLead: string;
  docs: string[];
  inPackage: string;
  pickLeft: string;
  requestZip: string;
  requestBtn: string;
  mailSubject: string;
  mailBody: string;
  scope3: string;
}

interface TrustCenterProps {
  data: TrustCenterData;
}

export function TrustCenter({ data }: TrustCenterProps) {
  const [activeGenauIdx, setActiveGenauIdx] = useState<number>(0);
  const [pickedDocs, setPickedDocs] = useState<string[]>([]);

  const handleToggleDoc = (doc: string) => {
    if (pickedDocs.includes(doc)) {
      setPickedDocs(pickedDocs.filter((d) => d !== doc));
    } else {
      setPickedDocs([...pickedDocs, doc]);
    }
  };

  const mailtoHref = `${SUPPORT_EMAIL_PREFIX}${QUERY_SUBJECT}${encodeURIComponent(
    data.mailSubject
  )}${QUERY_BODY}${encodeURIComponent(
    data.mailBody + NEWLINE_MINUS + pickedDocs.join(NEWLINE_MINUS_JOIN)
  )}`;

  const docCountText = `${pickedDocs.length}${SLASH}${data.docs.length}`;
  const requestBtnText = `${data.requestBtn}${
    pickedDocs.length > 0 ? `${OPEN_PAREN}${pickedDocs.length}${CLOSE_PAREN}` : ""
  }`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <div className="max-w-[760px] mb-12 flex flex-col gap-3 text-start items-start">
              {data.eyebrow && (
                <div className="mb-1">
                  <span className="text-small font-bold uppercase tracking-wider text-primary">{data.eyebrow}</span>
                </div>
              )}
              <h1 className="text-h2 font-heading font-extrabold text-foreground tracking-tight leading-[1.08] text-wrap-balance">
                {data.title1}{ENSPACE}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {data.titleGrad}
                </span>
              </h1>
              {data.lead && (
                <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-wrap-pretty">
                  {data.lead}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ISO Certificates Cards */}
      <section className="py-16 border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.certs.map((cert, idx) => {
              const [name, desc] = cert;
              const certNum = CERT_NUMBERS[idx];
              const validity = VALIDITY_DATES[idx];
              const displayCertNo = `${data.certNo}${COLON}${certNum}`;
              const displayValid = `${data.valid}${COLON}${validity}`;

              return (
                <Reveal key={name} delay={idx * 0.08}>
                  <Card className="h-full flex flex-col justify-between items-start text-start p-5 sm:p-8">
                    <div className="flex flex-col gap-4 items-start w-full">
                      <div className="flex justify-between items-start w-full gap-2">
                        <h2 className="font-heading font-extrabold text-2xl text-foreground">
                          {name}
                        </h2>
                        <Chip className="text-tiny px-2.5 py-0.5 shrink-0 bg-primary-soft text-primary border-primary/20">
                          {data.accred}
                        </Chip>
                      </div>
                      <p className="text-body text-muted-foreground">{desc}</p>
                      <div className="flex flex-col gap-1 text-small text-faint-foreground mt-2">
                        <span>{displayCertNo}</span>
                        <span>{displayValid}</span>
                      </div>
                    </div>
                    <div className="w-full mt-6">
                      <Button
                        href={DOWNLOAD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        className="w-full"
                        icon={<Download className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        {data.download}
                      </Button>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GENAU Framework Section */}
      <section className="py-16 border-b border-card-border bg-background-subtle">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <SectionHead
              eyebrow={data.genauEyebrow}
              title={data.genauTitle}
              lead={data.genauLead}
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
            {/* Tabs List */}
            <div className="lg:col-span-5 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {GENAU_LETTERS.map((letter, idx) => {
                const isActive = activeGenauIdx === idx;
                const labelText = data.genau[idx]?.[0] || letter;
                const displayLabel = `${letter}${ENSPACE}${DOT}${ENSPACE}${labelText}`;

                return (
                  <button
                    key={letter}
                    onClick={() => setActiveGenauIdx(idx)}
                    className={`flex items-center text-start px-6 py-4 rounded-xl border font-heading font-bold transition-all duration-200 shrink-0 outline-none ${
                      isActive
                        ? "bg-primary border-primary text-primary-foreground shadow-lift"
                        : "bg-card border-card-border text-foreground hover:border-primary/50 hover:bg-background"
                    }`}
                  >
                    <span className="text-lg">{displayLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Details Box */}
            <div className="lg:col-span-7">
              <Reveal key={activeGenauIdx}>
                <Card className="p-5 sm:p-8 text-start">
                  <h3 className="font-heading font-extrabold text-2xl text-primary mb-4">
                    {data.genau[activeGenauIdx]?.[0]}
                  </h3>
                  <p className="text-lead text-muted-foreground leading-relaxed">
                    {data.genau[activeGenauIdx]?.[1]}
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* RFP Paketbuilder Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <SectionHead
              eyebrow={data.rfpEyebrow}
              title={data.rfpTitle}
              lead={data.rfpLead}
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
            {/* Checklist */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {data.docs.map((doc) => {
                const isChecked = pickedDocs.includes(doc);
                return (
                  <label
                    key={doc}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl border cursor-pointer select-none transition-all duration-200 text-start ${
                      isChecked
                        ? "border-primary bg-primary-soft/40"
                        : "border-card-border bg-card hover:bg-background-subtle"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-primary rounded border-card-border shrink-0"
                      checked={isChecked}
                      onChange={() => handleToggleDoc(doc)}
                    />
                    <span className="font-semibold text-foreground text-body">
                      {doc}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Request Status Box */}
            <div className="lg:col-span-5">
              <Card tint className="p-5 sm:p-8 text-start h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {data.inPackage}
                    </h3>
                    <Chip className="bg-primary/10 border-primary/20 text-primary font-bold">
                      {docCountText}
                    </Chip>
                  </div>

                  {pickedDocs.length === 0 ? (
                    <p className="text-body text-muted-foreground italic">
                      {data.pickLeft}
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {pickedDocs.map((doc) => (
                        <li
                          key={doc}
                          className="flex items-center gap-2 text-small text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8">
                  {pickedDocs.length > 0 && (
                    <p className="text-small text-muted-foreground mb-4">
                      {data.requestZip}
                    </p>
                  )}
                  <Button
                    href={pickedDocs.length > 0 ? mailtoHref : undefined}
                    disabled={pickedDocs.length === 0}
                    className="w-full"
                    icon={<FileText className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    {requestBtnText}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Scope 3 Disclaimer */}
          <div className="mt-12 p-6 rounded-xl border border-dashed border-card-border bg-background-subtle text-start">
            <p className="text-small text-muted-foreground leading-relaxed">
              {data.scope3}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const DOT = "•";

'use client';

import React, { useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHead } from '@/components/ui/SectionHead';
import { IconChip } from '@/components/ui/IconChip';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { StatNumber } from '@/components/ui/StatNumber';
import { CTABand } from '@/components/ui/CTABand';
import { DataTable } from '@/components/ui/DataTable';
import { Logo } from '@/components/ui/Logo';
import { MediaSlot } from '@/components/ui/MediaSlot';

const LABELS = {
  title: 'UI Primitives Showcase',
  subtitle: 'Interactive developer checklist for K-Aqua\'s foundational UI components.',
  themeToggleTitle: 'Theme Toggle',
  themeToggleDesc: 'Use this toggle to switch the global page theme.',
  lightThemeHeader: 'Light Theme Preview',
  darkThemeHeader: 'Dark Theme Preview (OLED Dark)',

  // Section Names
  logoSection: 'Logo Component',
  buttonSection: 'Button Variants & Sizes',
  cardSection: 'Card (BentoCard) Variations',
  eyebrowSection: 'Eyebrow & SectionHead',
  chipsSection: 'Chips & Badges (Static & Interactive)',
  statsSection: 'StatNumber Display',
  ctaSection: 'CTABand (Call to Action Banner)',
  tableSection: 'DataTable Component',
  mediaSection: 'MediaSlot Placeholder',

  // Button Labels
  btnPrimary: 'Primary Button',
  btnGhost: 'Ghost Button',
  btnInverse: 'Inverse Button',
  sizeSm: 'Small',
  sizeMd: 'Medium',
  sizeLg: 'Large',

  // Eyebrow and SectionHead
  eyebrowText: 'Sustainable Engineering',
  sectionTitleLeft: 'Water Systems for the Future',
  sectionLeadLeft: 'High-performance piping solutions engineered for durability, safety, and circular economy integration.',
  sectionTitleCenter: 'Global Innovation Leader',
  sectionLeadCenter: 'Our products set the industry benchmark for leak prevention, chemical resistance, and long life cycles.',

  // Card Content
  cardTitle1: 'Bento Block 1',
  cardText1: 'Standard layout card showing clean borders and diffuse shadows in repose.',
  cardTitle2: 'Bento Block 2 (Tint)',
  cardText2: 'Tinted variant of the BentoCard featuring the primary tint color background.',
  cardTitle3: 'Bento Block 3 (Span 2)',
  cardText3: 'This card spans across 2 columns of the bento grid for asymmetric layout designs.',

  // Stat numbers
  statVal1: '98.5%',
  statLabel1: 'Recyclable materials used in production',
  statVal2: '50+ Years',
  statLabel2: 'Expected operational lifetime',
  statVal3: '0% Leakage',
  statLabel3: 'Guaranteed joint integrity',

  // Chips
  chipStatic: 'Standard Badge',
  chipSelected: 'Selected',
  chipUnselected: 'Unselected',

  // CTABand
  ctaTitle: 'Ready to optimize your building\'s water network?',
  ctaLead: 'Get in touch with our specification engineers to design a zero-leak, zero-corrosion system.',
  ctaAction: 'Contact Technical Support',

  // DataTable headers and cells
  thMaterial: 'Material Code',
  thApplication: 'Application',
  thTempLimit: 'Temp Limit',
  thRating: 'Standard',
  tdM1: 'PP-RCT',
  tdA1: 'Hot & Cold Water',
  tdT1: '70°C / 158°F',
  tdR1: 'ISO 15874',
  tdM2: 'PP-R',
  tdA2: 'Chilled Water',
  tdT2: '20°C / 68°F',
  tdR2: 'ISO 15874',
  tdM3: 'PP-R Red',
  tdA3: 'Fire Sprinkler',
  tdT3: '95°C / 203°F',
  tdR3: 'DIN 4102-B1',

  // MediaSlot Labels
  mediaLabel43: 'Media Aspect 4:3 Placeholder',
  mediaLabel169: 'Media Aspect 16:9 Banner',
  mediaLabel11: 'Square Profile Aspect 1:1',
};

export default function UIPrimitivesPage() {
  const [pressedLight, setPressedLight] = useState(false);
  const [pressedDark, setPressedDark] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-normal p-container">
      {/* Header */}
      <header className="mb-12 border-b border-card-border pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-h1 font-heading font-extrabold tracking-tight mb-2">
            {LABELS.title}
          </h1>
          <p className="text-lead text-muted-foreground font-body">
            {LABELS.subtitle}
          </p>
        </div>

        {/* Theme toggle widget */}
        <div className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-4 shadow-diffuse max-w-sm">
          <ThemeToggle />
          <div>
            <h4 className="text-small font-heading font-bold">
              {LABELS.themeToggleTitle}
            </h4>
            <p className="text-tiny text-muted-foreground leading-normal">
              {LABELS.themeToggleDesc}
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-16">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* ==========================================
              LIGHT THEME CONTAINER
              ========================================== */}
          <div
            data-theme="light"
            className="bg-background text-foreground border border-card-border rounded-xl p-8 space-y-12 shadow-diffuse"
          >
            <h3 className="text-h3 font-heading font-extrabold border-b border-card-border pb-3">
              {LABELS.lightThemeHeader}
            </h3>

            {/* Logo */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.logoSection}
              </h4>
              <div className="flex flex-wrap items-center gap-6">
                <Logo height={30} />
                <Logo height={44} />
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.buttonSection}
              </h4>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">
                    {LABELS.btnPrimary} {LABELS.sizeSm}
                  </Button>
                  <Button size="md">
                    {LABELS.btnPrimary} {LABELS.sizeMd}
                  </Button>
                  <Button size="lg">
                    {LABELS.btnPrimary} {LABELS.sizeLg}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary">{LABELS.btnPrimary}</Button>
                  <Button variant="ghost">{LABELS.btnGhost}</Button>
                  <Button variant="inverse">{LABELS.btnInverse}</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {LABELS.btnPrimary}
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<Download className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    {LABELS.btnGhost}
                  </Button>
                  <Button
                    variant="inverse"
                    href="#"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {LABELS.btnInverse}
                  </Button>
                </div>
              </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.cardSection}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h5 className="text-h4 font-heading font-bold">{LABELS.cardTitle1}</h5>
                  <p className="text-small text-muted-foreground">{LABELS.cardText1}</p>
                </Card>
                <Card tint>
                  <h5 className="text-h4 font-heading font-bold">{LABELS.cardTitle2}</h5>
                  <p className="text-small text-muted-foreground">{LABELS.cardText2}</p>
                </Card>
                <Card span={2} className="md:col-span-2">
                  <h5 className="text-h4 font-heading font-bold">{LABELS.cardTitle3}</h5>
                  <p className="text-small text-muted-foreground">{LABELS.cardText3}</p>
                </Card>
              </div>
            </section>

            {/* Eyebrow and SectionHead */}
            <section className="space-y-6">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.eyebrowSection}
              </h4>
              <div className="space-y-8 p-6 bg-card border border-card-border rounded-xl">
                <div className="flex flex-col gap-2">
                  <Eyebrow>{LABELS.eyebrowText}</Eyebrow>
                </div>
                <SectionHead
                  align="left"
                  eyebrow={LABELS.eyebrowText}
                  title={LABELS.sectionTitleLeft}
                  lead={LABELS.sectionLeadLeft}
                />
                <hr className="border-card-border" />
                <SectionHead
                  align="center"
                  eyebrow={LABELS.eyebrowText}
                  title={LABELS.sectionTitleCenter}
                  lead={LABELS.sectionLeadCenter}
                />
              </div>
            </section>

            {/* Chips */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.chipsSection}
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <IconChip>
                  <Download className="w-5 h-5" />
                </IconChip>
                <Chip>{LABELS.chipStatic}</Chip>
                <FilterChip
                  pressed={pressedLight}
                  onClick={() => setPressedLight(!pressedLight)}
                >
                  {pressedLight ? LABELS.chipSelected : LABELS.chipUnselected}
                </FilterChip>
              </div>
            </section>

            {/* Stats */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.statsSection}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatNumber value={LABELS.statVal1} label={LABELS.statLabel1} />
                <StatNumber value={LABELS.statVal2} label={LABELS.statLabel2} />
                <StatNumber value={LABELS.statVal3} label={LABELS.statLabel3} />
              </div>
            </section>

            {/* CTABand */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.ctaSection}
              </h4>
              <CTABand>
                <h3 className="text-h2 font-heading font-extrabold tracking-tight leading-none text-inverse-foreground">
                  {LABELS.ctaTitle}
                </h3>
                <p className="text-lead text-inverse-foreground/80 font-body">
                  {LABELS.ctaLead}
                </p>
                <div className="flex">
                  <Button variant="inverse" size="md">
                    {LABELS.ctaAction}
                  </Button>
                </div>
              </CTABand>
            </section>

            {/* DataTable */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.tableSection}
              </h4>
              <DataTable>
                <thead>
                  <tr>
                    <th>{LABELS.thMaterial}</th>
                    <th>{LABELS.thApplication}</th>
                    <th>{LABELS.thTempLimit}</th>
                    <th>{LABELS.thRating}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{LABELS.tdM1}</td>
                    <td>{LABELS.tdA1}</td>
                    <td>{LABELS.tdT1}</td>
                    <td>{LABELS.tdR1}</td>
                  </tr>
                  <tr>
                    <td>{LABELS.tdM2}</td>
                    <td>{LABELS.tdA2}</td>
                    <td>{LABELS.tdT2}</td>
                    <td>{LABELS.tdR2}</td>
                  </tr>
                  <tr>
                    <td>{LABELS.tdM3}</td>
                    <td>{LABELS.tdA3}</td>
                    <td>{LABELS.tdT3}</td>
                    <td>{LABELS.tdR3}</td>
                  </tr>
                </tbody>
              </DataTable>
            </section>

            {/* MediaSlot */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.mediaSection}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MediaSlot aspectRatio="4/3" label={LABELS.mediaLabel43} />
                <MediaSlot aspectRatio="16/9" label={LABELS.mediaLabel169} />
                <MediaSlot aspectRatio="1/1" label={LABELS.mediaLabel11} />
              </div>
            </section>
          </div>

          {/* ==========================================
              DARK THEME CONTAINER
              ========================================== */}
          <div
            data-theme="dark"
            className="bg-background text-foreground border border-card-border rounded-xl p-8 space-y-12 shadow-diffuse"
          >
            <h3 className="text-h3 font-heading font-extrabold border-b border-card-border pb-3">
              {LABELS.darkThemeHeader}
            </h3>

            {/* Logo */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.logoSection}
              </h4>
              <div className="flex flex-wrap items-center gap-6">
                <Logo height={30} />
                <Logo height={44} />
              </div>
            </section>

            {/* Buttons */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.buttonSection}
              </h4>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">
                    {LABELS.btnPrimary} {LABELS.sizeSm}
                  </Button>
                  <Button size="md">
                    {LABELS.btnPrimary} {LABELS.sizeMd}
                  </Button>
                  <Button size="lg">
                    {LABELS.btnPrimary} {LABELS.sizeLg}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary">{LABELS.btnPrimary}</Button>
                  <Button variant="ghost">{LABELS.btnGhost}</Button>
                  <Button variant="inverse">{LABELS.btnInverse}</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {LABELS.btnPrimary}
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<Download className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    {LABELS.btnGhost}
                  </Button>
                  <Button
                    variant="inverse"
                    href="#"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    {LABELS.btnInverse}
                  </Button>
                </div>
              </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.cardSection}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h5 className="text-h4 font-heading font-bold">{LABELS.cardTitle1}</h5>
                  <p className="text-small text-muted-foreground">{LABELS.cardText1}</p>
                </Card>
                <Card tint>
                  <h5 className="text-h4 font-heading font-bold">{LABELS.cardTitle2}</h5>
                  <p className="text-small text-muted-foreground">{LABELS.cardText2}</p>
                </Card>
                <Card span={2} className="md:col-span-2">
                  <h5 className="text-h4 font-heading font-bold">{LABELS.cardTitle3}</h5>
                  <p className="text-small text-muted-foreground">{LABELS.cardText3}</p>
                </Card>
              </div>
            </section>

            {/* Eyebrow and SectionHead */}
            <section className="space-y-6">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.eyebrowSection}
              </h4>
              <div className="space-y-8 p-6 bg-card border border-card-border rounded-xl">
                <div className="flex flex-col gap-2">
                  <Eyebrow>{LABELS.eyebrowText}</Eyebrow>
                </div>
                <SectionHead
                  align="left"
                  eyebrow={LABELS.eyebrowText}
                  title={LABELS.sectionTitleLeft}
                  lead={LABELS.sectionLeadLeft}
                />
                <hr className="border-card-border" />
                <SectionHead
                  align="center"
                  eyebrow={LABELS.eyebrowText}
                  title={LABELS.sectionTitleCenter}
                  lead={LABELS.sectionLeadCenter}
                />
              </div>
            </section>

            {/* Chips */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.chipsSection}
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <IconChip>
                  <Download className="w-5 h-5" />
                </IconChip>
                <Chip>{LABELS.chipStatic}</Chip>
                <FilterChip
                  pressed={pressedDark}
                  onClick={() => setPressedDark(!pressedDark)}
                >
                  {pressedDark ? LABELS.chipSelected : LABELS.chipUnselected}
                </FilterChip>
              </div>
            </section>

            {/* Stats */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.statsSection}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatNumber value={LABELS.statVal1} label={LABELS.statLabel1} />
                <StatNumber value={LABELS.statVal2} label={LABELS.statLabel2} />
                <StatNumber value={LABELS.statVal3} label={LABELS.statLabel3} />
              </div>
            </section>

            {/* CTABand */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.ctaSection}
              </h4>
              <CTABand>
                <h3 className="text-h2 font-heading font-extrabold tracking-tight leading-none text-inverse-foreground">
                  {LABELS.ctaTitle}
                </h3>
                <p className="text-lead text-inverse-foreground/80 font-body">
                  {LABELS.ctaLead}
                </p>
                <div className="flex">
                  <Button variant="inverse" size="md">
                    {LABELS.ctaAction}
                  </Button>
                </div>
              </CTABand>
            </section>

            {/* DataTable */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.tableSection}
              </h4>
              <DataTable>
                <thead>
                  <tr>
                    <th>{LABELS.thMaterial}</th>
                    <th>{LABELS.thApplication}</th>
                    <th>{LABELS.thTempLimit}</th>
                    <th>{LABELS.thRating}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{LABELS.tdM1}</td>
                    <td>{LABELS.tdA1}</td>
                    <td>{LABELS.tdT1}</td>
                    <td>{LABELS.tdR1}</td>
                  </tr>
                  <tr>
                    <td>{LABELS.tdM2}</td>
                    <td>{LABELS.tdA2}</td>
                    <td>{LABELS.tdT2}</td>
                    <td>{LABELS.tdR2}</td>
                  </tr>
                  <tr>
                    <td>{LABELS.tdM3}</td>
                    <td>{LABELS.tdA3}</td>
                    <td>{LABELS.tdT3}</td>
                    <td>{LABELS.tdR3}</td>
                  </tr>
                </tbody>
              </DataTable>
            </section>

            {/* MediaSlot */}
            <section className="space-y-4">
              <h4 className="text-tiny font-heading font-bold text-muted-foreground tracking-wider uppercase">
                {LABELS.mediaSection}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MediaSlot aspectRatio="4/3" label={LABELS.mediaLabel43} />
                <MediaSlot aspectRatio="16/9" label={LABELS.mediaLabel169} />
                <MediaSlot aspectRatio="1/1" label={LABELS.mediaLabel11} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

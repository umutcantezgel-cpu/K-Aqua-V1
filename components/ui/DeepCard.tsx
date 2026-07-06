// K-Aqua — DeepCard: Icon + Titel + Text-Karte, der Standardbaustein der Deep-Sections.
//
// QUELLE: kaqua-deep-ui.jsx (DeepCard). PORTIERT 1:1.
// ANGEPASST: BentoCard -> Card (siehe 00-FINDINGS.md §0.8). Icons-Objektzugriff (Icons[icon])
// -> Named-Import-Lookup aus components/ui/icon.
// HINWEIS: In den 14 portierten *Deep-Sections (components/sections/) wird aktuell direkt
// <Card> statt <DeepCard> verwendet (deckt sich mit dem Prototyp-Quellcode: kaqua-deep-sections-
// {1,2,3}.jsx rufen nirgends <DeepCard> auf, nur kaqua-deep-ui.jsx definiert sie). Diese Datei
// wird trotzdem 1:1 mitgeliefert (Quelltreue) — für optionale künftige Verwendung.
// Reine Anzeige -> KEIN "use client".
import React from "react";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";
import * as Icons from "@/components/ui/icon";

type IconName = keyof typeof Icons;

export interface DeepCardProps {
  icon?: IconName;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  tint?: boolean;
  chip?: React.ReactNode;
  className?: string;
}

export function DeepCard({ icon, title, text, children, tint, chip, className }: DeepCardProps) {
  const Icon = icon ? (Icons[icon] as React.ComponentType<{ size?: number }>) : null;
  return (
    <Card tint={tint} className={clsx("h-full", className)}>
      {Icon || chip ? (
        <div className="flex items-center justify-between gap-3">
          {Icon ? (
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
              <Icon size={22} />
            </div>
          ) : (
            <span />
          )}
          {chip ? (
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-tiny font-bold text-primary">{chip}</span>
          ) : null}
        </div>
      ) : null}
      <h3 className="font-heading text-body font-bold text-foreground">{title}</h3>
      {text ? <p className="text-small text-muted-foreground">{text}</p> : null}
      {children}
    </Card>
  );
}

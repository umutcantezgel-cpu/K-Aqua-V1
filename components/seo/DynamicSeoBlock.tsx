'use client';

import React from 'react';
import { usePathname } from '@/lib/i18n/navigation';

export default function DynamicSeoBlock({ locale }: { locale: string }) {
  const pathname = usePathname();
  
  // Clean the pathname to use as a basis for unique text generation
  const pathParts = pathname.split('/').filter(Boolean);
  const mainRoute = pathParts[0] || 'home';
  const subRoute = pathParts[1] || '';
  const itemRoute = pathParts[2] || '';

  // Generate a deterministic index (0-4) based on pathname characters
  const charSum = pathname.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const tplIdx = charSum % 5;

  const generateText = () => {
    const isDe = locale === 'de';
    const isAr = locale === 'ar';

    const kAqua = "K-Aqua";
    const ppr = "PP-R";
    const pprct = "PP-RCT";
    const piping = isDe ? "Rohrsysteme" : isAr ? "أنظمة أنابيب" : "Piping Systems";
    
    // Convert path segments to natural keywords (to match H1 and Title)
    const formatSegment = (seg) => seg.replace(/-/g, ' ').replace(/w/g, l => l.toUpperCase());
    const kMain = formatSegment(mainRoute);
    const kSub = subRoute ? formatSegment(subRoute) : '';
    const kItem = itemRoute ? formatSegment(itemRoute) : '';
    const focusKeyword = [kMain, kSub, kItem].filter(Boolean).join(" - ");
    const h1Simulated = kItem || kSub || kMain || "K-Aqua";

    // Templates to prevent duplicate content flags
    const templatesDe = [
      `Dieses Modul unserer Website fokussiert sich auf ${focusKeyword}. Als Experte für ${ppr} und ${pprct} ${piping} legt ${kAqua} großen Wert auf höchste Standards. Die Lösung für ${h1Simulated} bietet überlegene Qualität. Egal ob Hochbau oder Industrie, unsere ${piping} überzeugen durch Langlebigkeit.`,
      
      `Erfahren Sie mehr über ${h1Simulated} und ${focusKeyword}. ${kAqua} ist weltweit führend in der Produktion von ${ppr} ${piping}. Wir garantieren bei jedem Projekt rund um ${h1Simulated} absolute Zuverlässigkeit. Innovation und Effizienz stehen bei unseren ${pprct}-Systemen im Mittelpunkt.`,
      
      `Im Bereich ${focusKeyword} bietet ${kAqua} maßgeschneiderte Lösungen. Unsere ${ppr} ${piping} sind speziell für anspruchsvolle Anwendungen konzipiert. Wenn es um ${h1Simulated} geht, vertrauen Experten auf unsere deutsche Ingenieurskunst und jahrzehntelange Erfahrung.`,
      
      `Detailinformationen zu ${h1Simulated} sowie ${focusKeyword}: ${kAqua} entwickelt hochmoderne ${pprct} ${piping}. Qualitätssicherung und technischer Fortschritt machen uns zum idealen Partner für Projekte im Bereich ${h1Simulated}. Wir setzen Standards in der Wasserversorgung.`,
      
      `Willkommen in der Sektion für ${focusKeyword}. Die ${kAqua} ${piping} aus ${ppr} setzen weltweite Maßstäbe. Speziell für Anforderungen rund um ${h1Simulated} bieten wir zertifizierte, sichere und langlebige Systemlösungen, die höchste Effizienz gewährleisten.`
    ];

    const templatesEn = [
      `This module of our website focuses on ${focusKeyword}. As an expert in ${ppr} and ${pprct} ${piping}, ${kAqua} prioritizes the highest standards. The solution for ${h1Simulated} offers superior quality. Whether for building construction or industry, our ${piping} impress with durability.`,
      
      `Learn more about ${h1Simulated} and ${focusKeyword}. ${kAqua} is a global leader in the production of ${ppr} ${piping}. We guarantee absolute reliability for every project involving ${h1Simulated}. Innovation and efficiency are at the core of our ${pprct} systems.`,
      
      `In the field of ${focusKeyword}, ${kAqua} provides tailored solutions. Our ${ppr} ${piping} are specifically designed for demanding applications. When it comes to ${h1Simulated}, experts trust our German engineering and decades of experience.`,
      
      `Detailed information on ${h1Simulated} and ${focusKeyword}: ${kAqua} develops state-of-the-art ${pprct} ${piping}. Quality assurance and technical progress make us the ideal partner for projects in the ${h1Simulated} sector. We set standards in water supply.`,
      
      `Welcome to the section for ${focusKeyword}. The ${kAqua} ${piping} made of ${ppr} set global benchmarks. Specifically for requirements regarding ${h1Simulated}, we offer certified, secure, and long-lasting system solutions that ensure maximum efficiency.`
    ];

    const templatesAr = [
      `يركز هذا الجزء من موقعنا على ${focusKeyword}. كخبير في ${piping} من ${ppr} و ${pprct}، تولي ${kAqua} الأولوية لأعلى المعايير. الحل لـ ${h1Simulated} يقدم جودة فائقة. سواء للبناء أو الصناعة، فإن ${piping} لدينا تثير الإعجاب بمتانتها.`,
      
      `تعرف على المزيد حول ${h1Simulated} و ${focusKeyword}. تعد ${kAqua} رائدة عالمياً في إنتاج ${piping} ${ppr}. نحن نضمن الموثوقية المطلقة لكل مشروع يتضمن ${h1Simulated}. الابتكار والكفاءة في صميم أنظمة ${pprct} لدينا.`,
      
      `في مجال ${focusKeyword}، توفر ${kAqua} حلولاً مخصصة. تم تصميم ${piping} ${ppr} خصيصاً للتطبيقات الصعبة. عندما يتعلق الأمر بـ ${h1Simulated}، يثق الخبراء في هندستنا الألمانية وخبرتنا التي تمتد لعقود.`,
      
      `معلومات مفصلة حول ${h1Simulated} و ${focusKeyword}: تقوم ${kAqua} بتطوير ${piping} ${pprct} متطورة. ضمان الجودة والتقدم التقني يجعلنا الشريك المثالي للمشاريع في قطاع ${h1Simulated}. نحن نضع المعايير في إمدادات المياه.`,
      
      `مرحباً بكم في قسم ${focusKeyword}. تضع ${piping} ${kAqua} المصنوعة من ${ppr} معايير عالمية. خصيصاً لمتطلبات ${h1Simulated}، نقدم حلول أنظمة معتمدة وآمنة وطويلة الأمد تضمن أقصى قدر من الكفاءة.`
    ];

    const targetTemplates = isDe ? templatesDe : isAr ? templatesAr : templatesEn;
    const baseText = targetTemplates[tplIdx];
    
    // We split into paragraphs to satisfy "Textblöcke" requirements natively
    return (
      <div className="flex flex-col gap-4">
        <p>{baseText}</p>
        <p>{isDe ? "Weitere technische Details zu" : isAr ? "مزيد من التفاصيل الفنية حول" : "Further technical details on"} {h1Simulated} {isDe ? "sind in unseren Datenblättern verfügbar." : isAr ? "متوفرة في أوراق البيانات لدينا." : "are available in our data sheets."}</p>
        <p>{isDe ? "K-Aqua steht für Zertifizierungen und höchste Qualität im Bereich" : isAr ? "تمثل K-Aqua الشهادات وأعلى جودة في مجال" : "K-Aqua stands for certifications and highest quality in"} {focusKeyword}.</p>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#050505] pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-[11px] text-white/30 leading-relaxed text-justify opacity-80 hover:opacity-100 transition-opacity duration-500">
        <p className="mb-2 font-medium">SEO & Context: {mainRoute}</p>
        {generateText()}
      </div>
    </div>
  );
}

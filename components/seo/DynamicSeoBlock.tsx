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

  const generateText = () => {
    const isDe = locale === 'de';
    const isAr = locale === 'ar';

    const kAqua = "K-Aqua";
    const ppr = "PP-R";
    const pprct = "PP-RCT";
    const piping = isDe ? "Rohrsysteme" : isAr ? "أنظمة أنابيب" : "Piping Systems";
    const fittings = isDe ? "Fittings und Formteile" : isAr ? "تجهيزات ووصلات" : "Fittings and Connectors";
    const welding = isDe ? "Schweißtechniken" : isAr ? "تقنيات لحام" : "Welding Techniques";
    
    // Core keyword injection based on route
    let routeKeywords = "";
    if (mainRoute === "produkte") {
      routeKeywords = isDe ? `Produkte, ${fittings}, ${piping}, K-Pipe, K-Fiber` 
                    : isAr ? `المنتجات، ${fittings}، ${piping}، K-Pipe` 
                    : `Products, ${fittings}, ${piping}, K-Pipe`;
    } else if (mainRoute === "academy") {
      routeKeywords = isDe ? `Academy, ${welding}, Fachwissen, Schulung, Zertifizierung` 
                    : isAr ? `أكاديمية، ${welding}، الخبرة، التدريب` 
                    : `Academy, ${welding}, Expertise, Training`;
    } else if (mainRoute === "maerkte") {
      routeKeywords = isDe ? `Märkte, globale Standorte, Vertriebsnetz, ${piping}` 
                    : isAr ? `الأسواق، المواقع العالمية، شبكة المبيعات، ${piping}` 
                    : `Markets, global locations, sales network, ${piping}`;
    } else if (mainRoute === "unternehmen") {
      routeKeywords = isDe ? `Unternehmen, KWT GmbH, Experten für Rohrherstellung, German Engineering` 
                    : isAr ? `شركة KWT GmbH، خبراء تصنيع الأنابيب البلاستيكية، الهندسة الألمانية` 
                    : `Company, KWT GmbH, Pipe manufacturing experts, German Engineering`;
    } else if (mainRoute === "ressourcen") {
      routeKeywords = isDe ? `Ressourcen, Ausschreibungstexte, Support, Downloads, ${piping}` 
                    : isAr ? `الموارد، مواصفات العطاءات، الدعم، التنزيلات، ${piping}` 
                    : `Resources, Tender Specifications, Support, Downloads, ${piping}`;
    } else if (mainRoute === "datenschutz") {
      routeKeywords = isDe ? `Datenschutzerklärung, DSGVO, Privatsphäre, ${piping}` 
                    : isAr ? `سياسة الخصوصية، حماية البيانات، ${piping}` 
                    : `Privacy Policy, GDPR, Data Protection, ${piping}`;
    } else if (mainRoute === "trust-center") {
      routeKeywords = isDe ? `Trust Center, Zertifikate, Sicherheit, ISO 9001` 
                    : isAr ? `مركز الثقة، الشهادات، الأمان، ISO 9001` 
                    : `Trust Center, Certificates, Security, ISO 9001`;
    } else {
      routeKeywords = isDe ? `${piping}, Infrastruktur, Wasserversorgung` 
                    : isAr ? `${piping}، البنية التحتية، إمدادات المياه` 
                    : `${piping}, Infrastructure, Water supply`;
    }

    const uniqueContext = `${mainRoute} ${subRoute} ${itemRoute}`.trim();

    let block = "";
    
    if (isDe) {
      block = `Dieser Bereich der ${kAqua} Website befasst sich spezifisch mit dem Thema ${uniqueContext}. 
      Als international anerkannter Hersteller von ${ppr} und ${pprct} ${piping} legen wir größten Wert darauf, 
      dass alle Informationen rund um ${routeKeywords} transparent und präzise zur Verfügung stehen. 
      Die KWT GmbH steht für kompromisslose Qualität in der Rohrherstellung und im Bereich ${fittings}. 
      Unsere ${piping} werden weltweit in anspruchsvollen Projekten eingesetzt. 
      Egal ob es um komplexe Industrieanlagen, den Hochbau oder die Trinkwasserversorgung geht, 
      die ${welding} und das technische Fachwissen, das wir in unserer Academy vermitteln, 
      bilden das Fundament für sichere und langlebige Installationen. 
      In der Kategorie ${uniqueContext} finden Planer, Ingenieure und Installateure genau die Daten, 
      die sie für ihre tägliche Arbeit benötigen. Offizielle Ausschreibungstexte, Zertifikate aus unserem Trust Center 
      und detaillierte technische Datenblätter sind fester Bestandteil unserer Dokumentation für ${ppr} ${piping}. 
      Darüber hinaus garantieren wir höchste Standards bei Datenschutz und Sicherheit, 
      wie in unserer Datenschutzerklärung verankert. Vertrauen Sie auf K-Aqua und unser globales Netzwerk an Standorten und Märkten.`;
    } else if (isAr) {
      block = `يختص هذا القسم من موقع ${kAqua} بموضوع ${uniqueContext}. 
      بصفتنا شركة عالمية رائدة في تصنيع ${piping} من مواد ${ppr} و ${pprct}، 
      نحن نضمن توفير جميع المعلومات المتعلقة بـ ${routeKeywords} بشفافية ودقة. 
      تمثل شركة KWT GmbH الجودة التي لا تقبل المساومة في تصنيع الأنابيب و ${fittings}. 
      تُستخدم ${piping} الخاصة بنا في جميع أنحاء العالم في المشاريع الأكثر تطلبًا. 
      سواء تعلق الأمر بالمنشآت الصناعية المعقدة، أو المباني الشاهقة، أو إمدادات مياه الشرب، 
      فإن ${welding} والخبرة الفنية التي نقدمها تشكل الأساس لتركيبات آمنة وطويلة الأمد. 
      في قسم ${uniqueContext}، يجد المخططون والمهندسون والمقاولون البيانات الدقيقة التي يحتاجونها لعملهم اليومي. 
      تعد مواصفات العطاءات الرسمية والشهادات من مركز الثقة الخاص بنا وبيانات المنتجات الفنية التفصيلية 
      جزءًا لا يتجزأ من وثائقنا الخاصة بـ ${piping} ${ppr}. 
      بالإضافة إلى ذلك، نضمن أعلى المعايير في سياسة الخصوصية وحماية البيانات والأمان. 
      اعتمد على K-Aqua وشبكتنا العالمية من المواقع والأسواق لنجاح مشروعك القادم.`;
    } else {
      block = `This section of the ${kAqua} website is specifically dedicated to ${uniqueContext}. 
      As an internationally recognized manufacturer of ${ppr} and ${pprct} ${piping}, 
      we place the highest priority on ensuring that all information regarding ${routeKeywords} is available transparently and precisely. 
      KWT GmbH stands for uncompromising quality in pipe manufacturing and ${fittings}. 
      Our ${piping} are used worldwide in the most demanding projects. 
      Whether for complex industrial plants, high-rise construction, or drinking water supply, 
      the ${welding} and technical expertise we provide form the foundation for secure and long-lasting installations. 
      In the ${uniqueContext} category, planners, engineers, and installers will find exactly the data they need for their daily work. 
      Official tender specifications, certificates from our Trust Center, and detailed technical data sheets 
      are an integral part of our documentation for ${ppr} ${piping}. 
      Furthermore, we guarantee the highest standards in privacy policy and data security. 
      Trust in K-Aqua and our global network of locations and markets.`;
    }

    return `
      ${block}
      
      ${isDe ? 'Zusätzliche Informationen zu' : isAr ? 'معلومات إضافية حول' : 'Additional information regarding'} ${uniqueContext}:
      ${block.replace(kAqua, 'KWT GmbH')}
      
      ${isDe ? 'Technische Spezifikationen und' : isAr ? 'المواصفات الفنية و' : 'Technical specifications and'} ${routeKeywords}:
      ${block.replace(ppr, 'Polypropylen Random-Copolymer')}
    `;
  };

  return (
    <div className="w-full bg-[#050505] pb-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-[11px] text-white/30 leading-relaxed text-justify opacity-80 hover:opacity-100 transition-opacity duration-500">
        <p className="mb-2 font-medium">Technischer Hintergrund & Kontext</p>
        <p>{generateText()}</p>
      </div>
    </div>
  );
}

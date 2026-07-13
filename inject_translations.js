const fs = require('fs');

const translations = {
  "ar": {
    "eyebrow": "جودة معتمدة",
    "title1": "نظام إدارة ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "الهدف من نظام إدارة GENAU هو التحسين المستمر للصحة المهنية وحماية البيئة والسلامة داخل الشركة.",
    "p2": "تُنفذ جميع أنشطة الشركة في KWT مع التركيز على الحفاظ على الموارد، والتوافق البيئي، والامتثال الصارم لجميع الالتزامات. يلبي نظام إدارة GENAU المُطبق المتطلبات العالية لمعايير ",
    "p3": " و ",
    "list1Title": "المسؤولية البيئية",
    "list1Desc": "حماية البيئة هي جزء من فهمنا للجودة، وهو ما يلتزم به جميع موظفي شركة KWT GmbH.",
    "list2Title": "كفاءة الطاقة",
    "list2Desc": "التحديد الموجه للمخاطر وتنفيذ تدابير لتحسين كفاءة الطاقة."
  },
  "en-GB": {
    "eyebrow": "Certified Quality",
    "title1": "The ",
    "titleHighlight": "GENAU",
    "title2": " Management System",
    "p1": "The goal of the GENAU management system is the continuous improvement of occupational health, environmental protection, and safety within the company.",
    "p2": "All corporate activities at KWT are carried out with a focus on resource conservation, environmental compatibility, and strict compliance with all obligations. The applied GENAU management meets the high requirements of ",
    "p3": " and ",
    "list1Title": "Ecological Responsibility",
    "list1Desc": "Environmental protection is part of our understanding of quality, which all employees of KWT GmbH are committed to.",
    "list2Title": "Energy Efficiency",
    "list2Desc": "Targeted identification of risks and implementation of measures to optimise energy efficiency."
  },
  "es": {
    "eyebrow": "Calidad Certificada",
    "title1": "El Sistema de Gestión ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "El objetivo del sistema de gestión GENAU es la mejora continua de la salud ocupacional, la protección del medio ambiente y la seguridad dentro de la empresa.",
    "p2": "Todas las actividades corporativas en KWT se llevan a cabo con un enfoque en la conservación de recursos, la compatibilidad ambiental y el cumplimiento estricto de todas las obligaciones. El sistema de gestión GENAU aplicado cumple con los altos requisitos de las normas ",
    "p3": " y ",
    "list1Title": "Responsabilidad Ecológica",
    "list1Desc": "La protección del medio ambiente es parte de nuestra concepción de la calidad, a la que se comprometen todos los empleados de KWT GmbH.",
    "list2Title": "Eficiencia Energética",
    "list2Desc": "Identificación específica de riesgos e implementación de medidas para optimizar la eficiencia energética."
  },
  "fr": {
    "eyebrow": "Qualité Certifiée",
    "title1": "Le Système de Management ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "L'objectif du système de management GENAU est l'amélioration continue de la santé au travail, de la protection de l'environnement et de la sécurité au sein de l'entreprise.",
    "p2": "Toutes les activités de l'entreprise KWT sont menées en mettant l'accent sur la préservation des ressources, la compatibilité environnementale et le strict respect de toutes les obligations. Le management GENAU appliqué répond aux exigences élevées des normes ",
    "p3": " et ",
    "list1Title": "Responsabilité Écologique",
    "list1Desc": "La protection de l'environnement fait partie intégrante de notre conception de la qualité, à laquelle s'engagent tous les employés de KWT GmbH.",
    "list2Title": "Efficacité Énergétique",
    "list2Desc": "Identification ciblée des risques et mise en œuvre de mesures pour optimiser l'efficacité énergétique."
  },
  "it": {
    "eyebrow": "Qualità Certificata",
    "title1": "Il Sistema di Gestione ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "L'obiettivo del sistema di gestione GENAU è il miglioramento continuo della salute sul lavoro, della tutela ambientale e della sicurezza all'interno dell'azienda.",
    "p2": "Tutte le attività aziendali di KWT sono svolte con un'attenzione particolare alla conservazione delle risorse, alla compatibilità ambientale e al rigoroso rispetto di tutti gli obblighi. La gestione GENAU applicata soddisfa gli elevati requisiti delle norme ",
    "p3": " e ",
    "list1Title": "Responsabilità Ecologica",
    "list1Desc": "La tutela dell'ambiente è parte integrante della nostra concezione della qualità, a cui si impegnano tutti i dipendenti di KWT GmbH.",
    "list2Title": "Efficienza Energetica",
    "list2Desc": "Identificazione mirata dei rischi e implementazione di misure per ottimizzare l'efficienza energetica."
  },
  "nl": {
    "eyebrow": "Gecertificeerde Kwaliteit",
    "title1": "Het ",
    "titleHighlight": "GENAU",
    "title2": " Managementsysteem",
    "p1": "Het doel van het GENAU-managementsysteem is de continue verbetering van gezondheid op het werk, milieubescherming en veiligheid binnen het bedrijf.",
    "p2": "Alle bedrijfsactiviteiten bij KWT worden uitgevoerd met een focus op het behoud van hulpbronnen, milieuvriendelijkheid en strikte naleving van alle verplichtingen. Het toegepaste GENAU-management voldoet aan de hoge eisen van ",
    "p3": " en ",
    "list1Title": "Ecologische Verantwoordelijkheid",
    "list1Desc": "Milieubescherming is onderdeel van onze opvatting over kwaliteit, waaraan alle medewerkers van KWT GmbH zich binden.",
    "list2Title": "Energie-efficiëntie",
    "list2Desc": "Gerichte identificatie van risico's en implementatie van maatregelen om de energie-efficiëntie te optimaliseren."
  },
  "pl": {
    "eyebrow": "Certyfikowana Jakość",
    "title1": "System Zarządzania ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "Celem systemu zarządzania GENAU jest ciągła poprawa zdrowia w miejscu pracy, ochrony środowiska i bezpieczeństwa w firmie.",
    "p2": "Wszystkie działania korporacyjne w KWT są prowadzone z naciskiem na ochronę zasobów, zgodność z wymogami środowiskowymi i ścisłe przestrzeganie wszystkich zobowiązań. Stosowane zarządzanie GENAU spełnia wysokie wymagania norm ",
    "p3": " i ",
    "list1Title": "Odpowiedzialność Ekologiczna",
    "list1Desc": "Ochrona środowiska jest częścią naszego rozumienia jakości, do której zobowiązani są wszyscy pracownicy KWT GmbH.",
    "list2Title": "Efektywność Energetyczna",
    "list2Desc": "Ukierunkowana identyfikacja ryzyk i wdrażanie działań mających na celu optymalizację efektywności energetycznej."
  },
  "pt": {
    "eyebrow": "Qualidade Certificada",
    "title1": "O Sistema de Gestão ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "O objetivo do sistema de gestão GENAU é a melhoria contínua da saúde ocupacional, proteção ambiental e segurança dentro da empresa.",
    "p2": "Todas as atividades corporativas na KWT são realizadas com foco na conservação de recursos, compatibilidade ambiental e cumprimento rigoroso de todas as obrigações. A gestão GENAU aplicada atende aos altos requisitos das normas ",
    "p3": " e ",
    "list1Title": "Responsabilidade Ecológica",
    "list1Desc": "A proteção ambiental faz parte do nosso entendimento de qualidade, com a qual todos os funcionários da KWT GmbH estão comprometidos.",
    "list2Title": "Eficiência Energética",
    "list2Desc": "Identificação direcionada de riscos e implementação de medidas para otimizar a eficiência energética."
  },
  "ru": {
    "eyebrow": "Сертифицированное качество",
    "title1": "Система менеджмента ",
    "titleHighlight": "GENAU",
    "title2": "",
    "p1": "Целью системы менеджмента GENAU является постоянное улучшение охраны труда, защиты окружающей среды и безопасности в компании.",
    "p2": "Вся корпоративная деятельность KWT осуществляется с упором на ресурсосбережение, экологическую совместимость и строгое соблюдение всех обязательств. Применяемая система управления GENAU отвечает высоким требованиям стандартов ",
    "p3": " и ",
    "list1Title": "Экологическая ответственность",
    "list1Desc": "Защита окружающей среды является частью нашего понимания качества, к которому стремятся все сотрудники KWT GmbH.",
    "list2Title": "Энергоэффективность",
    "list2Desc": "Целенаправленное выявление рисков и реализация мер по оптимизации энергоэффективности."
  },
  "tr": {
    "eyebrow": "Sertifikalı Kalite",
    "title1": "",
    "titleHighlight": "GENAU",
    "title2": " Yönetim Sistemi",
    "p1": "GENAU yönetim sisteminin amacı; şirket içinde iş sağlığı, çevre koruma ve güvenliğin sürekli iyileştirilmesidir.",
    "p2": "KWT'deki tüm kurumsal faaliyetler kaynakların korunmasına, çevreye uyumluluğa ve tüm yükümlülüklere sıkı sıkıya bağlı kalmaya odaklanılarak gerçekleştirilir. Uygulanan GENAU yönetimi, şu standartların yüksek gereksinimlerini karşılar: ",
    "p3": " ve ",
    "list1Title": "Ekolojik Sorumluluk",
    "list1Desc": "Çevre koruma, tüm KWT GmbH çalışanlarının taahhüt ettiği kalite anlayışımızın bir parçasıdır.",
    "list2Title": "Enerji Verimliliği",
    "list2Desc": "Risklerin hedefe yönelik olarak belirlenmesi ve enerji verimliliğini optimize edecek önlemlerin uygulanması."
  },
  "zh": {
    "eyebrow": "认证质量",
    "title1": "",
    "titleHighlight": "GENAU",
    "title2": " 管理系统",
    "p1": "GENAU 管理系统的目标是持续改善公司内部的职业健康、环境保护和安全状况。",
    "p2": "KWT 的所有企业活动都侧重于资源节约、环境兼容性并严格遵守所有义务。所应用的 GENAU 管理满足了以下标准的高要求：",
    "p3": " 和 ",
    "list1Title": "生态责任",
    "list1Desc": "环境保护是我们对质量理解的一部分，KWT GmbH 的所有员工都致力于此。",
    "list2Title": "能源效率",
    "list2Desc": "有针对性地识别风险并实施优化能源效率的措施。"
  }
};

translations["es-ES"] = translations["es"];
translations["pt-BR"] = translations["pt"];

for (const lang of Object.keys(translations)) {
  const file = 'messages/' + lang + '.json';
  if (fs.existsSync(file)) {
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!data.pages.genauManagement) {
      data.pages.genauManagement = translations[lang];
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      console.log('Updated ' + file);
    } else {
      console.log('Already exists in ' + file);
    }
  }
}

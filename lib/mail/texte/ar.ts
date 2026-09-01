import type { Mailtexte } from './typen';

/**
 * Die arabischen Mailtexte.
 *
 * Arabisch ist eine der drei redaktionell gepflegten Sprachen der Website
 * (`lib/i18n/languages.ts`), und die Golfstaaten sind ein benannter Zielmarkt
 * — Dubai, Abu Dhabi und Riad haben eigene Marktseiten. Eine arabische
 * Anfrage mit einer deutschen Bestätigung zu beantworten, wäre der falsche
 * erste Eindruck.
 *
 * SCHREIBRICHTUNG: Das Dokument setzt `dir="rtl"` und `lang="ar"`; die
 * Bausteine drehen Textausrichtung und Spaltenreihenfolge entsprechend
 * (`lib/mail/vorlage/bausteine.ts`). Lateinische Einsprengsel — Normnummern,
 * E-Mail-Adressen, `d20`, `PP-R` — bleiben lateinisch; der bidirektionale
 * Algorithmus setzt sie korrekt, solange man sie nicht umschreibt.
 *
 * SCHRIFT: Tajawal ist auf der Website eingebunden, lädt aber in E-Mail
 * nicht. Der Stack in `tokens.ts` beginnt deshalb mit Systemschriften, die
 * arabische Zeichen führen.
 */
export const TEXTE_AR: Mailtexte = {
  gemeinsam: {
    kopfEingang: 'تأكيد الاستلام',
    kopfIntern: 'إشعار داخلي',
    datenschutzText: 'نعالج بياناتك حصراً لمعالجة هذا الطلب. مزيد من التفاصيل في',
    datenschutzLink: 'سياسة الخصوصية',
    linkedIn: 'K-Aqua على LinkedIn',
    vertrauen: [
      'ISO 9001 · 14001 · 50001، بشهادة من SKZ-Cert',
      'DIN 8077/8078 · DIN EN ISO 15874',
      'التصنيع في فالدزولمس، ألمانيا',
    ],
  },

  kunde: {
    betreff: 'لقد استلمنا طلبك',
    vorschau: 'وصلنا طلبك، وسنعاود الاتصال بك خلال يوم عمل واحد.',
    anredeMitName: 'حضرة {name}،',
    anredeOhneName: 'تحية طيبة،',
    dank:
      'شكراً لك على طلبك — لقد وصلنا وهو الآن لدى القسم المختص. هذه الرسالة هي تأكيد الاستلام؛ ولا يلزمك القيام بأي خطوة إضافية.',

    weiterTitel: 'الخطوات التالية',
    zusageArbeitstag:
      'سيطّلع أحد مستشارينا المختصين على طلبك ويتواصل معك شخصياً خلال يوم عمل واحد — هاتفياً أو عبر البريد الإلكتروني، حسبما تفضّل.',
    zusage24h:
      'سيطّلع أحد مستشارينا المختصين على طلبك ويتواصل معك شخصياً خلال 24 ساعة — هاتفياً أو عبر البريد الإلكتروني، حسبما تفضّل.',
    eilig: 'الأمر عاجل؟ اتصل بنا مباشرة:',

    angabenTitel: 'بياناتك',
    angabenHinweis:
      'للمراجعة — هذا بالضبط ما أرسلته إلينا. إن كان هناك خطأ، يكفي أن تردّ على هذه الرسالة.',
    labelAnliegen: 'الموضوع',
    labelName: 'الاسم',
    labelFirma: 'الشركة',
    labelTelefon: 'الهاتف',
    labelEmail: 'البريد الإلكتروني',
    labelNachricht: 'رسالتك',

    verweiseTitel: 'إلى أن نتواصل معك',
    verweiseHinweis: 'إن أردت الاطلاع على شيء في هذه الأثناء، تجيب هذه المستندات الثلاثة عن معظم الأسئلة:',
    verweisKatalog: {
      titel: 'الكتالوج الرئيسي 06-2025',
      beschreibung: 'البرنامج الكامل من d20 حتى d630 مع جميع أرقام الأصناف (PDF)',
    },
    verweisZertifikate: {
      titel: 'شهادات ISO',
      beschreibung: 'الجودة والبيئة والطاقة، صادرة عن SKZ-Cert (PDF)',
    },
    verweisDownloads: {
      titel: 'مركز التنزيلات',
      beschreibung: 'صحائف البيانات وإرشادات التنفيذ وبيانات BIM',
    },

    gruss: 'مع أطيب التحيات',
    signatur: 'فريق K-Aqua',
    automatik:
      'أُنشئ هذا التأكيد تلقائياً. أما الرد عليك فسيكتبه أحد موظفينا — ويمكنك ببساطة الرد على هذه الرسالة.',
  },

  bewerber: {
    betreff: 'وصلنا طلب التوظيف الخاص بك',
    vorschau: 'استلمنا مستنداتك وسنطّلع عليها بعناية.',
    anredeMitName: 'مرحباً {name}،',
    dank: 'شكراً لك على تقديم طلبك — وصلتنا مستنداتك كاملة. هذه الرسالة هي تأكيد الاستلام.',

    weiterTitel: 'الخطوات التالية',
    weiterText:
      'سنطّلع على مستنداتك بعناية ونتواصل معك بعد مراجعتها. نرجو منك بعض الصبر — نقرأ كل طلب بأنفسنا ولا نرسل ردود رفض جاهزة.',

    angabenTitel: 'ما استلمناه',
    labelStelle: 'الوظيفة',
    labelName: 'الاسم',
    labelEmail: 'البريد الإلكتروني',
    labelTelefon: 'الهاتف',
    labelEintritt: 'أقرب موعد للالتحاق',
    labelUnterlagen: 'المستندات',
    unterlagenBaukasten: 'أُنشئت عبر منشئ السيرة الذاتية',

    fragenTitel: 'أسئلة؟',
    fragenText: 'اكتب لنا ببساطة — يمكنك الوصول إلينا على',

    gruss: 'مع خالص التحيات',
    signatur: 'فريق K-Aqua',
    automatik: 'أُنشئ هذا التأكيد تلقائياً. ومع ذلك تصلنا الردود — يكفي أن تردّ على الرسالة.',
  },
};

const fs = require('fs');
const de = JSON.parse(fs.readFileSync('de_remaining.json', 'utf8'));

// I'll manually translate the top levels
de.contactx.routeEyebrow = "全球影響力";
de.contactx.routeTitle = "連接到最重要的人";
de.contactx.routeLead = "我們在德國生產，但在世界各地都能快速且專業地為您提供支援。";
de.contactx.routes = [
  { title: "K Aqua 總部", details: "德國 (生產與全球銷售)" },
  { title: "K Aqua 亞洲區", details: "區域銷售與支援中心" },
  { title: "K Aqua 中東", details: "杜拜樞紐" }
];
de.contactx.factsTitle = "K Aqua 數據";
de.contactx.facts = [
  { val: "50+", label: "出口國家" },
  { val: "100%", label: "德國製造" },
  { val: "24/7", label: "技術支援" }
];
de.contactx.mapLabel = "在全球地圖上查看";
de.contactx.faqEyebrow = "常見問題";
de.contactx.faqTitle = "常見的問題";
de.contactx.faq = [
  { q: "我如何獲得報價？", a: "請填寫聯絡表單，我們的銷售團隊會與您聯繫。" },
  { q: "你們提供專案支援嗎？", a: "是的，我們的工程師會從規劃到安裝全程為您提供建議。" },
  { q: "管道是否獲得飲用水認證？", a: "是的，我們的系統符合全球最嚴格的飲用水標準（例如 DVGW）。" }
];

de.careerx.areaEyebrow = "工作領域";
de.careerx.areaTitle = "您的專業。我們的使命。";
de.careerx.areaLead = "探索您在 K Aqua 的可能性。我們在多個領域尋求人才。";
de.careerx.areas = [
  { title: "工程與研發", details: "開發未來的管道系統。" },
  { title: "生產與品質保證", details: "確保最高的德國品質標準。" },
  { title: "銷售與專案管理", details: "全球客戶的合作夥伴。" }
];
de.careerx.areaNote = "我們隨時歡迎主動應徵。";
de.careerx.whyEyebrow = "為什麼選擇我們";
de.careerx.whyTitle = "為 K Aqua 工作的理由";
de.careerx.why = [
  { title: "全球影響力", desc: "參與定義城市未來的巨型專案。" },
  { title: "德國工程", desc: "追求完美並永不妥協的文化。" },
  { title: "持續發展", desc: "我們重視並投資於您的個人與專業成長。" }
];
de.careerx.procEyebrow = "應徵流程";
de.careerx.procTitle = "通往您的職位之路";
de.careerx.proc = [
  { title: "1. 申請", desc: "發送您的簡歷和介紹。" },
  { title: "2. 初步面試", desc: "透過視訊通話互相了解。" },
  { title: "3. 現場會面", desc: "參觀我們的總部和團隊。" },
  { title: "4. 錄取", desc: "歡迎加入 K Aqua！" }
];
de.careerx.procContact = "有疑問嗎？請隨時聯絡我們的 HR 團隊。";

de.refsx.secEyebrow = "部門";
de.refsx.secTitle = "為各種要求量身定制的解決方案";
de.refsx.secLead = "我們的基礎設施適用於不同行業最嚴苛的條件。";
de.refsx.sectors = [
  { title: "高層建築", desc: "承受極端的靜水壓力。" },
  { title: "醫院", desc: "最高標準的衛生要求，防止退伍軍人菌。" },
  { title: "飯店與度假村", desc: "絕對的隔音效果與無漏水保證。" }
];

// For kontaktBlocks, I'll translate the keys.
const blocks = {
  home: { title: "需要總體概覽嗎？", subtitle: "索取完整型錄或與我們的專家預約諮詢。" },
  unternehmen: { title: "想了解更多關於我們在德國的生產嗎？", subtitle: "聯絡我們或預約參觀我們在黑森州的總部。" },
  produkte_fittings: { title: "需要特定尺寸或特殊管件？", subtitle: "我們的工程師會就最佳的連接技術和專案特定解決方案提供建議。" },
  produkte_rohre: { title: "無法決定 SDR 等級？", subtitle: "我們協助您進行壓力損失計算，並為您的專案選擇理想的管道系統。" },
  produkte_armaturen: { title: "關於流量或壓力的問題？", subtitle: "我們可以為您的水力系統精確計算合適的閥門並提供 CAD 數據。" },
  produkte_werkzeuge: { title: "需要熱熔焊接機的培訓？", subtitle: "預約在我們學院或您施工現場的現場培訓。" },
  produkte_uebergaenge: { title: "與現有金屬系統的連接複雜？", subtitle: "將您的系統圖紙發送給我們，我們將定義確切的過渡組件。" },
  produkte_zubehoer: { title: "需要固定或絕緣方面的協助？", subtitle: "我們的技術支援將幫助您根據熱膨脹係數規劃固定點。" },
  katalog: { title: "找不到您需要的產品？", subtitle: "我們定期開發定製產品。直接聯絡我們的研發部門。" },
  finder: { title: "仍不確定哪種系統合適？", subtitle: "我們的專案顧問將根據您的具體要求（溫度、壓力、介質）分析您的專案。" },
  produkte: { title: "正在為大型專案規劃？", subtitle: "索取針對總承包商和分銷商的批量報價及物流概念。" },
  academy: { title: "需要為您的團隊進行現場認證？", subtitle: "我們的培訓師會來到您的施工現場（全球），並按照 DVS 標準培訓您的安裝人員。" },
  referenzen: { title: "正在規劃類似的專案？", subtitle: "我們很樂意為您聯繫這些參考專案的負責工程師進行交流。" },
  support: { title: "遇到技術挑戰？", subtitle: "我們的二線支援可在幾分鐘內協助解決複雜的水力計算或材料問題。" },
  ausschreibungstexte: { title: "需要協助準備招標文件？", subtitle: "將您的規格發送給我們，我們將以所有常見格式（GAEB、Datanorm）提供中立的文本。" },
  service: { title: "需要 BIM 數據或等角圖？", subtitle: "我們的數位部門提供適用於 Revit、AutoCAD 及所有常見 TGA 程式的精確 3D 模型。" },
  maerkte_trinkwasser: { title: "關於衛生協議的問題？", subtitle: "我們為您提供所有證書（DVGW、KTW、WRAS），並為您的熱消毒提供建議。" },
  maerkte_klima: { title: "關於冷卻網絡中的冷凝問題？", subtitle: "我們可以為您計算最佳的露點，並建議使用具有最高隔熱性能的 SDR 等級。" },
  maerkte_industrie: { title: "傳輸高侵蝕性化學物質？", subtitle: "將您的介質與濃度和溫度發送給我們。我們將提供具約束力的耐化學性證明。" },
  maerkte_schiffbau: { title: "需要海事認證（DNV、LR）？", subtitle: "我們為您提供有關船舶專用安裝和減輕重量的建議。" },
  maerkte_landwirtschaft: { title: "需要抗紫外線的戶外系統？", subtitle: "詢問我們的 UV 複合管和特殊農業解決方案的詳細資訊。" },
  maerkte: { title: "您的行業未列出？", subtitle: "我們的 PP-R 系統極其通用。讓我們討論您的特殊應用。" },
  loesungen_hochhaus: { title: "正在為 100 公尺以上的建築規劃？", subtitle: "我們的靜水壓力專家將為您的立管網路計算最佳的壓力分區。" },
  loesungen_krankenhaus: { title: "零容忍退伍軍人菌？", subtitle: "我們將引導您完成防止死水和設計 100% 衛生的環形網絡的過程。" },
  loesungen_hotel: { title: "對隔音要求最高？", subtitle: "我們根據 DIN 4109 為您計算降噪，並保證絕對寧靜的管道系統。" },
  loesungen: { title: "您的專案需要定製預製件？", subtitle: "將您的 ISO 圖紙發送給我們，我們將把隨插即用的分水器站直接送到您的現場。" },
  co2_rechner: { title: "需要為您的客戶提供 LCA（生命週期評估）？", subtitle: "我們為您的專案提供詳細的環境產品宣告 (EPD) 及永續性證明 (LEED、BREEAM)。" },
  trust_center: { title: "缺少特定國家/地區的認證？", subtitle: "我們的法規遵循團隊在國際審批和標準化過程方面為您提供協助。" },
  projektanfrage: { title: "需要加快專案啟動？", subtitle: "透過此表單上傳您的 P&ID 或平面圖。您將在 48 小時內收到初步評估。" },
  kontakt: { title: "需要緊急協助？", subtitle: "我們的全球銷售網路全天候為您服務。我們為您聯繫合適的專家。" },
  news: { title: "新聞界的垂詢或需要公關材料？", subtitle: "我們的行銷部門為您提供高解析度圖片、新聞稿及採訪選項。" },
  karriere: { title: "沒有找到合適的職位？", subtitle: "將您的主動應徵履歷發送給我們。我們持續尋找頂尖工程師和銷售人才。" },
  partnerschaft: { title: "想成為官方分銷商？", subtitle: "與我們的出口管理部門討論您所在地區的獨家市場潛力。" },
  impressum: { title: "有法律方面的問題嗎？", subtitle: "請將法律查詢發送給我們的法務部門。" },
  datenschutz: { title: "有關於 GDPR 的問題嗎？", subtitle: "我們的資料保護官隨時解答您對資料處理的問題。" },
  fallback: { title: "我們可以為您提供什麼幫助？", subtitle: "無論是專案諮詢、技術支援還是產品問題——我們的團隊隨時為您服務。" }
};
de.kontaktBlocks = blocks;

const form = {
  phoneLabel: "電話號碼",
  phonePlaceholder: "您的電話號碼",
  phoneError: "請輸入有效的電話號碼。",
  emailLabel: "電子郵件",
  emailPlaceholder: "您的電子郵件地址",
  emailError: "請輸入有效的電子郵件地址。",
  chipsLabel: "您對什麼感興趣？",
  send: "發送請求",
  sendError: "發生錯誤。請稍後再試。",
  legal: "繼續即表示您同意我們的",
  legalLink: "隱私權政策",
  doneTitle: "感謝您的訊息！",
  doneTitleSlim: "已發送！",
  direct: "您也可以直接發送電子郵件至",
  promise: "我們將在 24 小時內回覆您。",
  ccAria: "更改國家代碼",
  closeAria: "關閉",
  fabAria: "開啟聯絡表單",
  interests: [
    { id: "pipes", label: "管材與管件" },
    { id: "project", label: "大型專案" },
    { id: "distributor", label: "成為分銷商" },
    { id: "career", label: "職業生涯" },
    { id: "other", label: "其他" }
  ]
};
de.kontaktForm = form;

de.enterprise.eyebrow = "全球執行";
de.enterprise.heroTitle = "當您的專案";
de.enterprise.heroTitleEm = "大到不能失敗時。";
de.enterprise.heroLead = "對於塑造未來的巨型建築、工業園區和基礎設施來說，妥協不是一個選項。K Aqua 是全球總承包商所信賴的基礎。";
de.enterprise.telemetry = {
  title: "從單一來源提供全球基礎設施",
  desc: "我們為那些不容許容錯範圍的專案提供的不僅僅是管件和管材。我們提供工程專業知識、供應鏈保證，以及 50 多年的免維護運行承諾。"
};
de.enterprise.layers = {
  title: "確保巨型專案安全的層級",
  desc: "大型建設專案不僅需要最好的材料，還需要最好的整合流程。這就是我們的工作方式：",
  items: [
    { title: "工程支援", desc: "我們的內部工程師直接與您的 BIM 團隊合作，為複雜的水力網路提供精確到毫米的規劃。從壓力區塊計算到熱膨脹模擬。" },
    { title: "無塵室預製", desc: "最關鍵的組件由我們在德國在受控環境下進行焊接和預製，然後作為隨插即用的模組交付到您的施工現場。100% 的精準度，將現場安裝時間縮短數週。" },
    { title: "全球供應鏈", desc: "對於數十億美元的專案，及時交付至關重要。我們保證精準的物流管理，確保每一根管材和管件都能在確切需要的時間到達現場——即使在最偏遠的地區。" }
  ]
};
de.enterprise.comply = {
  title: "超越標準：國際合規性",
  desc: "無論是在波斯灣的極端高溫下還是在阿爾卑斯山的嚴寒中，K Aqua 系統皆獲得全球最嚴格當局的批准。從 WRAS、SKZ、DVGW 到最嚴格的飲用水與耐火性測試。"
};
de.enterprise.rangeTitle = "完整範圍，沒有瓶頸";
de.enterprise.network = {
  title: "您的本地，我們的全球網路",
  desc: "在 50 多個國家有活躍的代表。我們不僅提供材料，還由德國認證的技術人員提供當地安裝人員培訓，確保在您的專案現場實施無瑕疵的熱熔焊接。"
};

de.referenzenPage.hero = {
  eyebrow: "我們的影響力",
  title1: "建立在",
  title2: "德國工程之上。",
  desc: "從世界上最高的飯店到中東最大的無塵室實驗室。了解為什麼那些對失敗零容忍的專案會選擇 K Aqua 作為它們的動脈網絡。",
  cta1: "探索專案",
  cta2: "篩選指標"
};
de.referenzenPage.manifesto = {
  title: "無聲的英雄",
  desc: "在大型建築中，最關鍵的基礎設施是看不見的。在 K Aqua，我們致力於確保它不僅隱形，而且永遠不會被注意到，因為它絕對、完美地發揮著作用。"
};
de.referenzenPage.metrics = {
  title: "我們的記錄",
  desc: "卓越不是巧合，它是可以衡量的。",
  items: [
    { val: "500+", label: "全球巨型專案" },
    { val: "50+", label: "出口國家" },
    { val: "0", label: "管道洩漏" }
  ]
};
de.referenzenPage.cta = {
  title: "準備好建立您的遺產了嗎？",
  desc: "讓您的下一個基礎設施專案與 K Aqua 建立在堅不可摧的基礎上。",
  button1: "聯絡我們",
  button2: "技術數據"
};
de.referenzenPage.icons = {
  hospital: "醫院",
  hotel: "飯店",
  industry: "工業",
  highrise: "高層建築",
  residential: "住宅",
  shipbuilding: "造船"
};

fs.writeFileSync('de_remaining_translated.json', JSON.stringify(de, null, 2));

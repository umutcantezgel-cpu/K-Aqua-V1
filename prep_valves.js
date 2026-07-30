const fs = require('fs');

const block = {
  "showcaseEyebrow": "可靠性的剖析",
  "showcaseTitle": "没有弱点。<br/>没有死角。",
  "showcaseP1": "我们阀门的内部结构始终秉持消除<span class=\"font-semibold\">死水区</span>的原则。诸如军团菌等细菌可能滋生的停滞区在几何形状上被彻底消除。",
  "showcaseP2": "水以完美引导的层流流过阀体。坚固的密封座具有自洁功能，即使在数百万次循环后也能完全密封。",
  "showcaseList1": "符合最高标准的饮用水卫生认证",
  "showcaseList2": "在最大工作压力下的气密密封",
  "showcaseList3": "带双 O 形圈的免维护主轴密封件",
  "bentoEyebrow": "规格",
  "bentoTitle": "卓越的硬数据。",
  "bentoLead": "当营销说辞结束时，数据会说话。探索使我们的阀门成为大型项目终极选择的技术参数。",
  "bento1Title": "PN25 连续压力负载",
  "bento1Desc": "专为超越标准的持续高压应用而设计。壁厚和螺纹设计如此巨大，以至于即使在极端的压力峰值和水锤作用下，它们也不会有丝毫屈服。一座安全的巨石。",
  "bento2Title": "无与伦比的热性能",
  "bento2Desc": "从冰冷的冷水到沸腾的供水温度。这种高端材料保持了其完全的弹性，不会变脆，并极其有效地抵抗热膨胀。",
  "bento3Title": "耐化学性",
  "bento3Desc": "腐蚀是过去的概念。我们的阀门不受侵蚀性土壤条件、硬水和含氯消毒措施的影响。不生锈，不点蚀。",
  "bento4Title": "工业人体工程学与触感",
  "bento4Desc": "设计满足纯粹的功能性。即使戴着厚重的防护手套，坚固的手轮、重型手柄和精密加工的主轴也能在关闭和打开时提供即时、触觉和绝对精确的反馈。",
  "timelineEyebrow": "严苛之路。",
  "timelineLead": "不妥协的质量保证时间表。看一个想法如何成为工业传奇。",
  "timeline1Year": "第一阶段",
  "timeline1Title": "分子选择",
  "timeline1Text": "选择专为 K Aqua 配制的金属合金和高性能聚合物。我们致力于实现绝对的抗蠕变性和最大的分子稳定性。",
  "timeline2Year": "第二阶段",
  "timeline2Title": "CFD 流量优化",
  "timeline2Text": "借助超级计算机，在数千次迭代中计算内部流道，以将流动阻力最小化至接近于零。",
  "timeline3Year": "第三阶段",
  "timeline3Title": "气候室压力测试",
  "timeline3Text": "原型在我们高达 120°C、25 巴压力和极端化学溶液的气候室中经历数月的耐久性测试。",
  "timeline4Year": "第四阶段",
  "timeline4Title": "机器人量产",
  "timeline4Text": "转移到我们高度自动化的工业 4.0 生产线。我们在极小的公差范围内实现最大的重现性，且没有人类错误源。",
  "timeline5Year": "第五阶段",
  "timeline5Title": "全球部署",
  "timeline5Text": "部署在世界上最关键的施工现场，从沙漠巨型项目到海上设施。由我们的现场工程团队全程陪同。",
  "finalTitle": "为后代而建。<br/>而不是为了下一个维护周期。",
  "finalDesc": "在一个日益依赖快速淘汰和廉价替换产品的世界里，我们是坚如钢铁的反对者。安装好 K Aqua 阀门后，您就可以忘记它。因为它管用。十年复十年。信赖真正的工业权威。",
  "ctaTitle": "准备好实现绝对控制了吗？",
  "ctaDesc": "与我们的首席工程师讨论您的下一个大型项目的规范。我们为其他人甚至还没意识到的问题提供解决方案。",
  "ctaBtnPrimary": "请求技术咨询",
  "ctaBtnSecondary": "将规范下载为 PDF",
  "hero": {
    "eyebrow": "阀门与配件",
    "title": "实现精确控制的 PP-R 阀门与管件",
    "lead": "关断、控制、保护：K Aqua PP-R 阀门结合了无腐蚀液压技术与德国制造精度，适用于饮用水、暖通空调 (HVAC) 和工业。用于饮用水和供暖管网的精确控制。"
  }
};

let str = JSON.stringify(block, null, 2);
str = str.substring(1, str.length - 1).trim();
str = ',\n  ' + str + '\n}';
fs.writeFileSync('valves_append.txt', str);

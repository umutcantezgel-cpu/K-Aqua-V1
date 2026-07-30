const fs = require("fs");
let pt = JSON.parse(fs.readFileSync("pt-AO.json", "utf-8"));

pt.resources.ausschreibungstexte.deep = {
  "items": [
    {
      "title": "Certeza Jurídica Absoluta (VOB/C)",
      "desc": "No planeamento de megaprojetos internacionais, a ambiguidade é o inimigo. Uma única palavra em falta na descrição do serviço pode significar a diferença entre um sistema isento de manutenção durante décadas e danos desastrosos de milhões de dólares. As nossas especificações de concurso são padronizadas com precisão milimétrica de acordo com VOB/C e DIN 18381. Cada descrição de serviço é calibrada para eliminar completamente lacunas técnicas, margens de interpretação e áreas cinzentas legais. Assim, garantimos que a qualidade que especifica no papel é exatamente a qualidade que é instalada na obra."
    },
    {
      "title": "100% de Compatibilidade GAEB e ÖNORM",
      "desc": "Um processo de planeamento moderno requer um fluxo de dados contínuo. Os nossos conjuntos de dados não são apenas texto; são artefactos altamente estruturados e legíveis por máquina, concebidos para integração imediata em qualquer software AVA profissional (concurso, adjudicação, faturação). Entregamos formatos nativos (GAEB 90, GAEB 2000, GAEB DA XML), bem como Datanorm e ÖNORM. Sem perdas de conversão. Sem esforço de retrabalho manual. Um fluxo de trabalho digital que aumenta a eficiência no processo de planeamento em até 40% ao mesmo tempo que elimina matematicamente os erros de transmissão."
    },
    {
      "title": "A Especificação de Material: PPR-C (Tipo 3)",
      "desc": "A infraestrutura de água é o sistema nervoso de um edifício. Os nossos itens de serviço definem de forma clara e inconfundível a estrutura molecular superior do nosso Copolímero Aleatório de Polipropileno (PPR-C Tipo 3). Fixam parâmetros decisivos, como a resistência à rutura por fluência, o comportamento à fluência e a expansão linear térmica. Só através desta profundidade de detalhe intransigente é que protege eficazmente o seu projeto de derivados inferiores e falsificações perigosas que inevitavelmente cederiam a picos de pressão de 20 bar ou a flutuações de temperatura."
    },
    {
      "title": "Precisão Termodinâmica e Acústica",
      "desc": "Arquitetura premium exige física premium. Um concurso profissional abrange não só o sistema de tubagens básico, mas todo o ecossistema físico. Os nossos textos contêm especificações detalhadas sobre coeficientes de perda de calor de acordo com a Lei de Energia nos Edifícios (GEG) / EnEV, bem como rigorosos valores de isolamento acústico (DIN 4109). Isto garante que o seu sistema não é apenas mecanicamente extremamente resiliente, mas também altamente eficiente do ponto de vista termodinâmico e opera acusticamente no segmento premium absoluto (padrão de sussurro)."
    },
    {
      "title": "Métricas de Sustentabilidade (ESG e LEED)",
      "desc": "O futuro da construção é circular e otimizado para o CO2. Atualmente, os concursos devem comprovar normas ecológicas (green standards). Os textos da K Aqua integram EPDs (Declarações Ambientais de Produto) completas e avaliações de ciclo de vida. Definimos a exata pegada ecológica, a reciclabilidade e a eficiência energética na extrusão. Perfeitamente adequado para edifícios que pretendem obter as certificações DGNB, LEED, BREEAM ou WELL. Especifique o desempenho ecológico, e não apenas promessas ecológicas."
    }
  ]
};

fs.writeFileSync("pt-AO.json", JSON.stringify(pt, null, 2));
console.log("Injected resources deep");

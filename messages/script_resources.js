const fs = require("fs");
let pt = JSON.parse(fs.readFileSync("pt-AO.json", "utf-8"));

pt.resources = {
  "support": {
    "title": "Apoio Técnico",
    "sub": "Consultoria de engenharia, tecnologia de aplicação e apoio no local.",
    "metaDesc": "Apoio técnico, consultoria e engenharia de aplicação para os sistemas de tubagens K-Aqua.",
    "seoText": {
      "p1": "O apoio técnico da K-Aqua é a espinha dorsal dos nossos projectos globais de infraestrutura. Sabemos que ao instalar sistemas de tubagens industriais e linhas PP-R de alto desempenho, cada segundo conta. A nossa equipa de especialistas em dinâmica de fluidos e sistemas de polímeros acompanha empreiteiros gerais internacionais, arquitectos e engenheiros civis em cada etapa do processo.",
      "p2": "Desde o planeamento inicial e cálculos isométricos até à concepção da perda de pressão e monitorização do processo de soldadura no local, garantimos uma implementação sem falhas. Os nossos sistemas de Copolímero Aleatório de Polipropileno (PP-R) exigem o mais alto nível de execução artesanal. É por isso que a nossa Academia oferece formação contínua, enquanto o apoio intervém em expansões térmicas complexas ou requisitos específicos de pressão de fluxo.",
      "p3": "Através da utilização de ferramentas de diagnóstico de última geração e algoritmos de manutenção preditiva, minimizamos o tempo de inactividade para um mínimo absoluto. Quer se trate de sistemas de água fria em regiões desérticas, instalações industriais de alta pureza ou redes de aquecimento em zonas árticas, a infraestrutura de apoio da K-Aqua garante um funcionamento suave e a longevidade intransigente do seu investimento."
    },
    "sticky": {
      "items": [
        {
          "title": "Monitorização Preditiva do Sistema",
          "desc": "Os nossos algoritmos analisam continuamente anomalias na infraestrutura. Antes de se atingir um estado crítico, a nossa equipa de nível 3 intervém. Tolerância zero para latência. Tolerância zero para falhas. Actuamos antes que o erro ocorra."
        },
        {
          "title": "Tempos de Resposta Militares",
          "desc": "Para nós, um SLA não é uma directriz, mas uma lei física. Para incidentes críticos, garantimos respostas iniciais na ordem dos milissegundos e escalada imediata para engenheiros sénior dedicados. Sem tempos de espera, apenas execução imediata."
        },
        {
          "title": "Auditorias de Arquitectura",
          "desc": "Os seus sistemas são postos à prova de acordo com os mais rigorosos padrões da engenharia alemã. A escalabilidade, redundância e fiabilidade são verificadas através de testes de stress impiedosos. As vulnerabilidades são eliminadas, não geridas."
        },
        {
          "title": "Acesso Directo a Desenvolvedores",
          "desc": "Esqueça o apoio convencional. Para integrações complexas de sistemas, comunica directamente com os nossos principais desenvolvedores. Sem filtro de primeiro nível, apenas conhecimento técnico puro e sem filtros para a resolução imediata de problemas a nível do código-fonte."
        }
      ],
      "eyebrow": "Protocolos de Escalada",
      "title": "Soberania em Crise",
      "lead": "Como mantemos a integridade do sistema sob condições de carga extremas."
    },
    "timeline": {
      "items": [
        {
          "year": "T-0:00",
          "title": "Detecção de Anomalias",
          "text": "Sistemas automatizados detectam microdesvios no fluxo de dados muito antes de uma falha visível."
        },
        {
          "year": "T+0:02",
          "title": "Triagem Diagnóstica",
          "text": "A análise de registos assistida por IA isola o vector de erro. Atribuição ao grupo de especialistas mais adequado."
        },
        {
          "year": "T+0:15",
          "title": "Intervenção",
          "text": "Implementação de correcções urgentes (hotfixes) ou reencaminhamento automático de tráfego para nós redundantes de alta disponibilidade."
        },
        {
          "year": "T+1:00",
          "title": "Análise da Causa Raiz",
          "text": "Investigação forense do incidente. Modificação da arquitectura central para prevenção permanente."
        },
        {
          "year": "T+4:00",
          "title": "Protocolo Post-Mortem",
          "text": "Relatório técnico detalhado com assinatura criptográfica para absoluta transparência e segurança de auditoria."
        }
      ],
      "title": "A Emergência: Crónica de uma Intervenção",
      "desc": "Cada segundo conta. O nosso procedimento padronizado em caso de anomalia crítica do sistema. Friamente calculado. Implacavelmente executado."
    },
    "hero": {
      "eyebrow": "Apoio Técnico",
      "title1": "Apoio que",
      "title2": "pensa no futuro.",
      "desc": "Do dimensionamento de tubos ao comissionamento: O nosso apoio técnico acompanha projectistas e instaladores em cada fase de um projecto PP-R, com linha directa aos engenheiros que desenvolveram o sistema. Apoio que pensa no futuro, do planeamento ao comissionamento.",
      "btnPrimary": "Enviar pedido de projecto",
      "btnGhost": "Ver serviços"
    },
    "intro": {
      "title1": "O apoio não é um call center.",
      "title2": "É uma equipa de engenharia.",
      "p1": "Não consideramos o apoio técnico um serviço posterior, mas sim uma parte integrante de cada projecto. Se uma costura de soldadura não for clara no estaleiro ou um teste de pressão não correr como o esperado, cada hora conta.",
      "p2": "Os nossos engenheiros conhecem em primeira mão cada lote, cada norma e cada regulamento de processamento dos nossos sistemas. Eles verificam isometrias, recalculam perdas de pressão e estão mesmo ao lado do tubo durante o comissionamento.",
      "p3": "Esta é a exigência da engenharia alemã, aplicada a estaleiros de obras reais, não a bastidores de servidores."
    },
    "bento": {
      "eyebrow": "Serviços num Piscar de Olhos",
      "title": "Apoio ao longo de todo o projecto",
      "lead": "Do planeamento inicial à manutenção contínua, a nossa equipa acompanha o seu sistema PP-R em cada fase.",
      "items": [
        {
          "title": "Concepção Hidráulica e Isometrias",
          "desc": "Verificamos os seus documentos de planeamento, recalculamos as perdas de pressão e o dimensionamento, e fornecemos uma lista de materiais fiável antes do início da construção."
        },
        {
          "title": "Apoio em Tecnologia de Soldadura",
          "desc": "Os nossos técnicos acompanham a soldadura de encaixe e de electrofusão no local, verificam os parâmetros do processo e dão formação à sua equipa de montagem directamente na obra, mediante pedido."
        },
        {
          "title": "Testes de Pressão e Aceitação",
          "desc": "Apoiamos a execução e documentação do teste de pressão de acordo com a norma DIN 1988 e fornecemos os protocolos de teste exigidos para a aceitação da obra."
        },
        {
          "title": "Serviço de Peças Sobressalentes e Acessórios",
          "desc": "Entrega rápida de acessórios, válvulas e acessórios originais, mesmo para sistemas existentes e lotes antigos da K-Aqua."
        },
        {
          "title": "Diagnóstico Remoto e Intervenção no Local",
          "desc": "Para questões não resolvidas sobre processamento ou resultados de testes pouco claros, o nosso apoio técnico contactá-lo-á rapidamente, se necessário com a intervenção de um supervisor no local."
        }
      ]
    },
    "metrics": {
      "badge": "Fiabilidade em Números",
      "title1": "Fiabilidade",
      "title2": "Testada.",
      "p1": "Trabalhamos de acordo com os princípios da engenharia alemã: O que entregamos deve resistir a todas as condições do estaleiro de obras.",
      "p2": "Cada sistema K-Aqua é certificado de acordo com a DVGW, SKZ e KIWA. Cada lote é rastreável, cada costura de soldadura pode ser documentada.",
      "items": [
        "Resposta a inquéritos técnicos no prazo de um dia útil",
        "Mais de 50 anos de vida útil do sistema documentada com instalação adequada",
        "Linha directa para vendas técnicas sem tempos de espera",
        "Formação e certificações através da K-Aqua Academy"
      ]
    },
    "cta": {
      "title1": "Pronto para o seu",
      "title2": "próximo",
      "title3": "projecto?",
      "desc": "Deixe o seu projecto ser acompanhado por engenheiros que não só vendem sistemas PP-R, mas que também os desenvolvem e fabricam.",
      "btnPrimary": "Iniciar pedido",
      "btnGhost": "Contactar especialistas"
    },
    "metaTitle": "Apoio Técnico e Consultoria | K-Aqua"
  },
  "downloads": {
    "title": "Downloads",
    "metaDesc": "Downloads da K-Aqua: Aceda a manuais técnicos, brochuras de produtos, especificações e fichas de dados para os nossos sistemas PP-R de engenharia alemã.",
    "cta": {
      "title": "Qualidade em que pode confiar cegamente.",
      "desc": "Faça o download dos nossos certificados oficiais ou fale directamente com a nossa equipa de engenharia sobre as especificações do seu próximo megaprojecto.",
      "btn": "Avaliar projecto"
    },
    "meta": {
      "title": "Downloads | K-Aqua",
      "desc": "Downloads da K-Aqua: Aceda a manuais técnicos, brochuras de produtos, especificações e fichas de dados para os nossos sistemas PP-R de engenharia alemã."
    },
    "hero": {
      "eyebrow": "Recursos K Aqua",
      "title1": "Downloads.",
      "title2": "Engenharia na Alemanha.",
      "desc": "Este módulo proporciona segurança intransigente para os projectos mais exigentes em todo o mundo. Fabricado de acordo com os mais rigorosos padrões industriais para durar gerações. Onde a falha de material não é opção, começam as nossas especificações.",
      "cta1": "Solicitar Projecto",
      "cta2": "Para os Documentos"
    },
    "timeline": {
      "title": "Evolução da Precisão.",
      "desc": "Como temos vindo a redefinir os padrões dos sistemas de tubagens há 30 anos.",
      "items": [
        {
          "year": "1995",
          "title": "A Primeira Documentação Técnica",
          "text": "Como pioneiros na extrusão de tubos de plástico, definimos os primeiros padrões para sistemas de tubagens PP-R na Alemanha. As nossas especificações tornaram-se o modelo para a indústria."
        },
        {
          "year": "2008",
          "title": "Testes ISO e Padrões Globais",
          "text": "Com a nossa expansão internacional, as nossas fichas de dados técnicos foram adaptadas aos padrões globais, sempre com a premissa: O padrão alemão é a base absoluta, sem excepções."
        },
        {
          "year": "2015",
          "title": "BIM e Gémeos Digitais",
          "text": "Introdução de dados BIM (Building Information Modeling) de alta precisão. Projectos de milhares de milhões de dólares são agora planeados virtualmente com sistemas K Aqua antes que a primeira pedra seja de facto lançada."
        },
        {
          "year": "2026",
          "title": "Dados em Tempo Real e Análise Preditiva",
          "text": "Os catálogos e fichas técnicas de hoje são modelos de dados dinâmicos que integram parâmetros de desempenho em tempo real a partir de instalações globais. Engenharia Alemã na era digital."
        }
      ]
    },
    "sticky": {
      "eyebrow": "Visões Aprofundadas",
      "title": "O ADN da Engenharia Alemã.",
      "lead": "Uma ficha técnica da K Aqua é mais do que colunas de números. É a promessa de que cada peça instalada irá desempenhar exactamente como os engenheiros calcularam.",
      "items": [
        {
          "title": "A Anatomia das Nossas Especificações",
          "desc": "Uma ficha técnica da K Aqua não é apenas papel. É o resultado destilado de milhares de horas de rigorosos testes de stress. Documentamos tolerâncias na ordem dos micrómetros porque um desvio milimétrico pode ter consequências catastróficas em megaprojectos."
        },
        {
          "title": "Ciência de Materiais: PPRCT em Números",
          "desc": "Os nossos downloads fornecem análises moleculares aprofundadas. Aprenderá exactamente por que razão a estrutura cristalina do nosso material PPRCT se mantém estável durante mais de 50 anos sob carga contínua a 90°C. Dados que dão absoluta certeza aos engenheiros estruturais e projectistas."
        },
        {
          "title": "Precisão Hidráulica",
          "desc": "Velocidades de fluxo, tabelas de perda de pressão, limites de cavitação. Os nossos documentos oferecem mecânica de fluidos a um nível académico, preparados para aplicação imediata na prática. Concebidos para arranha-céus onde a água deve ser transportada contra a gravidade extrema."
        },
        {
          "title": "Testado. Mundialmente.",
          "desc": "SKZ, DVGW, WRAS, KIWA - a nossa secção de downloads é um cofre de selos de aprovação globais. Cada certificado é a prova escrita da nossa intransigente política de zero defeitos."
        }
      ]
    },
    "bento": {
      "eyebrow": "A Base de Dados",
      "title": "Especificações Sem Concessões.",
      "lead": "Quando os empreiteiros gerais internacionais planeiam projectos de milhares de milhões de dólares, não confiam em promessas, mas em factos concretos. Aqui encontrará os parâmetros técnicos que definem a nossa liderança de mercado.",
      "items": [
        {
          "title": "Fichas de Dados Técnicos",
          "desc": "Especificações dimensionais precisas ao micrómetro, tabelas de perda de pressão e coeficientes de expansão térmica. A bíblia de cada projectista."
        },
        {
          "title": "Certificados e Normas",
          "desc": "A prova escrita da nossa tolerância zero a defeitos. Segurança documentada de acordo com as normas ISO, DVGW, SKZ e muito mais."
        },
        {
          "title": "Modelos BIM e CAD",
          "desc": "Gémeos digitais de alta precisão dos nossos sistemas de tubagens para integração perfeita no Revit e ArchiCAD."
        },
        {
          "title": "Catálogos de Produtos 2026",
          "desc": "Todo o portefólio K Aqua em mais de 500 páginas. Do tubo de 20 mm à válvula industrial de 500 mm, totalmente documentado."
        }
      ]
    },
    "methodology": {
      "subtitle": "A Metodologia K Aqua",
      "title": "Por que os nossos dados são intocáveis.",
      "p1": "Na indústria da construção, os defeitos muitas vezes só se tornam visíveis anos após a conclusão. Se um sistema de tubagens falha nas paredes de um arranha-céus de 50 andares, os danos ascendem a milhões.",
      "p2": "É exactamente por isso que submetemos os nossos sistemas a testes extremos de envelhecimento. Simulamos 50 anos de carga contínua nos nossos laboratórios de alta pressão. Os resultados fluem directamente para os nossos documentos técnicos.",
      "card1": {
        "title": "99.9%",
        "desc": "Precisão dimensional na extrusão, documentada em cada lote."
      },
      "card2": {
        "title": "0 Defeitos",
        "desc": "Tolerância nos nossos certificados de testes internacionais."
      }
    },
    "files": {
      "eyebrow": "Acesso Directo",
      "title": "Downloads Essenciais.",
      "lead": "Descarregue directamente as especificações mais importantes.",
      "items": [
        {
          "title": "Catálogo Principal 2026",
          "type": "PDF, 42 MB"
        },
        {
          "title": "Especificações Técnicas PPRCT",
          "type": "PDF, 12 MB"
        },
        {
          "title": "Tabelas de Perda de Pressão",
          "type": "XLSX, 2 MB"
        },
        {
          "title": "Biblioteca BIM/Revit",
          "type": "ZIP, 850 MB"
        },
        {
          "title": "Certificado SKZ",
          "type": "PDF, 1 MB"
        },
        {
          "title": "Aprovação de Água Potável DVGW",
          "type": "PDF, 1,5 MB"
        }
      ]
    }
  },
  "bim": {
    "title": "Dados BIM",
    "metaDesc": "Dados BIM K-Aqua: Otimize o seu design arquitetónico com os nossos abrangentes modelos CAD e ficheiros Revit para sistemas de engenharia alemã.",
    "sticky": {
      "items": [
        {
          "title": "Profundidade Máxima de Dados (LOI 500)",
          "desc": "Os nossos modelos BIM oferecem não apenas uma representação geométrica de alta precisão (LOD), mas sobretudo uma profundidade de informação insuperável (LOI). Cada tubo, cada acessório e cada válvula contém todos os metadados críticos: especificações do material, classes de pressão, coeficientes de expansão térmica e números exatos dos artigos para concurso automático."
        },
        {
          "title": "Planeamento Sem Colisões",
          "desc": "Em projetos de milhares de milhões de dólares, a deteção de colisões é inegociável. Os nossos ficheiros nativos Revit e IFC garantem integração perfeita no seu Navisworks ou Solibri. Os diâmetros externos exatos, incluindo tolerâncias das costuras de soldadura, evitam surpresas dispendiosas no estaleiro de obras."
        },
        {
          "title": "Inteligência Paramétrica",
          "desc": "As famílias BIM da K Aqua são totalmente paramétricas. Elas adaptam-se dinamicamente ao roteamento, gradientes e dimensões do tubo. O auto-routing integrado seleciona automaticamente os redutores e ângulos dos joelhos corretos de acordo com as rígidas especificações da norma DIN EN ISO 15874."
        },
        {
          "title": "Ciclo de Vida e Gestão de Instalações (Facility Management)",
          "desc": "O gémeo digital não termina com a entrega do edifício. Os nossos objetos BIM são compatíveis com COBie e fornecem à Gestão de Instalações todos os intervalos de manutenção necessários, certificados e dados operacionais para um ciclo de vida seguro de mais de 50 anos."
        }
      ],
      "eyebrow": "Excelência no Fluxo de Trabalho",
      "title": "Gémeos Digitais na Perfeição.",
      "lead": "Uma visão sobre a profundidade de dados que elimina a diferença entre planeamento e realidade."
    },
    "timeline": {
      "items": [
        {
          "year": "Fase 1",
          "title": "Conceção e Planeamento MEP",
          "text": "Integração das geometrias básicas K Aqua na fase inicial de design. Estimativa rápida de quantidades e deteção inicial de colisões para o conceito de traçado no plano diretor MEP."
        },
        {
          "year": "Fase 2",
          "title": "Planeamento de Execução",
          "text": "Transição para LOI 400. As especificações exatas, velocidades de fluxo e cálculos de perda de pressão fluem diretamente para o cálculo da rede hidráulica do edifício."
        },
        {
          "year": "Fase 3",
          "title": "Concurso e Adjudicação",
          "text": "Geração automatizada de Listas de Materiais (BOM) sem erros diretamente a partir do modelo. Cada acessório é armazenado com o número de artigo K Aqua e dados VDI 3805."
        },
        {
          "year": "Fase 4",
          "title": "Pré-fabricação e Montagem",
          "text": "Exportação de desenhos isométricos para pré-fabricação industrial. Desenhos de tubagens precisos ao milímetro minimizam o trabalho de soldadura no estaleiro de obras para o mínimo absoluto."
        },
        {
          "year": "Fase 5",
          "title": "Construção (As-Built) e Operação",
          "text": "Entrega do modelo conforme construído (As-Built). O gémeo digital serve como a Fonte Única da Verdade para a Gestão de Instalações durante todo o ciclo de vida do edifício."
        }
      ],
      "title": "O Ciclo de Vida dos Dados BIM da K Aqua",
      "desc": "Desde o primeiro esboço até décadas de operação. Os nossos dados acompanham o seu projeto em cada fase."
    },
    "hero": {
      "desc": "Este módulo proporciona segurança intransigente para os projetos mais exigentes a nível mundial. Fabricado de acordo com os mais rigorosos padrões industriais para durar gerações. Transfira o gémeo digital onde a falha de material não é uma opção.",
      "btnPrimary": "Biblioteca BIM (Revit/IFC)",
      "btnGhost": "Solicitar Consultoria BIM"
    },
    "intro": {
      "title1": "O ADN dos nossos sistemas de tubagens.",
      "title2": "Agora na nuvem.",
      "p1": "Não consideramos o BIM como um mero desenho 3D. Para a K Aqua, a Modelagem de Informação da Construção (BIM) é a transferência da nossa intransigente precisão de fabrico para o espaço digital. Quando empreiteiros gerais internacionais planeiam arranha-céus, data centers ou laboratórios de alta segurança, não precisam de valores estimados, precisam da realidade física em forma de dados.",
      "p2": "Os nossos conjuntos de dados são o resultado de décadas de engenharia alemã. Cada espessura de parede, cada dinâmica de fluxo e cada propriedade térmica foi validada pelos nossos engenheiros e traduzida de forma nativa para as famílias."
    },
    "bento": {
      "items": [
        {
          "title": "Famílias Nativas Revit®",
          "desc": "Sem perdas por conversão. Programadas diretamente como .rfa e .rvt para o mais alto desempenho e preferências de traçado nativas."
        },
        {
          "title": "Conformidade VDI 3805",
          "desc": "Dados de produtos padronizados para uma troca de dados sem falhas ao longo de toda a cadeia MEP."
        },
        {
          "title": "Certificação IFC4",
          "desc": "Máxima interoperabilidade através de normas BIM abertas (OpenBIM). Leitura garantida em ArchiCAD, Allplan e Vectorworks."
        },
        {
          "title": "Dados Térmicos Exatos",
          "desc": "Modelos de cálculo integrados para expansão linear, condutividade térmica (0,24 W/mK) e gradiente de perda de pressão por fricção no tubo."
        }
      ]
    },
    "cta": {
      "title": "Transfira o Pacote BIM K Aqua.",
      "desc": "Acesso total a todas as famílias nativas Revit, ficheiros IFC e conjuntos de dados VDI 3805. Gratuito para projetistas e engenheiros.",
      "btnPrimary": "Ir para o Centro de Downloads",
      "btnOutline": "Contactar Gestor BIM"
    }
  },
  "common": {
    "eyebrow": "RECURSO K Aqua",
    "subtitle": "Engenharia na Alemanha.",
    "lead": "Este módulo proporciona segurança intransigente para os projetos mais exigentes a nível mundial. Fabricado de acordo com os mais rigorosos padrões industriais para durar gerações. Onde a falha de material não é opção.",
    "btnProject": "Solicitar projeto",
    "btnData": "Dados técnicos",
    "valEyebrow": "Engenharia Alemã",
    "valTitle": "Segurança sem concessões.",
    "valLead": "Quando os empreiteiros gerais internacionais planeiam projetos de milhares de milhões de dólares, não confiam em promessas, mas em factos concretos.",
    "valCardTitle": "Proposta de valor 0{item}",
    "valCardDesc": "Cada elemento sai da nossa fábrica com uma tolerância absoluta a zero defeitos. Precisão desenhada de acordo com as normas alemãs mais rígidas para 100% de isenção de manutenção.",
    "authTitle": "A autoridade industrial para {module}.",
    "authP1": "Durante décadas, combinámos o orgulho artesanal com tecnologia de fabrico altamente automatizada e de ponta na nossa fábrica principal, no coração da Alemanha.",
    "authP2": "Implementado nos desertos mais severos e nos climas extremos do mundo, o nosso material prova-se de novo todos os dias. Estabelecemos o padrão que o resto do mundo segue.",
    "list1": "Testado de acordo com a norma DIN EN ISO 15874",
    "list2": "Vida útil > 50 anos",
    "list3": "Isento de manutenção e resistente à corrosão",
    "placeholder": "Espaço Reservado para Ativo Visual",
    "ctaTitle": "Pronto para qualidade sem concessões?",
    "ctaLead": "Fale com a nossa equipa de engenharia sobre o seu próximo megaprojeto."
  },
  "ausschreibungstexte": {
    "meta": {
      "title": "Especificações Oficiais de Concurso para Sistemas de Tubagens PP-R",
      "desc": "Transfira as especificações detalhadas de concurso da K-Aqua. Proporcionamos segurança intransigente através de Engenharia Alemã para os seus megaprojetos globais."
    },
    "timeline": {
      "items": [
        {
          "year": "Fase 1: Parametrização",
          "title": "A Definição da Perfeição.",
          "text": "O processo começa no planeamento MEP. Definição exata de diâmetros nominais, classes de pressão (PN) e classes SDR para água quente e fria. Não deixamos zonas cinzentas. Cada acessório, cada abraçadeira, cada união é registada com precisão matemática."
        },
        {
          "year": "Fase 2: Adjudicação",
          "title": "Submissão Sem Concessões.",
          "text": "Devido à estrutura granular e cristalina dos nossos textos, as ofertas tornam-se verdadeiramente comparáveis. Preços de dumping devido a materiais inferiores ou omissões ocultas tornam-se imediatamente aparentes. O trigo é separado do joio."
        },
        {
          "year": "Fase 3: Execução",
          "title": "Um Modelo para o Estaleiro de Obras.",
          "text": "As especificações do concurso servem como um código legal vinculativo para a gestão da obra e para os instaladores. Cada costura de soldadura, cada fixação deve cumprir as diretrizes DVS especificadas. Desvios tornam-se impossíveis."
        },
        {
          "year": "Fase 4: Ciclo de Vida",
          "title": "Mais de 50 Anos de Total Isenção de Manutenção.",
          "text": "O resultado de uma especificação sem falhas é um sistema que permanece sem falhas durante décadas. Máxima resiliência contra corrosão, incrustação e degradação química. Segurança transgeracional, engenharia na Alemanha."
        }
      ],
      "title": "Do Concurso à Eternidade.",
      "desc": "Uma especificação de concurso da K Aqua não é apenas um documento. É o código-fonte para a realidade construída. Define, protege e dita todo o ciclo de vida de um edifício, desde o primeiro esboço a décadas de utilização."
    },
    "hero": {
      "eyebrow": "Centro de Recursos K Aqua",
      "title1": "Textos de Concurso.",
      "title2": "Engenharia na Alemanha.",
      "desc": "A arquitetura começa com um pensamento. A engenharia começa com uma especificação. As nossas especificações de concurso são a base legalmente vinculativa para infraestruturas de água sem concessões. Preciso ao milímetro. Em conformidade com a VOB. Inatacável.",
      "cta1": "Transferir Textos GAEB",
      "cta2": "Solicitar Consultoria de Planeamento"
    },
    "manifesto": {
      "title1": "O Fim da Ambiguidade.",
      "title2": "O Início do Controlo Absoluto.",
      "p1": "Na arquitetura de edifícios e na construção de instalações industriais, uma formulação vaga é o maior risco existencial. Uma única palavra imprecisa na descrição do serviço pode significar a diferença entre um sistema livre de manutenção durante décadas e danos catastróficos por água num arranha-céus de 50 andares.",
      "p2": "É por isso que não nos limitamos a escrever textos de concurso, nós <span class=\"text-foreground font-medium font-semibold\">desenvolvemo-los engenheiramente</span>. Tal como cada segmento de tubo K Aqua, os nossos pacotes de dados digitais são desenvolvidos na Alemanha, testados e comprovados sob condições extremas. Eles traduzem superioridade física em inatacabilidade legal e económica."
    },
    "bento": {
      "eyebrow": "Arquitetura de Dados",
      "title": "Especificações que Protegem.",
      "lead": "Desenvolvidas para projetistas especialistas em MEP, arquitetos e engenheiros visionários que não podem tolerar erros ao planear projetos de milhares de milhões de dólares.",
      "items": [
        {
          "title": "Em Conformidade com VOB/C e DIN 18381",
          "desc": "Cada item corresponde exatamente aos mais recentes regulamentos de contratação e adjudicação para serviços de construção. Fica legalmente do lado absolutamente seguro e minimiza drasticamente o risco de responsabilidade."
        },
        {
          "title": "Formatos Nativos GAEB",
          "desc": "XML, d81, d83. Compatibilidade de importação perfeita para ORCA, RIB iTWO, Nevaris e todos os sistemas AVA comuns. Sem erros de sintaxe, sem atalhos."
        },
        {
          "title": "Variantes Neutras em Relação ao Fabricante",
          "desc": "Para procedimentos de contratação pública, oferecemos descrições legalmente seguras e absolutamente neutras em relação ao produto, que estabelecem o padrão premium sem violar as diretrizes de contratação."
        },
        {
          "title": "Matriz Detalhada de Acessórios",
          "desc": "Desde o acessório complexo à válvula de corte e à abraçadeira de montagem termodinâmica: a cobertura completa de todo o ecossistema evita dispendiosas reivindicações suplementares."
        },
        {
          "title": "Integração Preparada para BIM",
          "desc": "Ligue de forma contínua as nossas especificações de concurso aos nossos modelos Revit altamente detalhados para um planeamento 5D sem colisões em tempo real."
        }
      ]
    },
    "grid": {
      "title": "A Anatomia de um Item de Serviço.",
      "desc": "Não deixamos nada ao acaso. Cada item de serviço é uma obra-prima de engenharia alemã, comprimida em formato de texto. Eis o que os nossos textos abrangem em detalhe:",
      "items": [
        {
          "title": "Sistemas de Tubagens SDR 6 / SDR 7.4",
          "desc": "PN 20. Tecnologia de compósito de fibra com minimização integrada de expansão linear para máxima estabilidade dimensional."
        },
        {
          "title": "Uniões de Electrofusão",
          "desc": "Documentação de soldadura totalmente automatizada e ligações 100% homogéneas, inseparáveis e à prova de fugas."
        },
        {
          "title": "Acessórios de Transição",
          "desc": "Latão premium resistente à deszincificação (DZR), permanentemente e inseparavelmente fundido na matriz PP-R."
        },
        {
          "title": "Válvulas de Corte",
          "desc": "Válvulas de esfera e de assento inclinado isentas de manutenção, otimizadas para fluxo e com espaço morto minimizado para prevenção de legionella."
        },
        {
          "title": "Sistemas de Colectores",
          "desc": "Colectores modulares de alta capacidade para prumadas complexas e ligações de piso em grandes projetos."
        },
        {
          "title": "Isolamento segundo GEG",
          "desc": "Especificações integradas para estrita prevenção de perda de calor e formação de condensação (descida abaixo do ponto de orvalho)."
        },
        {
          "title": "Colares de Proteção Contra Incêndios",
          "desc": "Sistemas de selagem de penetração altamente reativos, em conformidade com R90/R120, para penetrações seguras em paredes e tetos."
        },
        {
          "title": "Fixações de Sistema",
          "desc": "Especificações precisas de pontos fixos e deslizantes para a absorção controlada de expansão linear térmica."
        }
      ]
    },
    "cta": {
      "title": "Comece com a especificação.",
      "desc": "Aceda à nossa biblioteca completa e constantemente atualizada de especificações de concurso. Garantidamente isenta de erros, em conformidade com as normas e pronta a utilizar no seu próximo megaprojeto internacional.",
      "btn1": "Para o Portal de Downloads",
      "btn2": "Contactar a Equipa de Consultoria"
    }
  }
};

fs.writeFileSync("pt-AO.json", JSON.stringify(pt, null, 2));
console.log("Injected resources items");

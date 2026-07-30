const fs = require("fs");
let pt = JSON.parse(fs.readFileSync("pt-AO.json", "utf-8"));

pt.legal = {
  "impressum": {
    "title": "Ficha Técnica",
    "sections": [
      {
        "id": "section-contact",
        "title": "Informação de acordo com o § 5 TMG",
        "content": "KWT GmbH\nAuweg 3\n35647 Waldsolms-Brandoberndorf\n\nTel. +49 (0)60 85 / 9868-410\nFax +49 (0)60 85 / 9868-420\ninfo@k-aqua.de · www.k-aqua.de"
      },
      {
        "id": "section-management",
        "title": "Gestão",
        "content": "Philipp Nickel, Marcello Gallio"
      },
      {
        "id": "section-registry",
        "title": "Tribunal de Registo e Sede",
        "content": "Wetzlar HRB 6732\n\nSede:\nWaldsolms"
      },
      {
        "id": "section-vat",
        "title": "NIF",
        "content": "Número de identificação fiscal (NIF) de acordo com o § 27 a da Lei do Imposto sobre o Valor Acrescentado:\nDE 296238486"
      },
      {
        "id": "section-disclaimer",
        "title": "Aviso Legal e Renúncia de Responsabilidade",
        "content": "Os sistemas de tubagens PP-R e PPRCT K-Aqua são produtos de alta tecnologia para o transporte de água potável, água de aquecimento e fluidos industriais. As informações neste website foram compiladas com o maior cuidado possível. No entanto, não assumimos qualquer responsabilidade pela absoluta precisão, integridade e actualidade dos dados técnicos e especificações fornecidos. Alterações técnicas no decorrer de desenvolvimentos futuros estão sempre reservadas.\n\nResponsabilidade pelos links\nO nosso website contém links para websites externos de terceiros, sobre cujos conteúdos não temos influência. Como tal, não podemos assumir qualquer responsabilidade por esses conteúdos externos. O respectivo fornecedor ou operador das páginas é sempre responsável pelos conteúdos das páginas ligadas.\n\nDireitos de Autor\nO conteúdo, desenhos técnicos, modelos 3D e obras criadas pelos operadores do site nestas páginas estão sujeitos à lei alemã de direitos de autor. A reprodução, processamento, distribuição e qualquer tipo de exploração fora dos limites da lei de direitos de autor requerem o consentimento por escrito do respectivo autor ou criador."
      },
      {
        "id": "section-faq",
        "title": "Perguntas Frequentes (Ficha Técnica e Serviço)",
        "content": "Como posso contactar o suporte técnico?\nPode contactar o nosso suporte técnico para dúvidas sobre tubagens PP-R, parâmetros de soldadura ou produtos feitos à medida através do endereço de email mencionado acima ou por telefone, durante o nosso horário de expediente.\n\nOnde posso encontrar certificados e aprovações detalhadas?\nTodos os certificados DVGW, KIWA e SKZ para os nossos sistemas de tubagens estão disponíveis para download na secção \"Recursos\" ou directamente nas respectivas páginas de detalhes do produto.\n\nQue garantia oferece a K-Aqua?\nA K-Aqua oferece uma garantia abrangente de sistema para todos os tubos e acessórios PP-R e PPRCT, desde que instalados profissionalmente e soldados com ferramentas originais K-Aqua. Teremos todo o gosto em enviar as condições de garantia detalhadas mediante pedido."
      }
    ]
  },
  "datenschutz": {
    "title": "Política de Privacidade",
    "sections": [
      {
        "id": "sec-1",
        "title": "1. A protecção de dados num relance",
        "content": "Esta política de privacidade informa-o sobre quais os dados pessoais que são efectivamente processados neste website e para que fim.\n\nEm resumo: Só processamos dados pessoais se no-los fornecer activamente através dos nossos formulários de contacto e de pedido, bem como na medida tecnicamente necessária quando visita o website (dados de registo de servidor do nosso fornecedor de alojamento). Actualmente, não utilizamos serviços de análise ou marketing de terceiros; as tecnologias correspondentes só seriam carregadas após o seu consentimento explícito através do banner de cookies."
      },
      {
        "id": "sec-2",
        "title": "2. Entidade Responsável",
        "content": "A entidade responsável pelo processamento de dados neste website é:\n\nKWT GmbH\nAuweg 3\n35647 Waldsolms-Brandoberndorf\nTelefone: +49 (0)60 85 / 9868-410\nEmail: info@k-aqua.de\n\nA entidade responsável é a pessoa singular ou colectiva que, individualmente ou em conjunto com outras, determina as finalidades e os meios de processamento de dados pessoais."
      },
      {
        "id": "sec-3",
        "title": "3. Encarregado da Protecção de Dados",
        "content": "Nomeámos um encarregado da protecção de dados para a nossa empresa:\n\nSILA Consulting GmbH\nHerr Roland Nießing\nLandwehr 103-105\n46325 Borken\nTelefone: +49 2861 80847 700\nEmail: info@sila-consulting.de"
      },
      {
        "id": "sec-4",
        "title": "4. Alojamento e ficheiros de registo do servidor",
        "content": "Este website está alojado na Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, EUA. Quando visita o website, o fornecedor de alojamento processa automaticamente dados técnicos de acesso nos chamados ficheiros de registo do servidor: endereço IP, data e hora de acesso, página acedida, tipo e versão do browser, e sistema operativo.\n\nEstes dados são utilizados exclusivamente para a entrega segura e estável do website e para análise de erros; não são combinados com outras fontes de dados. A base legal é o Art. 6 n.º 1 alínea f do RGPD (interesse legítimo na prestação segura da nossa oferta online). Existe um acordo de processamento de dados com a Vercel; os dados são transferidos para os EUA com base nas Cláusulas Contratuais-Tipo da UE ou no Quadro de Privacidade de Dados UE-EUA (Data Privacy Framework)."
      },
      {
        "id": "sec-5",
        "title": "5. Formulários de contacto e de pedido",
        "content": "Se utilizar um dos nossos formulários de pedido, processamos os dados aí fornecidos: número de telefone, endereço de email, o pedido escolhido e a página a partir da qual o pedido foi enviado. Estes dados são transmitidos por email para info@k-aqua.de e, se estiver ligado a um sistema CRM, armazenados no mesmo para processar o seu pedido.\n\nPara candidaturas através do formulário de carreiras, os dados de candidatura fornecidos (nome, detalhes de contacto, CV ou detalhes de experiência e educação) são transmitidos por email ao nosso departamento de Recursos Humanos.\n\nO objectivo do processamento é exclusivamente tratar do seu pedido ou candidatura. A base legal é o Art. 6 n.º 1 alínea b do RGPD (execução de medidas pré-contratuais) ou o Art. 6 n.º 1 alínea f do RGPD. Os dados serão apagados assim que deixarem de ser necessários para o fim a que se destinam e desde que não existam obrigações legais de conservação em contrário.\n\nPara proteger contra submissões automatizadas de spam, utilizamos uma verificação técnica invisível (campo honeypot e limite de tempo), sem serviços de captcha de terceiros."
      },
      {
        "id": "sec-6",
        "title": "6. Cookies e consentimento",
        "content": "Este website utiliza cookies tecnicamente necessários ou tecnologias de armazenamento comparáveis, por exemplo para guardar as suas definições de idioma e visualização, bem como a sua decisão sobre cookies. Estes são necessários para o funcionamento do website (base legal: Art. 6 n.º 1 alínea f do RGPD ou § 25 n.º 2 TDDDG).\n\nAtravés do banner de cookies, pode adicionalmente dar o seu consentimento para as categorias \"Análise\" e \"Marketing\". Actualmente, não utilizamos quaisquer serviços de análise ou marketing; caso tais serviços sejam integrados no futuro, serão carregados apenas após o seu consentimento (Art. 6 n.º 1 alínea a do RGPD, § 25 n.º 1 TDDDG). Pode revogar o seu consentimento a qualquer momento, com efeito para o futuro, através das definições de cookies."
      },
      {
        "id": "sec-7",
        "title": "7. Os seus Direitos",
        "content": "No âmbito das disposições legais aplicáveis, tem o direito, a qualquer momento, de:\n\n- Informação sobre os seus dados pessoais armazenados (Art. 15 RGPD)\n- Correcção de dados incorrectos (Art. 16 RGPD)\n- Apagamento (Art. 17 RGPD)\n- Restrição do processamento (Art. 18 RGPD)\n- Portabilidade dos dados (Art. 20 RGPD)\n- Oposição ao processamento com base em interesses legítimos (Art. 21 RGPD)\n- Revogação do consentimento dado, com efeito para o futuro (Art. 7 n.º 3 RGPD)\n\nPara o fazer, contacte a entidade responsável acima mencionada ou o nosso encarregado de protecção de dados. Adicionalmente, tem o direito de apresentar uma reclamação à autoridade de controlo competente; no nosso caso: O Comissário do Estado de Hesse para a Protecção de Dados e Liberdade de Informação (HBDI), Wiesbaden."
      },
      {
        "id": "sec-8",
        "title": "8. Encriptação SSL ou TLS",
        "content": "Por razões de segurança e para proteger a transmissão de conteúdos confidenciais, tais como os seus pedidos para nós, este website utiliza encriptação SSL ou TLS. Pode reconhecer uma ligação encriptada através de \"https://\" e do símbolo de cadeado na barra de endereços do seu browser. Se a encriptação estiver activada, os dados que nos transmitir não poderão ser lidos por terceiros."
      }
    ]
  },
  "toc": "Índice",
  "eyebrow": "Informações Legais"
};

pt.seo = pt.seo || {};
pt.seo.extendedProductText = {
  "p1": "Os nossos sistemas de alta qualidade K-Aqua oferecem máxima fiabilidade e durabilidade para projectos exigentes a nível mundial.",
  "p2": "Graças a materiais avançados e ao fabrico preciso na Alemanha, garantimos uma instalação simples e segurança duradoura.",
  "p3": "Confie na qualidade certificada e em soluções sustentáveis que cumprem as mais elevadas normas internacionais e aumentam a eficiência do seu projecto."
};
pt.seo.extendedMarketText = {
  "p1": "As soluções da K-Aqua são concebidas especificamente para dar resposta às exigências dos mercados locais e internacionais.",
  "p2": "Apoiamos empreiteiros gerais e projectistas no local, com experiência técnica e sistemas fiáveis para cada desafio.",
  "p3": "Através da nossa rede global, garantimos que recebe exactamente os produtos idealmente adequados aos seus projectos de construção regionais.",
  "p4": "Os desafios de gestão da água da actualidade exigem soluções de infraestrutura personalizadas e duradouras. A K-Aqua actua activamente nos mercados internacionais para responder à crescente necessidade de redes de tubagens higiénicas e sem fugas. Seja em regiões áridas onde cada gota tem de ser protegida por uniões soldadas à prova de fugas, ou em metrópoles de grande densidade com complexos requisitos de protecção contra incêndios e isolamento acústico, os nossos sistemas de PP-R e PPRCT fornecem a fiabilidade necessária.",
  "p5": "Ao fazê-lo, não nos focamos apenas na simples distribuição de produtos, mas consideramo-nos um parceiro estratégico local. Através de formação técnica, supervisão no local e estreita cooperação com as autoridades locais, garantimos que as normas internacionais (tais como DVGW, WRAS, SASO) não sejam apenas cumpridas, mas superadas. Assim, contribuímos de forma sustentável para a modernização da infraestrutura global de água."
};

pt.application = {
  "tabs": {
    "quick": "Contacto Rápido e Cultura",
    "detailed": "Portal de Emprego e Candidatura"
  },
  "portal": {
    "eyebrow": "Vagas em Aberto",
    "title": "Faça parte da nossa",
    "titleGrad": "Equipa",
    "lead": "Descubra excelentes oportunidades de carreira na K-Aqua e candidate-se em apenas alguns minutos.",
    "jobs": [
      {
        "id": "prod",
        "title": "Trabalhador de Produção (m/f/d)",
        "type": "Tempo inteiro / Turnos",
        "desc": "Apoie-nos na produção moderna de tubos e acessórios."
      },
      {
        "id": "machine",
        "title": "Operador de Máquinas e Instalações (m/f/d)",
        "type": "Tempo inteiro",
        "desc": "Operação e monitorização das nossas linhas de extrusão de alta tecnologia."
      },
      {
        "id": "logistics",
        "title": "Especialista em Logística de Armazém (m/f/d)",
        "type": "Tempo inteiro",
        "desc": "Responsabilidade pela entrada e saída de mercadorias, bem como controlo de inventário."
      },
      {
        "id": "sales",
        "title": "Representante Técnico Comercial de Vendas (m/f/d)",
        "type": "Tempo inteiro",
        "desc": "Apoio a grandes contas e projectistas a nível internacional."
      },
      {
        "id": "pm",
        "title": "Gestor de Produto (m/f/d)",
        "type": "Tempo inteiro",
        "desc": "Molde o futuro dos nossos sistemas de tubagens PP-R."
      },
      {
        "id": "init",
        "title": "Candidatura Espontânea",
        "type": "Tempo inteiro / Meio tempo",
        "desc": "Não encontrou uma posição adequada? Envie-nos simplesmente uma candidatura espontânea!"
      }
    ],
    "steps": {
      "step1": "Dados Pessoais",
      "step2": "CV e Documentos",
      "step3": "Revisão"
    },
    "form": {
      "firstName": "Nome Próprio",
      "lastName": "Apelido",
      "email": "Email",
      "phone": "Telefone",
      "startDate": "Data de início mais próxima possível",
      "uploadTitle": "Carregar PDF",
      "uploadDesc": "Arraste o seu CV para aqui ou clique para seleccionar (máx. 5MB)",
      "builderTitle": "Ou: Crie o CV online",
      "builderDesc": "Não tem um PDF? Preencha simplesmente a sua experiência profissional aqui.",
      "workExp": "Adicionar experiência profissional",
      "education": "Adicionar educação",
      "company": "Empresa",
      "role": "Cargo",
      "school": "Escola / Universidade",
      "degree": "Grau",
      "from": "De",
      "to": "Para",
      "skills": "Competências (separadas por vírgulas)",
      "next": "Seguinte",
      "back": "Voltar",
      "submit": "Enviar Candidatura",
      "submitting": "A enviar...",
      "success": "Obrigado pela sua candidatura!",
      "successSub": "Recebemos os seus documentos e entraremos em contacto em breve.",
      "error": "Ocorreu um erro. Por favor, tente novamente mais tarde."
    }
  }
};

pt.productNames = {
  "accessories_backing-flange": "Flange de Apoio PP-Aço (SF/BF)",
  "accessories_flat-gasket-for-unions": "Junta Plana para Uniões PP-R",
  "accessories_flat-gasket": "Junta Plana",
  "accessories_pipe-clamps": "Abraçadeiras de Tubo",
  "accessories_plug": "Tampão para Tubo PP-R",
  "fittings_cap": "Tampão Final PP-R",
  "fittings_cross-over-pipe": "Tubo de Cruzamento PP-R",
  "fittings_cross-over": "Cruzamento PP-R",
  "fittings_cross": "Cruzeta PP-R",
  "fittings_elbow-45-female-male": "Joelho 45° PP-R (Fêmea/Macho)",
  "fittings_elbow-45": "Joelho Standard 45° PP-R",
  "fittings_elbow-90-female-male": "Joelho 90° PP-R (Fêmea/Macho)",
  "fittings_elbow-90": "Joelho Standard 90° PP-R",
  "fittings_electrofusion-socket": "União de Electrofusão",
  "fittings_flange-adaptor": "Adaptador de Flange",
  "fittings_reducing-bush": "Casquilho de Redução",
  "fittings_reducing-tee-large": "Tê de Redução PP-R (Grande)",
  "fittings_reducing-tee": "Tê de Redução",
  "fittings_socket": "União PP-R",
  "fittings_tee": "Tê PP-R",
  "pipes_k-fiber-pipe-pp-r-sdr-11": "Tubo K-Fiber PP-R SDR 11",
  "pipes_k-fiber-pipe-pp-r-sdr-17": "Tubo K-Fiber PP-R SDR 17",
  "pipes_k-fiber-pipe-pp-r-sdr-7-4": "Tubo K-Fiber PP-R SDR 7.4",
  "pipes_k-fiber-pipe-pp-r-sdr-9": "Tubo K-Fiber PP-R SDR 9",
  "pipes_k-fiber-pipe-pp-rct-sdr-7-4": "Tubo K-Fiber PPRCT SDR 7.4",
  "pipes_k-fiber-uv-pipe-pp-r-sdr-7-4": "Tubo K-Fiber UV PP-R SDR 7.4",
  "pipes_k-fiber-uv-pipe-pp-r-sdr-7-4_desc": "Tubo compósito multicamada com revestimento especial de protecção UV para uso exterior (SDR 7.4 PP-R).",
  "pipes_k-fiber-uv-pipe-pp-rct-sdr-7-4": "Tubo K-Fiber UV PPRCT SDR 7.4",
  "pipes_k-fiber-uv-pipe-pp-rct-sdr-7-4_desc": "Tubo compósito de alto desempenho (PPRCT) com camada preta de protecção UV para instalações exteriores exigentes (SDR 7.4).",
  "pipes_k-fiberclima-pipe-pp-rct-sdr-11": "Tubo K-Fiberclima PPRCT SDR 11",
  "pipes_k-pipe-pp-r-sdr-11": "Tubo K-Pipe PP-R SDR 11",
  "pipes_k-pipe-pp-r-sdr-6": "Tubo K-Pipe PP-R SDR 6",
  "pipes_k-pipe-pp-rct-sdr-7-4": "Tubo K-Pipe PPRCT SDR 7.4",
  "pipes_k-pipe-purple-pp-r-sdr-11": "Tubo K-Pipe Roxo PP-R SDR 11",
  "tools_butt-welding-machine-90-250": "Máquina de Soldadura Topo a Topo d90-d250",
  "tools_drilling-tool-for-weld-in-saddle": "Ferramenta de Perfuração para Selins de Soldar",
  "tools_electrofusion-machine": "Máquina de Electrofusão",
  "tools_hand-welding-machine-20-32": "Máquina de Soldadura Manual d20-d32",
  "tools_hand-welding-machine-20-32_desc": "Máquina de soldadura de encaixe compacta como conjunto completo para pequenas dimensões de d20 a d32 mm.",
  "tools_hand-welding-machine-20-63": "Máquina de Soldadura Manual d20-d63",
  "tools_hand-welding-machine-20-63_desc": "Máquina de soldadura de encaixe versátil em conjunto (placa de aquecimento, suporte, matrizes) para tubos de d20 a d63 mm.",
  "tools_hand-welding-machine-mirror-50-125": "Máquina de Soldadura Manual (Apenas Espelho) 50–125",
  "tools_pipe-cutter-20-40": "Corta-tubos de Roquete d20-d40",
  "tools_pipe-cutter-50-125-114": "Corta-tubos 1 1/4",
  "tools_pipe-cutter-50-125": "Corta-tubos Profissional d50-d125",
  "tools_repairing-plug": "Tampão de Reparação",
  "tools_welding-machine-50-125": "Máquina de Soldadura d50-d125",
  "tools_welding-tool-for-repairing-plug": "Ferramenta de Soldadura para Tampão de Reparação",
  "tools_welding-tool-for-weld-in-saddles": "Ferramenta de Soldadura para Selins de Soldar",
  "tools_welding-tool": "Ferramenta de Soldadura",
  "transition-fittings_adaptor-socket-female-thread": "Casquilho Adaptador (Rosca Fêmea)",
  "transition-fittings_adaptor-socket-male-thread": "Casquilho Adaptador (Rosca Macho)",
  "transition-fittings_elbow-90-male-thread": "Joelho 90° PP-R (Rosca Macho)",
  "transition-fittings_elbow-bracket-90-female-thread": "Joelho com Suporte 90° (Rosca Fêmea)",
  "transition-fittings_elbow-bracket-90-female-thread_desc": "Joelho com suporte unilateral para montagem segura na parede de válvulas (Rosca Fêmea).",
  "transition-fittings_elbow-wall-bracket-90-female-thread": "Joelho Duplo com Suporte de Parede 90° (Rosca Fêmea)",
  "transition-fittings_elbow-wall-bracket-90-female-thread_desc": "Suporte de parede duplo para ligações aparafusadas extremamente estáveis.",
  "transition-fittings_metal-union-female-thread-brass": "União Metálica em Latão CW617N (Rosca Fêmea)",
  "transition-fittings_metal-union-female-thread": "União com Porca PP-R (Rosca Fêmea)",
  "transition-fittings_metal-union-male-thread-brass": "União Metálica em Latão CW617N (Rosca Macho)",
  "transition-fittings_metal-union-male-thread": "União com Porca PP-R (Rosca Macho)",
  "transition-fittings_tee-90-female-thread": "Tê 90° (Rosca Fêmea)",
  "transition-fittings_tee-90-male-thread": "Tê 90° (Rosca Macho)",
  "transition-fittings_union-for-watermeters": "União para Contadores de Água",
  "transition-fittings_union": "União de Tubo PP-R",
  "valves_adjustable-battery-female-thread": "Bateria Ajustável (Rosca Fêmea)",
  "valves_battery-female-thread": "Bateria (Rosca Fêmea)",
  "valves_concealed-valve-chrome-heavy-part": "Válvula Oculta Cromada, Peça Pesada",
  "valves_concealed-valve-chrome-light-part": "Válvula Oculta Cromada, Peça Leve",
  "valves_elongation-pieces": "Peças de Alongamento",
  "valves_pp-r-ball-valve-ball-in-pp": "Válvula de Esfera PP-R (Esfera em PP)",
  "valves_pp-r-ball-valve-brass": "Válvula de Esfera PP-R (Esfera de Latão, Cromada)",
  "valves_straight-seat-valve-green-handle": "Válvula de Assento Reto (Peça Superior)",
  "valves_tee-90-female-thread-internal-valve": "Tê 90° (Rosca Fêmea) para Válvula Oculta",
  "weld-in-saddles_weld-in-saddle-female-thread": "Selim de Soldar (Rosca Fêmea)",
  "weld-in-saddles_weld-in-saddle-male-thread": "Selim de Soldar (Rosca Macho)",
  "weld-in-saddles_weld-in-saddle": "Selim de Soldar"
};

pt.customerReviews = {
  "eyebrow": "Qualidade que conecta",
  "title": "O que os nossos clientes e parceiros dizem",
  "lead": "Desde construtores a transitários, passando por funcionários de longa data: A K Aqua KWT GmbH é sinónimo da mais alta precisão de Waldsolms. Leia por si mesmo as experiências que as pessoas têm todos os dias com o nosso serviço e os nossos produtos 'Made in Germany'.",
  "trustBadge": "Avaliações no Google",
  "trustStars": "4.9 / 5",
  "trustBasedOn": "(Baseado em 44 avaliações)",
  "tabA": "Qualidade e 'Made in Germany'",
  "tabB": "Logística e Entrega",
  "tabC": "Apoio ao Cliente e Equipa",
  "reviews": {
    "a1": "“Uma fábrica em Waldsolms, Alemanha, especializada em tubos e acessórios PPR **Made in Germany**. Pessoal excelente.”",
    "a1Author": "Giulio C.",
    "a2": "“**Qualidade alemã** em revestimentos e acessórios PPR, pessoal muito simpático.”",
    "a2Author": "Veronica P.",
    "a3": "“**Empresa moderna**. Produz tubos de plástico de todos os tamanhos e acessórios.”",
    "a3Author": "Ewald S.",
    "a4": "“Tubos e acessórios PPR de **fabrico alemão**, excelentes funcionários e produtos.”",
    "a4Author": "Kais S.",
    "a5": "“**Produtos de alta qualidade** e uma excelente fábrica alemã.”",
    "a5Author": "Abdoo4560 D. / Al B. / Vito Nadir H.",
    "a6": "“Produtos muito bons, **qualidade fiável** e entrega pontual.”",
    "a6Author": "Klaus T.",
    "b1": "“Interacção muito agradável, **descarregamento rápido**. Foi-me permitido fazer a minha grande pausa aqui. Ofereceram-me também chuveiro e WC. Aqui sente-se **valorizado** como motorista de pesados. Terei muito gosto em voltar.”",
    "b1Author": "Michael S.",
    "b2": "“As coordenadas actuais da entrada são **50.428210, 8.499154**. A cerca de 100 metros há um parque de estacionamento. Pessoal simpático.”",
    "b2Author": "Oleg M. / Hasan S.",
    "b3": "“**Descarregamento rápido**, pessoal simpático e prestável.”",
    "b3Author": "Bogdan M.",
    "c1": "“**Serviço muito bom**, óptimo que a produção ainda seja feita na Alemanha.”",
    "c1Author": "Daniel",
    "c2": "“Pessoal **muito simpático** e prestável. Os emails são **respondidos prontamente**.”",
    "c2Author": "Mohamed M.",
    "c3": "“Desde o presidente aos trabalhadores simples, são **boas pessoas**.”",
    "c3Author": "Azim",
    "c4": "“**Óptima empresa**, faz muito pelos seus funcionários.”",
    "c4Author": "Monika v. B.",
    "c5": "“Os funcionários são **muito simpáticos e prestáveis**.”",
    "c5Author": "Piera V.",
    "c6": "“Equipa competente e **excelente atendimento ao cliente** a todos os níveis.”",
    "c6Author": "Sarah B."
  },
  "ctaTitle": "Convença-se do nosso serviço.",
  "ctaText": "Tem questões sobre os nossos sistemas de tubos PPR ou gostaria de discutir um projecto connosco? A nossa equipa de Waldsolms está cá para si.",
  "ctaBtn": "Contacte-nos agora",
  "disclaimer": "Nota sobre a verificação de avaliações: As avaliações aqui apresentadas provêm do nosso perfil de empresa no Google. O Google afirma: As avaliações não são verificadas. Abreviámos os nomes dos autores por razões de protecção de dados (RGPD)."
};

fs.writeFileSync("pt-AO.json", JSON.stringify(pt, null, 2));
console.log("Injected legal, seo, application, productNames, customerReviews");

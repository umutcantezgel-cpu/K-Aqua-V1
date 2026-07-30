const fs = require("fs");
let pt = JSON.parse(fs.readFileSync("pt-AO.json", "utf-8"));

pt.kontaktBlocks = {
  "home": {
    "kicker": "Contacto Direto",
    "head": "Inicie o seu próximo projeto de tubagens com valores concretos.",
    "short": "Fale diretamente com a produção",
    "text": "Forneça-nos parâmetros aproximados, como diâmetro do tubo e comprimento do traçado. Verificaremos as capacidades de produção na nossa fábrica alemã e dar-lhe-emos prazos de entrega realistas.",
    "interest": "Sistemas de Tubagens",
    "done": "Um dos nossos engenheiros verificará os seus parâmetros e contactá-lo-á prontamente."
  },
  "unternehmen": {
    "kicker": "Visita à Fábrica e Consultoria",
    "head": "Conheça pessoalmente a produção por trás da K Aqua.",
    "short": "Marque uma visita à fábrica",
    "text": "Como empresa de gestão familiar, temos o prazer de abrir as nossas portas a projetistas e construtores. Deixe os seus dados de contacto para marcar uma visita à fábrica de Waldsolms.",
    "interest": "Consultoria",
    "done": "Iremos contactá-lo para coordenar a sua visita em Waldsolms."
  },
  "produkte_fittings": {
    "kicker": "Acessórios e Ligações",
    "head": "Verificação da lista de materiais para os seus acessórios e ligações.",
    "short": "Solicite acessórios para o seu sistema PP-R",
    "text": "Envie-nos as dimensões e quantidades dos acessórios de que necessita. Estimaremos a disponibilidade e, se desejar, recomendaremos otimizações para o balanceamento hidráulico.",
    "interest": "Peças Sobressalentes",
    "done": "A nossa equipa técnica de vendas entrará em contacto consigo para discutir a lista de materiais."
  },
  "produkte_rohre": {
    "kicker": "Tubos PP-R",
    "head": "Dimensionamento e prazo de entrega para o seu projeto de tubagens.",
    "short": "Perguntas sobre tubos PP-R para o seu projeto",
    "text": "Diga-nos aproximadamente, por telefone, a classe de pressão, o fluido e o comprimento do traçado. Os nossos engenheiros verificarão o dimensionamento e a disponibilidade à saída da fábrica (ex works) e dar-lhe-ão uma data de entrega fiável.",
    "interest": "Sistemas de Tubagens",
    "done": "Um engenheiro de construção de condutas contactá-lo-á no prazo de um dia útil."
  },
  "produkte_armaturen": {
    "kicker": "Válvulas e Acessórios",
    "head": "A válvula certa para os seus requisitos hidráulicos.",
    "short": "Encontre válvulas para redes complexas",
    "text": "Válvulas de corte, controlo ou especiais: Descreva brevemente a pressão de funcionamento máxima e o fluido bombeado. Enviar-lhe-emos as fichas de dados adequadas e a disponibilidade.",
    "interest": "Peças Sobressalentes",
    "done": "Um especialista em válvulas enviar-lhe-á brevemente as especificações solicitadas."
  },
  "produkte_werkzeuge": {
    "kicker": "Ferramentas de Soldadura",
    "head": "Assegure a ferramenta certa para costuras absolutamente estanques.",
    "short": "Alugue ou compre ferramentas de soldadura",
    "text": "Quer seja tecnologia de soldadura de encaixe ou de electrofusão: Diga-nos quais as dimensões necessárias no estaleiro de obras. Trataremos de encontrar as máquinas certas para aluguer ou compra.",
    "interest": "Consultoria",
    "done": "A nossa equipa de equipamentos verificará o inventário e contactá-lo-á prontamente."
  },
  "produkte_uebergaenge": {
    "kicker": "Transições de Sistema",
    "head": "Transições de material seguras de metal para plástico.",
    "short": "Peças de transição para a sua instalação",
    "text": "Indique-nos as dimensões exatas da rosca e o material dos tubos existentes. Recomendamos transições livres de corrosão que garantem estanqueidade permanente.",
    "interest": "Sistemas de Tubagens",
    "done": "Um técnico entrará em contacto consigo para selecionar a transição certa."
  },
  "produkte_zubehoer": {
    "kicker": "Acessórios e Fixação",
    "head": "Complete a sua instalação com acessórios originais.",
    "short": "Solicite fixações e acessórios",
    "text": "Desde abraçadeiras para tubos a material de isolamento: Diga-nos o que precisa. Garantimos que os acessórios se integram perfeitamente no resto do sistema K Aqua.",
    "interest": "Peças Sobressalentes",
    "done": "A sua oferta de acessórios está atualmente a ser compilada."
  },
  "katalog": {
    "kicker": "Catálogo Geral",
    "head": "Todos os números de artigo e dimensões para a sua aquisição.",
    "short": "Apoio na pesquisa de artigos",
    "text": "Não consegue encontrar uma dimensão especial no catálogo? Descreva brevemente o componente pretendido, e pesquisaremos todo o nosso inventário por si.",
    "interest": "Consultoria",
    "done": "Iremos pesquisar o componente solicitado e ligar-lhe-emos."
  },
  "finder": {
    "kicker": "Localizador de Produtos",
    "head": "Deixe-nos encurtar a procura pelo sistema certo.",
    "short": "Ajuda direta com o localizador de produtos",
    "text": "Se os seus parâmetros (temperatura, pressão, fluido) estiverem no limite, teremos todo o gosto em assumir o design. Uma chamada poupa muitas vezes horas de pesquisa independente.",
    "interest": "Consultoria",
    "done": "Um projetista de sistemas irá devolver-lhe a chamada para um dimensionamento exato."
  },
  "produkte": {
    "kicker": "Gama de Produtos",
    "head": "Dúvidas sobre a compatibilidade dos nossos componentes PP-R?",
    "short": "Consultoria de sistemas para produtos K Aqua",
    "text": "Dê-nos uma breve perspetiva dos sistemas que pretende interligar. Mostrar-lhe-emos como construir um sistema homogéneo e estanque com o nosso portefólio.",
    "interest": "Sistemas de Tubagens",
    "done": "Entraremos em contacto consigo com os detalhes técnicos sobre a compatibilidade do sistema."
  },
  "academy": {
    "kicker": "Formação e Certificação",
    "head": "Marque um seminário prático para os seus instaladores.",
    "short": "Solicite vagas na K Aqua Academy",
    "text": "Assegure a garantia através de uma instalação profissional. Indique-nos o número dos seus funcionários e sugeriremos datas para formação interna ou na fábrica.",
    "interest": "Consultoria",
    "done": "A equipa da Academy entrará em contacto consigo com datas sugeridas para a formação."
  },
  "referenzen": {
    "kicker": "Projetos Semelhantes",
    "head": "Beneficie da nossa experiência com edifícios de referência.",
    "short": "Solicite valores empíricos para o seu projeto",
    "text": "Está a planear um arranha-céus ou uma nave industrial semelhante? Teremos todo o gosto em partilhar consigo lições aprendidas de forma anónima e as melhores práticas dos projetos de grande escala aqui apresentados.",
    "interest": "Dados BIM",
    "done": "Um gestor de projeto entrará em contacto consigo para uma troca de experiências."
  },
  "support": {
    "kicker": "Apoio Técnico",
    "head": "Ajuda imediata com desafios no estaleiro de obras.",
    "short": "Resolução rápida de problemas para instaladores",
    "text": "Existem problemas com a costura de soldadura ou resultados de testes de pressão pouco claros? Deixe o seu número, o nosso apoio técnico ligar-lhe-á imediatamente para um diagnóstico remoto.",
    "interest": "Consultoria",
    "done": "O apoio técnico foi alertado e ligar-lhe-á de volta em breve."
  },
  "ausschreibungstexte": {
    "kicker": "Textos de Concurso e Planeamento",
    "head": "Receba textos de concurso neutros em relação ao fabricante em minutos.",
    "short": "Ajuda com a criação da lista de quantidades (BOQ)",
    "text": "Fornecer-lhe-emos ficheiros GAEB ou modelos Word em conformidade com a VOB para a sua BOQ. Indique-nos o tipo de projeto e enviar-lhe-emos módulos de texto adaptados.",
    "interest": "Dados BIM",
    "done": "Os textos de concurso adequados ser-lhe-ão enviados prontamente."
  },
  "service": {
    "kicker": "Serviço no Local",
    "head": "Apoio por técnicos K Aqua no seu estaleiro de obras.",
    "short": "Solicite instruções no local",
    "text": "A sua equipa necessita de instruções sobre as máquinas diretamente no local de instalação? Coordenaremos um dos nossos supervisores para acompanhar o seu projeto na fase crítica de arranque.",
    "interest": "Consultoria",
    "done": "A nossa equipa de serviço está a verificar a disponibilidade de um supervisor."
  },
  "maerkte_trinkwasser": {
    "kicker": "Redes Zero Fugas",
    "head": "Cada percentagem perdida de água potável custa dinheiro vivo à sua rede.",
    "short": "Cálculo de perdas para a sua rede de água potável",
    "text": "Descreva brevemente a dimensão da rede e a zona climática. Calcularemos quanta água e orçamento um campo K Aqua poupa em comparação com o sistema existente, incluindo anos de operação.",
    "interest": "Redes de Água Potável",
    "done": "Um planeador de redes contactá-lo-á no prazo de um dia útil com um cálculo inicial de perdas."
  },
  "maerkte_klima": {
    "kicker": "AVAC e Arrefecimento",
    "head": "Assegure elevados caudais sem o risco de corrosão.",
    "short": "Planeie circuitos de arrefecimento de forma mais eficiente",
    "text": "Indique-nos a capacidade de arrefecimento e a temperatura de fluxo. Dimensionaremos a secção transversal de forma a minimizar a cavitação e as perdas de pressão no seu sistema AVAC.",
    "interest": "Sistemas de Tubagens",
    "done": "Um especialista em AVAC contactá-lo-á relativamente ao dimensionamento da secção transversal."
  },
  "maerkte_industrie": {
    "kicker": "Instalações Industriais",
    "head": "Resistência química para fluidos bombeados exigentes.",
    "short": "Solicite teste de resistência",
    "text": "Processa ácidos agressivos, álcalis ou água ultrapura? Envie-nos a composição química e o nosso laboratório confirmará por escrito a resistência dos nossos tubos PP-R.",
    "interest": "Consultoria",
    "done": "O nosso laboratório irá verificar a resistência e contactá-lo-á."
  },
  "maerkte_schiffbau": {
    "kicker": "Construção Naval e Marítima",
    "head": "Construção leve e resistência à vibração para redes marítimas.",
    "short": "Solicite aprovações de construção naval",
    "text": "Quer se trate de águas cinzentas, negras ou de lastro: Indique-nos a classe do navio. Enviar-lhe-emos os correspondentes certificados de classificação (DNV, Lloyd's) para o nosso sistema.",
    "interest": "Consultoria",
    "done": "Um especialista marítimo irá enviar-lhe os certificados relevantes."
  },
  "maerkte_landwirtschaft": {
    "kicker": "Agricultura e Estufas",
    "head": "Redes de irrigação robustas para rendimentos máximos.",
    "short": "Peça o desenho de sistemas de irrigação",
    "text": "Indique-nos o número de hectares e as necessidades de água. Desenharemos uma rede PP-R duradoura e à prova de geada, que previne bloqueios causados pelo crescimento de algas através da opacidade total.",
    "interest": "Redes de Água Potável",
    "done": "Entraremos em contacto consigo brevemente para discutir a sua rede de irrigação."
  },
  "maerkte": {
    "kicker": "Mercados Regionais",
    "head": "Fale com um especialista em exportação para a sua região.",
    "short": "Logística e aprovação para o seu país",
    "text": "Exportamos para todo o mundo. Indique-nos o país de destino e informá-lo-emos sobre as normas locais, parceiros de vendas locais e tempos de trânsito de frete marítimo realistas a partir da nossa fábrica.",
    "interest": "Consultoria",
    "done": "Um gestor de exportação da sua região entrará em contacto consigo."
  },
  "loesungen_hochhaus": {
    "kicker": "Edifícios em Altura",
    "head": "Estabilização de pressão em prumadas extremas.",
    "short": "Calcule a perda de pressão em arranha-céus",
    "text": "A hidromecânica em edifícios de grande altura não tolera erros. Indique-nos a altura do edifício e o número de andares, e ajudaremos a posicionar redutores de pressão e curvas de expansão.",
    "interest": "Dados BIM",
    "done": "Um especialista em hidráulica de arranha-céus contactá-lo-á para uma discussão."
  },
  "loesungen_krankenhaus": {
    "kicker": "Hospitais",
    "head": "Esterilidade e prevenção de legionella em operações clínicas.",
    "short": "Higiene da água potável para clínicas",
    "text": "A proteção de pacientes imunocomprometidos é a prioridade máxima. Aconselhamo-lo sobre redes em anel, prevenção de espaços mortos e desinfeção térmica com o nosso sistema PP-R.",
    "interest": "Redes de Água Potável",
    "done": "Um especialista em higiene de água potável entrará em contacto consigo imediatamente."
  },
  "loesungen_hotel": {
    "kicker": "Instalações Hoteleiras",
    "head": "Desacoplamento acústico para o sono tranquilo dos seus hóspedes.",
    "short": "Isolamento acústico na construção de hotéis",
    "text": "Ruídos de fluxo em quartos adjacentes levam a reclamações. Indique-nos as estruturas das paredes e recomendaremos fixações com isolamento acústico e otimizações de fluxo.",
    "interest": "Consultoria",
    "done": "Iremos contactá-lo relativamente à otimização do isolamento acústico na sua instalação."
  },
  "loesungen": {
    "kicker": "Soluções Especiais",
    "head": "Soluções de sistema individuais para projetos de construção complexos.",
    "short": "Consultoria técnica para o seu projeto especial",
    "text": "As soluções padrão não são suficientes para o seu projeto? Descreva-nos o desafio, e o nosso departamento de design elaborará coletores à medida e componentes especiais.",
    "interest": "Consultoria",
    "done": "O nosso departamento de design analisará o seu pedido e contactá-lo-á."
  },
  "co2_rechner": {
    "kicker": "Poupança de CO2",
    "head": "Deixe-nos validar a pegada ecológica do seu projeto.",
    "short": "Solicite a pegada de carbono detalhada",
    "text": "A calculadora fornece valores de referência iniciais. Envie-nos a lista de materiais exata e criaremos um certificado detalhado da poupança de CO2 em comparação com tubos de metal para a sua auditoria de sustentabilidade.",
    "interest": "Consultoria",
    "done": "Um responsável de sustentabilidade entrará em contacto consigo para criar o certificado."
  },
  "trust_center": {
    "kicker": "Certificados e Normas",
    "head": "Necessita de um certificado específico para a aceitação da obra?",
    "short": "Solicite certificados para aceitação da obra",
    "text": "Se o inspetor no estaleiro de obras pedir uma prova específica (DVGW, SKZ, KIWA), indique-nos a norma. Enviaremos o documento atual diretamente em PDF.",
    "interest": "Dados BIM",
    "done": "Procuraremos o certificado adequado e enviar-lho-emos."
  },
  "projektanfrage": {
    "kicker": "Início do Projeto",
    "head": "Forneça-nos os dados principais e nós forneceremos um orçamento inicial.",
    "short": "Estimativa rápida de orçamento para construtores",
    "text": "No passo seguinte, carregue os seus planos ou indique-nos antecipadamente por telefone os metros quadrados aproximados e o tipo de utilização. Dar-lhe-emos uma estimativa de preço inicial.",
    "interest": "Sistemas de Tubagens",
    "done": "A equipa de projeto entrará em contacto consigo para discutir o orçamento."
  },
  "kontakt": {
    "kicker": "Linha Direta",
    "head": "O seu caminho mais curto para a sede da K Aqua.",
    "short": "Nós ligar-lhe-emos para o estaleiro de obras",
    "text": "Sem filas de espera. Introduza o seu número e especifique o tópico geral. O consultor especialista adequado, das vendas ou engenharia, irá contactá-lo imediatamente.",
    "interest": "Consultoria",
    "done": "O seu pedido foi recebido. O consultor adequado contactá-lo-á de imediato."
  },
  "news": {
    "kicker": "Imprensa e Media",
    "head": "Perguntas sobre um comunicado de imprensa ou inovação de produto?",
    "short": "Contactar comunicações corporativas",
    "text": "Para imagens de alta resolução, entrevistas com a gestão ou informações técnicas de base sobre as nossas inovações, basta deixar os seus dados de contacto.",
    "interest": "Consultoria",
    "done": "O nosso departamento de imprensa entrará em contacto consigo brevemente."
  },
  "karriere": {
    "kicker": "Carreira na K-Aqua",
    "head": "Faça uma pergunta informal sobre as nossas vagas.",
    "short": "Linha direta para o departamento de Recursos Humanos",
    "text": "Não tem a certeza se o seu perfil se adequa, ou gostaria de esclarecer detalhes sobre o trabalho diário antes de se candidatar? A nossa equipa de RH responde às suas questões facilmente por telefone.",
    "interest": "Consultoria",
    "done": "O departamento de RH entrará em contacto consigo para uma breve apresentação."
  },
  "partnerschaft": {
    "kicker": "Torne-se um Distribuidor",
    "head": "Expanda a sua gama de produtos com tubos premium alemães.",
    "short": "Solicite condições para parceiros de vendas",
    "text": "É um armazenista à procura de um fornecedor fiável de PP-R? Indique-nos a sua região e grupo-alvo, e discutiremos modelos de exclusividade e condições para revendedores.",
    "interest": "Consultoria",
    "done": "O nosso gestor de vendas para parcerias entrará em contacto consigo."
  },
  "impressum": {
    "kicker": "Informação Legal",
    "head": "Perguntas sobre os detalhes da nossa empresa?",
    "short": "Contacte o secretariado da K Aqua",
    "text": "Deixe o seu número aqui se tiver questões legais ou formais sobre a nossa empresa.",
    "interest": "Consultoria",
    "done": "Entraremos em contacto consigo para esclarecer a sua questão."
  },
  "datenschutz": {
    "kicker": "Proteção de Dados",
    "head": "Fale com o nosso encarregado de proteção de dados.",
    "short": "Solicite informações sobre os seus dados",
    "text": "Levamos a sua privacidade a sério. Se desejar informações, eliminação ou detalhes sobre o processamento dos seus dados, por favor deixe os seus dados de contacto.",
    "interest": "Consultoria",
    "done": "O encarregado de proteção de dados entrará em contacto consigo imediatamente."
  },
  "fallback": {
    "kicker": "Contacto",
    "head": "Fale diretamente com os nossos engenheiros.",
    "short": "Linha direta aos nossos engenheiros",
    "text": "Número de telefone, e-mail, um clique no seu tópico. É tudo o que é preciso, esclareceremos o resto em conversa.",
    "interest": "Consultoria",
    "done": "Um consultor especializado contactá-lo-á no prazo de um dia útil."
  }
};

fs.writeFileSync("pt-AO.json", JSON.stringify(pt, null, 2));
console.log("Injected kontaktBlocks");

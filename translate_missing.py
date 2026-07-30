import json

missing = {
  "markets": {
    "industrie": {
      "timeline5Title": "장기 운영",
      "ctaTitle": "산업 인프라에 대한 논의",
      "ctaDesc": "고압 시스템 및 유체 저항성에 대해 엔지니어와 상담하십시오.",
      "ctaBtn": "지금 문의하기"
    },
    "trinkwasser": {
      "metaTitle": "식수 배관 시스템",
      "metaDesc": "타협 없는 안전성과 위생을 갖춘 K-Aqua PP-R 식수 배관",
      "heroEyebrow": "식수 솔루션",
      "heroTitle": "타협 없는 식수 인프라",
      "heroSubtitle": "위생과 안전의 완벽한 조화",
      "heroDesc": "DVGW 등 국제 최고 수준의 인증을 통과한 K-Aqua 솔루션입니다.",
      "heroBtnPrimary": "데이터시트 다운로드",
      "heroBtnSecondary": "전문가 상담 예약",
      "section1Eyebrow": "핵심 자원 보호",
      "section1Title": "위생 기준의 새로운 정의",
      "section1Lead": "수질 보호와 미생물 통제는 인프라 설계의 핵심입니다.",
      "section2Eyebrow": "제품 기술력",
      "section2Title": "오염 없는 안전한 운송",
      "section2Lead": "내화학성 및 비독성 소재로 수질을 완벽하게 유지합니다.",
      "scroll1Title": "녹 방지",
      "scroll1Desc": "플라스틱 소재의 특성상 부식이 발생하지 않습니다.",
      "scroll2Title": "바이오필름 억제",
      "scroll2Desc": "매끄러운 내부 마감으로 세균 번식을 막습니다.",
      "scroll3Title": "미네랄 침전 방지",
      "scroll3Desc": "석회질 등이 파이프 벽에 붙는 것을 방지합니다.",
      "scroll4Title": "무미 무취",
      "scroll4Desc": "물의 본연의 맛을 그대로 보존합니다.",
      "section3Eyebrow": "위생 인증",
      "section3Title": "안전한 재료 구성",
      "bento1Title": "BPA 프리",
      "bento1Desc": "독성 화합물이 전혀 없습니다.",
      "bento2Title": "중금속 불검출",
      "bento2Desc": "납 등의 중금속 용출이 없습니다.",
      "bento3Title": "강력한 차단성",
      "bento3Desc": "외부 오염물의 침투를 100% 차단합니다.",
      "timelineEyebrow": "프로젝트 여정",
      "timelineLead": "식수 시스템 설치의 전체 프로세스",
      "timeline1Year": "01",
      "timeline1Title": "설계 및 플래닝",
      "timeline1Desc": "시스템 수리학적 설계 및 파이프 크기 산정.",
      "timeline2Year": "02",
      "timeline2Title": "자재 공급",
      "timeline2Desc": "엄격한 품질 관리 하에 배송.",
      "timeline3Year": "03",
      "timeline3Title": "신속한 용접",
      "timeline3Desc": "완벽한 열 융착으로 누수 제로 달성.",
      "timeline4Year": "04",
      "timeline4Title": "시운전",
      "timeline4Desc": "수압 테스트 및 시스템 안정화.",
      "timeline5Year": "05",
      "timeline5Title": "장기 유지보수",
      "timeline5Desc": "수십 년간 유지 관리가 불필요한 내구성.",
      "stat1Unit": "%",
      "stat2Unit": "ppm",
      "stat4Unit": "등급",
      "ctaTitle": "위생 배관 프로젝트 문의",
      "ctaDesc": "당사의 전문가 팀이 귀하의 식수 인프라 설계를 도와드립니다.",
      "ctaBtn": "전문가 상담"
    }
  },
  "seoArticle": {
    "transitionFittings": {
      "seoTitle": "금속에서 플라스틱으로: 안전한 배관 전환",
      "seoText": "K-Aqua 전환 피팅은 구리나 강철과 같은 금속 파이프에서 PP-R 시스템으로 누수 없이 안전하게 연결하는 핵심 부품입니다.",
      "advTitle": "전환 피팅의 장점",
      "advList": [
        "100% 누수 방지 황동 인서트",
        "부식에 강한 폴리머 코팅",
        "간편하고 빠른 열 융착 용접"
      ],
      "guideText": "다양한 크기와 나사산 표준(NPT, BSP 등)에 맞는 피팅을 선택하여 시스템의 무결성을 유지하십시오."
    },
    "valves": {
      "guideText": "스톱콕 밸브, 체크 밸브 등 다양한 K-Aqua 폴리머 밸브 라인업을 통해 흐름을 정밀하게 제어하십시오."
    },
    "fittings": {
      "seoTitle": "PP-R 피팅: 시스템의 척추",
      "seoText": "파이프 시스템의 안정성은 피팅의 품질에 달려 있습니다. K-Aqua의 PP-R 피팅은 완벽한 호환성을 제공합니다.",
      "guideText": "정확한 융착 온도와 시간을 준수하여 파이프와 피팅이 하나로 결합되도록 하십시오."
    },
    "weldInSaddles": {
      "seoTitle": "비용 효율적인 분기점 생성: 용접 안장",
      "seoText": "전체 라인을 자를 필요 없이 주 배관에서 가지관을 생성하는 가장 혁신적인 솔루션입니다.",
      "guideText": "정확한 타공 및 가열 도구를 사용하여 주 배관에 완벽하게 밀착되도록 융착하십시오."
    },
    "tools": {
      "title": "용접 도구 (Tools)",
      "content": "K-Aqua PP-R 시스템 전용 가열기, 절단기 및 전기 융착 기계입니다.",
      "seoTitle": "전문가를 위한 PP-R 용접 도구",
      "seoText": "완벽한 설치를 위해 정밀하게 보정된 고품질 용접 및 절단 도구 라인업.",
      "guideText": "정기적인 도구 점검 및 온도 캘리브레이션을 통해 최상의 용접 품질을 유지하십시오."
    },
    "accessories": {
      "title": "액세서리 (Accessories)",
      "content": "파이프 클램프, 고정 브래킷 및 시스템 마감용 구성 요소입니다.",
      "seoTitle": "안정적인 고정을 위한 액세서리",
      "seoText": "진동과 열 팽창을 효과적으로 제어하는 K-Aqua 파이프 지지 시스템.",
      "guideText": "파이프의 크기와 유체의 온도에 따라 적절한 간격으로 지지대를 설치하십시오."
    }
  },
  "kontaktBlocks": {
    "home": {
      "kicker": "본사 연락처",
      "head": "전문가와 직접 통화하십시오.",
      "short": "신속한 응대",
      "text": "간단한 주제를 선택하시면 해당 부서의 전문가가 직접 연락드립니다.",
      "interest": "상담 요청",
      "done": "메시지가 성공적으로 전송되었습니다."
    },
    "unternehmen": {
      "kicker": "기업 정보",
      "head": "글로벌 사업부 문의",
      "short": "기업 파트너십",
      "text": "당사의 비즈니스 방향이나 기업에 대한 구체적인 문의를 남겨주세요.",
      "interest": "제휴",
      "done": "담당자가 확인 후 연락드리겠습니다."
    },
    "produkte_fittings": {
      "kicker": "피팅 기술",
      "head": "피팅 사양 문의",
      "short": "연결 부품",
      "text": "특정 치수나 어플리케이션에 맞는 피팅 정보가 필요하신가요?",
      "interest": "피팅 상담",
      "done": "기술팀에서 답변을 준비 중입니다."
    },
    "produkte_rohre": {
      "kicker": "파이프 기술",
      "head": "SDR 및 파이프 문의",
      "short": "파이프 사양",
      "text": "압력 등급, 소재 특성에 대한 세부 데이터시트를 요청하십시오.",
      "interest": "파이프 상담",
      "done": "자료와 함께 곧 연락드리겠습니다."
    },
    "produkte_armaturen": {
      "kicker": "밸브 및 흐름 제어",
      "head": "밸브 사양 문의",
      "short": "밸브 부품",
      "text": "다양한 폴리머 밸브의 작동 압력 및 호환성에 대해 물어보세요.",
      "interest": "밸브 상담",
      "done": "밸브 담당자가 연락드릴 예정입니다."
    },
    "produkte_werkzeuge": {
      "kicker": "용접 기계",
      "head": "공구 및 장비 문의",
      "short": "설치 도구",
      "text": "최신 용접기 및 절단 도구의 구매나 사용법을 안내해 드립니다.",
      "interest": "장비 상담",
      "done": "장비 지원팀에서 도움을 드릴 것입니다."
    },
    "produkte_uebergaenge": {
      "kicker": "전환 기술",
      "head": "스레드 및 플랜지 전환",
      "short": "전환 피팅",
      "text": "금속 배관과 플라스틱 배관의 매끄러운 전환 솔루션.",
      "interest": "전환 상담",
      "done": "관련 솔루션을 곧 안내해 드립니다."
    },
    "produkte_zubehoer": {
      "kicker": "부속품",
      "head": "액세서리 및 지지대",
      "short": "클램프 등",
      "text": "설치에 필요한 추가 부속품 목록을 요청하십시오.",
      "interest": "부속품 상담",
      "done": "목록과 함께 안내드리겠습니다."
    },
    "katalog": {
      "title": "전체 카탈로그",
      "desc": "K-Aqua의 전체 제품 및 기술 사양이 포함된 종합 카탈로그.",
      "kicker": "카탈로그 다운로드",
      "head": "디지털 카탈로그 요청",
      "short": "제품 목록",
      "text": "최신 제품이 업데이트된 전체 카탈로그를 PDF로 받아보세요.",
      "interest": "카탈로그",
      "done": "이메일로 카탈로그를 발송해 드립니다."
    },
    "finder": {
      "kicker": "제품 찾기",
      "head": "원하는 제품을 찾지 못하셨나요?",
      "short": "검색 지원",
      "text": "품목 번호를 남겨주시거나 찾고 계신 제품의 특징을 설명해 주세요.",
      "interest": "제품 검색",
      "done": "해당 제품을 찾아 곧 연락드리겠습니다."
    },
    "produkte": {
      "title": "일반 제품 문의",
      "desc": "위 목록에 없는 제품에 대한 문의.",
      "kicker": "제품 지원",
      "head": "모든 제품에 대한 포괄적 지원.",
      "short": "일반 문의",
      "text": "어떤 제품이 프로젝트에 가장 적합한지 추천해 드립니다.",
      "interest": "일반 상담",
      "done": "영업팀에서 최적의 제품을 제안해 드립니다."
    },
    "academy": {
      "title": "아카데미 및 교육",
      "desc": "인증 과정 및 현장 교육 스케줄 문의.",
      "kicker": "K-Aqua 아카데미",
      "head": "팀을 위한 맞춤형 교육 예약",
      "short": "교육 지원",
      "text": "교육 과정, 날짜, 현장 방문 교육에 대한 세부 사항을 논의하십시오.",
      "interest": "아카데미",
      "done": "아카데미 코디네이터가 연락드릴 것입니다."
    },
    "referenzen": {
      "kicker": "레퍼런스 프로젝트",
      "head": "유사 프로젝트의 성공 사례",
      "short": "사례 연구",
      "text": "귀하의 프로젝트와 유사한 환경에 적용된 레퍼런스를 제공합니다.",
      "interest": "사례 요청",
      "done": "관련 레퍼런스 자료를 보내드리겠습니다."
    },
    "support": {
      "kicker": "기술 백업",
      "head": "설계 및 현장 기술 지원",
      "short": "엔지니어링",
      "text": "설치 중 발생한 문제나 복잡한 설계에 대한 기술 자문.",
      "interest": "기술 지원",
      "done": "전문 엔지니어가 귀하의 문제를 해결해 드립니다."
    },
    "ausschreibungstexte": {
      "kicker": "입찰 내역서",
      "head": "공식 사양서 작성 지원",
      "short": "문서 지원",
      "text": "프로젝트 입찰에 필요한 공식 문서 및 사양 텍스트를 제공합니다.",
      "interest": "입찰 문서",
      "done": "요청하신 문서를 준비 중입니다."
    },
    "service": {
      "kicker": "고객 서비스",
      "head": "물류, 배송 및 기타 서비스",
      "short": "일반 서비스",
      "text": "제품의 배송 일정이나 A/S에 대한 궁금한 점을 남겨주세요.",
      "interest": "고객 서비스",
      "done": "서비스 팀이 답변을 드릴 예정입니다."
    },
    "maerkte_trinkwasser": {
      "title": "식수 시장",
      "desc": "위생과 안전을 요구하는 식수 배관 시스템 논의.",
      "kicker": "식수 프로젝트",
      "head": "DVGW 인증 식수 배관 솔루션",
      "short": "위생 배관",
      "text": "병원, 호텔 등 엄격한 수질이 요구되는 곳의 솔루션을 상담하세요.",
      "interest": "식수 시스템",
      "done": "식수 전문가가 곧 상담을 시작합니다."
    },
    "maerkte_klima": {
      "kicker": "공조 시스템",
      "head": "냉방 및 난방 시스템 최적화",
      "short": "공조 배관",
      "text": "높은 에너지 효율을 자랑하는 시스템의 설계 및 적용 사례 안내.",
      "interest": "공조 시스템",
      "done": "공조 시스템 엔지니어가 연락드릴 것입니다."
    },
    "maerkte_industrie": {
      "title": "산업 시설",
      "desc": "화학물질 및 고압에 강한 산업용 솔루션.",
      "kicker": "산업 프로젝트",
      "head": "극한의 조건을 견디는 배관",
      "short": "산업용",
      "text": "특수 화학물질이나 고온/고압 환경에서의 솔루션을 설계해 드립니다.",
      "interest": "산업 솔루션",
      "done": "산업용 시스템 전문가가 상담을 도와드립니다."
    },
    "maerkte_schiffbau": {
      "title": "선박 및 조선",
      "desc": "내식성 및 경량화가 필수적인 해양 프로젝트.",
      "kicker": "해양 및 선박",
      "head": "해양 인증 획득 시스템",
      "short": "선박용",
      "text": "선박 내 협소한 공간과 해수 부식에 대응하는 시스템 상담.",
      "interest": "해양 솔루션",
      "done": "조선 분야 담당자가 직접 안내해 드립니다."
    },
    "maerkte_landwirtschaft": {
      "title": "농업 및 온실",
      "desc": "농경지 관개 및 온실 온도 제어 솔루션.",
      "kicker": "농업 시설",
      "head": "효율적인 관수 시스템",
      "short": "농업용",
      "text": "자외선 저항성 및 긴 수명을 자랑하는 농업용 배관.",
      "interest": "농업 솔루션",
      "done": "농업 전문가가 관련 정보를 제공해 드립니다."
    },
    "maerkte": {
      "title": "기타 시장",
      "desc": "기타 특수 응용 분야 논의.",
      "kicker": "지역 시장",
      "head": "해당 지역의 전문가와 상담하십시오.",
      "short": "물류 및 승인",
      "text": "수출 목적지를 알려주시면 현지 규범 및 배송 일정을 안내해 드립니다.",
      "interest": "상담",
      "done": "해당 지역의 수출 매니저가 연락드릴 예정입니다."
    },
    "loesungen_hochhaus": {
      "title": "고층 건물",
      "desc": "초고층 빌딩의 압력 안정화 솔루션.",
      "kicker": "고층 건축",
      "head": "수직 배관의 수압 제어",
      "short": "압력 손실",
      "text": "건물의 층수와 높이를 알려주시면 감압 밸브의 위치를 제안합니다.",
      "interest": "고층 솔루션",
      "done": "수리학 전문가가 곧 연락드리겠습니다."
    },
    "loesungen_krankenhaus": {
      "title": "병원 시스템",
      "desc": "무균 및 완벽한 수질 관리를 위한 솔루션.",
      "kicker": "병원 및 의료",
      "head": "레지오넬라균 예방",
      "short": "병원 위생",
      "text": "면역력이 약한 환자를 보호하기 위한 열 소독 및 데드존 방지 솔루션.",
      "interest": "위생 네트워크",
      "done": "위생 전문가가 즉시 상담해 드립니다."
    },
    "loesungen_hotel": {
      "title": "호텔 리조트",
      "desc": "소음 방지 및 안정적인 온수 공급.",
      "kicker": "호텔 건설",
      "head": "완벽한 방음 설계",
      "short": "방음 배관",
      "text": "투숙객의 편안한 휴식을 위해 유체 소음을 최소화하는 시스템 구성.",
      "interest": "방음 솔루션",
      "done": "소음 방지 전문가가 연락드릴 것입니다."
    },
    "loesungen": {
      "title": "기타 특수 솔루션",
      "desc": "다양한 맞춤형 솔루션.",
      "kicker": "특수 솔루션",
      "head": "복잡한 건설을 위한 맞춤형 시스템",
      "short": "특수 프로젝트",
      "text": "표준 시스템으로 부족하다면, 당사의 엔지니어링 부서에서 특수 부품을 설계합니다.",
      "interest": "특수 솔루션",
      "done": "엔지니어링 팀에서 귀하의 요청을 검토 중입니다."
    },
    "co2_rechner": {
      "title": "CO2 절감기",
      "desc": "프로젝트의 탄소 발자국 평가.",
      "kicker": "탄소 절감",
      "head": "프로젝트의 지속 가능성 검증",
      "short": "CO2 계산서",
      "text": "전체 부품 목록을 보내주시면, 금속 배관 대비 탄소 절감 인증서를 발급해 드립니다.",
      "interest": "친환경 상담",
      "done": "지속 가능성 담당자가 인증서 준비를 시작합니다."
    },
    "trust_center": {
      "title": "인증 센터",
      "desc": "모든 품질 및 안전 인증서 모음.",
      "kicker": "인증서 요청",
      "head": "건축 승인에 필요한 인증서",
      "short": "승인 서류",
      "text": "현장 검사관이 요구하는 특정 규격(DVGW 등)을 말씀해 주시면 PDF로 전송해 드립니다.",
      "interest": "문서 요청",
      "done": "적합한 인증서를 찾아 보내드리겠습니다."
    },
    "projektanfrage": {
      "title": "프로젝트 문의",
      "desc": "새로운 프로젝트 시작을 위한 첫 걸음.",
      "kicker": "프로젝트 시작",
      "head": "기본 정보만으로 예산 견적 확인",
      "short": "빠른 예산 추정",
      "text": "대략적인 면적과 용도를 알려주시면 첫 예산안을 신속하게 제시합니다.",
      "interest": "견적 요청",
      "done": "프로젝트 팀에서 예산안을 논의 중입니다."
    },
    "kontakt": {
      "title": "일반 연락처",
      "desc": "빠른 소통을 위한 창구.",
      "kicker": "핫라인",
      "head": "K-Aqua 본사로의 가장 빠른 길",
      "short": "직접 통화",
      "text": "전화번호와 주제를 남기시면 대기 없이 전문가가 바로 연락을 드립니다.",
      "interest": "빠른 상담",
      "done": "전문 상담원이 지금 연락을 드립니다."
    },
    "news": {
      "title": "언론 및 뉴스",
      "desc": "최신 언론 보도 및 뉴스 센터.",
      "kicker": "미디어 지원",
      "head": "제품 발표 및 기업 뉴스",
      "short": "홍보 담당",
      "text": "고해상도 이미지, 인터뷰 또는 기술적 배경 정보가 필요하시면 연락 주십시오.",
      "interest": "언론 요청",
      "done": "홍보팀에서 곧 회신해 드릴 것입니다."
    },
    "karriere": {
      "title": "채용 정보",
      "desc": "K-Aqua의 새로운 인재를 위한 페이지.",
      "kicker": "채용 문의",
      "head": "입사 전 궁금한 점 해결",
      "short": "HR 문의",
      "text": "본인의 프로필이 당사와 맞는지, 혹은 직무에 대해 궁금한 점이 있다면 언제든 문의하세요.",
      "interest": "인사 문의",
      "done": "인사팀에서 짧은 소개를 위해 연락을 드릴 것입니다."
    },
    "partnerschaft": {
      "title": "파트너 제휴",
      "desc": "성공을 함께할 새로운 유통 파트너.",
      "kicker": "유통 파트너",
      "head": "독일산 프리미엄 배관으로 라인업 확장",
      "short": "딜러 조건",
      "text": "안정적인 공급사를 찾는 도매상이라면, 당사와 독점 모델 및 딜러 조건을 논의하십시오.",
      "interest": "파트너 상담",
      "done": "영업 책임자가 파트너십 관련하여 연락드리겠습니다."
    },
    "impressum": {
      "title": "법적 고지",
      "desc": "K-Aqua 기업 정보.",
      "kicker": "법률 정보",
      "head": "법적 의무 사항에 대한 문의",
      "short": "법무팀",
      "text": "회사 정책 및 법적인 사항에 대해 확인이 필요하시면 문의해 주세요.",
      "interest": "법률 상담",
      "done": "관련 문의 사항에 대해 곧 답변 드리겠습니다."
    },
    "datenschutz": {
      "title": "개인정보 보호",
      "desc": "데이터 처리 방침 안내.",
      "kicker": "데이터 보안",
      "head": "개인정보 보호 책임자와의 상담",
      "short": "정보 요청",
      "text": "당사의 데이터 수집 및 처리 과정에 대한 상세 정보를 원하시면 연락 주십시오.",
      "interest": "데이터 보안",
      "done": "개인정보 보호 책임자가 답변을 드릴 것입니다."
    },
    "fallback": {
      "title": "기타",
      "desc": "정의되지 않은 기타 모든 문의.",
      "kicker": "일반 문의",
      "head": "엔지니어와 직접 상의하세요",
      "short": "엔지니어 연결",
      "text": "연락처와 원하시는 주제를 남겨주시면, 나머지는 저희가 직접 전화로 해결해 드립니다.",
      "interest": "상담",
      "done": "담당 엔지니어가 근무일 기준 1일 이내에 연락드릴 것입니다."
    }
  }
}
with open("missing.json", "w", encoding="utf-8") as f:
    json.dump(missing, f, indent=2, ensure_ascii=False)

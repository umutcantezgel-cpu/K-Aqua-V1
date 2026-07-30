import json

products = {
  "narrative": {
    "sizeRange": "이 부품은 소형 {minSize} mm에서 대형 {maxSize} mm까지 광범위한 치수로 제공되어 다양한 설치 시나리오에서 최대한의 범용성을 보장합니다.",
    "sizeSpecific": "이 부품은 {minSize} mm의 특정 치수를 위해 정밀하게 설계되어 특수 배관 구조를 위한 타겟 성능을 제공합니다.",
    "weights": "소재 효율성은 전체 제품군에 걸쳐 최적화되었으며, 선택한 치수에 따라 단위 중량은 {minWeight} kg에서 {maxWeight} kg까지 다양합니다.",
    "packaging": "물류는 안전한 전 세계 운송 및 현장에서의 효율적인 취급을 위해 설계된 표준 포장 단위를 통해 최적화됩니다.",
    "rowCount": "당사의 기술 포트폴리오는 현대 유체 운송 시스템의 수력 및 기계적 요구 사항을 충족하도록 정밀하게 조정된 {count}개의 특수 치수 변형으로 이 구성을 제공합니다.",
    "intro": "제품 {title}은 K-Aqua 고성능 유체 관리 솔루션의 핵심입니다. 부품 번호 {codes}로 공식 등록된 각 변형은 배송 전 독일 생산 시설에서 엄격한 품질 보증 프로토콜을 거칩니다.",
    "outro": "첨단 폴리머 가공 기술을 통해 {title}의 기하학적 정밀도는 최적의 유량 특성을 보장하고, 압력 손실을 최소화하며, 전체 서비스 수명 동안 스케일링이나 부식의 위험을 완전히 제거합니다. 이러한 소재 과학에 대한 타협 없는 헌신은 극심한 온도 및 압력 변동 하에서도 각 연결부가 절대적인 무결성을 유지하도록 보장합니다. 고층 주거 건물, 중요 의료 시설 또는 까다로운 산업 처리 공장에 적용되든, 이 제품은 엔지니어와 설치 기사가 맹목적으로 신뢰할 수 있는 유지 보수가 필요 없는 안정성을 제공합니다."
  },
  "uniqueProductContext": "제품 {title}은 K-Aqua {category} 제품군의 필수 구성 요소입니다. 최대의 내구성과 완벽한 통합을 위해 개발되었으며 최신 배관 및 위생 어플리케이션에 대한 최고의 국제 표준을 충족합니다. 품목 번호 {codes}를 사용하여 이 특정 제품을 식별하고 주문할 수 있습니다. 추가 문서나 지원이 필요한 경우 기술 팀에 문의하십시오.",
  "heroDesc": "사양, 치수 및 응용 분야를 알아보십시오. 자세한 정보는 기술 데이터시트를 다운로드하십시오.",
  "articleNumbers": "품목 번호",
  "technicalSpecs": "기술 사양",
  "eyebrow": "제품",
  "videoGuide": "K-Aqua 비디오 가이드",
  "localAvailability": "현지 가용성",
  "localDesc": "귀하의 지역에 대한 현지 대리점, 특정 승인 및 표준을 찾으십시오.",
  "allMarkets": "50개 이상의 모든 시장 보기",
  "title1": "식수용 PP-R/PPRCT 파이프",
  "titleGrad": "및 피팅.",
  "lead": "파이프에서 피팅, 용접 기술에 이르기까지 온수 및 냉수를 위한 완벽한 배관 시스템. 4개의 구성 요소, 하나의 시스템.",
  "ctaCatalog": "제품 카탈로그 (PDF)",
  "ctaVideos": "설치 비디오",
  "sysEyebrow": "시스템",
  "sysTitle": "K-Aqua PP-R 파이프 및 피팅: 4개의 구성 요소, 하나의 시스템.",
  "range": [
    {
      "t": "파이프: 단층 및 다층",
      "d": "SDR 6, 7.4, 9, 11 및 17의 단층 및 유리 섬유 강화 다층 파이프. 20mm에서 630mm 치수 제공."
    },
    {
      "t": "피팅 및 밸브",
      "d": "20mm에서 315mm의 피팅, 밸브, 스레드 연결 및 전환 부품."
    },
    {
      "t": "용접 기술 및 도구",
      "d": "소켓, 맞대기 및 전기 융착 용접용 절단 도구, 용접 장비 및 기계."
    },
    {
      "t": "온수 및 냉수",
      "d": "수십 년 동안 높은 온도 및 압력 저항을 갖춘 식수(온수 및 냉수)용으로 설계되었습니다."
    }
  ],
  "techEyebrow": "기술 데이터",
  "techTitle": "치수 및 압력 등급",
  "techLead": "파이프 유형에 따라 20mm ~ 630mm, 피팅은 최대 315mm 제공.",
  "ctaFeatures": "제품 특징 (PDF)",
  "tableHead": [
    "유형",
    "파이프 클래스",
    "치수 (mm)",
    "기능"
  ],
  "tableRows": [
    ["K-Aqua Green 단층", "SDR 6 / 7.4 / 9 / 11", "20 – 110", "냉수 및 온수 20°C / 20 bar"],
    ["K-Aqua Green 다층 (파이버)", "SDR 7.4 / 9", "20 – 125", "선형 팽창 감소 (최대 75%)"],
    ["K-Aqua Blue (에어컨/냉방)", "SDR 11 / 17", "20 – 630", "우수한 단열, 결로 없음"],
    ["K-Aqua 보라색 (재생수)", "SDR 11", "20 – 125", "빗물 및 중수도 식별"]
  ],
  "seoArticle": {
    "title1": "현대적인 건물",
    "title2": "인프라용 PP-R 시스템",
    "p1": "K-Aqua PP-R(Polypropylene Random Copolymer) 파이프 시스템은 식수부터 복잡한 냉각 시스템에 이르기까지 현대 기술 건물 장비(TGA)의 최고 요구 사항을 충족합니다. 금속 파이프 시스템과 달리 PP-R은 부식과 스케일링이 없어 50년 이상의 지속적으로 높은 유량과 일정한 수질을 보장합니다.",
    "p2": "유리 섬유 보강재가 결합된 PPRCT 파이프의 통합(다층 파이프)은 선형 팽창률을 최대 75%까지 감소시켜 강관과 동등하게 만들며 더 높은 압력 등급에서도 파이프 벽을 얇게 유지할 수 있습니다.",
    "listTitle": "PP-R 배관망의 장점",
    "list1": "열 융착을 통한 100% 누수 방지 (소켓, 맞대기, 전기 융착)",
    "list2": "최소한의 압력 손실: 펌프 에너지 소비 감소로 인한 효율성 향상",
    "list3": "내화학성: 광범위한 산 및 알칼리에 대한 저항력",
    "list4": "소음 방지: 흐름 소음을 줄여 병원 및 호텔에 이상적"
  },
  "labels": {
    "specs": "사양",
    "codes": "품목 번호",
    "docs": "다운로드",
    "contact": "상담",
    "back": "모든 제품",
    "downloadAll": "전체 데이터시트 다운로드",
    "requestCAD": "CAD / BIM 요청",
    "similar": "관련 제품",
    "certifications": "인증",
    "application": "적용 범위",
    "dimLabel": "치수",
    "weightLabel": "단위 중량",
    "packLabel": "포장 단위"
  },
  "specAndDim": "사양 및 치수",
  "certsAndNorms": "인증 및 규격",
  "approved": "글로벌 승인",
  "monitoring": "지속적인 모니터링",
  "certified": "국제 인증",
  "quickLinks": "빠른 링크",
  "calcCo2": "CO2 계산기",
  "backToFinder": "제품 찾기로 돌아가기",
  "enterpriseCore": "엔터프라이즈 코어",
  "highPerformance": "고성능 소재",
  "highPerformanceDesc": "극한의 온도를 위해 엔지니어링된 PPRCT.",
  "sysPressure": "최대 압력 보호",
  "tempMax": "최대 연속 작동 온도",
  "material": "주요 소재",
  "norm": "국제 규격",
  "certification": "인증 정보",
  "lifespan": "예상 수명",
  "fiberTech": "파이버 기술",
  "fiberTechDesc": "강도 증가, 선형 팽창 감소.",
  "compliance": "모든 국제 식수 위생 규정을 준수합니다.",
  "dimensions": "모든 규모의 프로젝트를 위한 치수",
  "globalNetwork": "글로벌 배포",
  "globalNetworkDesc": "전 세계 50개 이상의 국가에 적용되었습니다.",
  "whyChoose": "왜 K-Aqua를 선택해야 할까요?",
  "tools": {
    "title": "도구 및 장비",
    "desc": "정밀한 용접과 조립을 위한 전문 장비."
  },
  "valves": {
    "title": "밸브 및 피팅",
    "desc": "완벽한 시스템 제어를 위한 안전하고 내구성 있는 밸브."
  },
  "category": {
    "pipes": "PP-R & PPRCT 파이프",
    "fittings": "PP-R 피팅",
    "transitionFittings": "전환 피팅",
    "valves": "밸브 및 장비",
    "tools": "용접 도구"
  },
  "fittings": {
    "title": "PP-R 피팅",
    "desc": "최적의 유동 기하학을 갖춘 100% 누수 방지 피팅."
  },
  "pipes": {
    "title": "파이프",
    "desc": "식수 및 냉각 기술을 위한 고성능 PP-R 파이프."
  },
  "transitionFittings": {
    "title": "전환 피팅",
    "desc": "금속 배관 및 기타 시스템과의 안전한 전환."
  },
  "hero": {
    "eyebrow": "제품 포트폴리오",
    "title1": "완벽한 유체",
    "title2": "인프라.",
    "cta1": "카탈로그 탐색",
    "cta2": "기술 지원"
  },
  "sticky": {
    "eyebrow": "전문가 상담",
    "lead": "귀하의 요구사항에 맞는 올바른 구성품.",
    "items": [
      {
        "t": "프로젝트 문의",
        "d": "모든 치수에 걸친 정확한 사양 지원."
      },
      {
        "t": "현지 대리점",
        "d": "빠른 공급을 위한 글로벌 네트워크 파트너 찾기."
      }
    ]
  },
  "bento": {
    "eyebrow": "시스템 개요",
    "lead": "모든 용도를 위한 배관망.",
    "items": [
      {
        "title": "포괄적 구성",
        "desc": "단순한 파이프가 아닌 완전한 솔루션입니다."
      },
      {
        "title": "고품질 소재",
        "desc": "최고급 원자재(Borealis 등)를 사용합니다."
      },
      {
        "title": "혁신적 연결",
        "desc": "누수를 완벽 차단하는 용접 기술."
      },
      {
        "title": "유지 보수 제로",
        "desc": "설치 후 50년간 작동 보장."
      }
    ]
  },
  "timeline": {
    "title": "개발 및 제조 과정",
    "desc": "K-Aqua 제품이 생산 라인을 거쳐 귀하의 현장에 도달하기까지의 여정.",
    "items": [
      {
        "year": "01",
        "title": "원자재 입고",
        "text": "엄격히 선별된 폴리프로필렌 수지 검수."
      },
      {
        "year": "02",
        "title": "고정밀 압출",
        "text": "다층 파이버 파이프 생산 및 레이저 두께 측정."
      },
      {
        "year": "03",
        "title": "사출 성형",
        "text": "복잡한 피팅 및 밸브 부품 사출."
      },
      {
        "year": "04",
        "title": "품질 관리(QC)",
        "text": "수압 테스트 및 극한 조건 시뮬레이션."
      },
      {
        "year": "05",
        "title": "배송 및 유통",
        "text": "전 세계 프로젝트 현장으로 신속하게 배송."
      }
    ]
  },
  "sysLead": "하나의 시스템 안에서 파이프부터 피팅까지 완벽히 조화롭게 설계되었습니다."
}

solutions = {
  "eyebrow": "산업별 솔루션",
  "title1": "전문적인 설계를 위한",
  "titleGrad": "완벽한 파이프 솔루션.",
  "title2": "신뢰할 수 있는 선택.",
  "lead": "건축물 유형과 용도에 따라 파이프 시스템에 요구되는 조건은 다양합니다. K-Aqua의 통합 솔루션은 각 산업 분야에 최적화된 성능과 인증을 제공하여 어떤 규모의 프로젝트도 성공적으로 지원합니다.",
  "benefits": {
    "eyebrow": "맞춤형 이점",
    "title": "산업별 요구에 맞춘 정밀성.",
    "items": [
      {
        "title": "위생 보장",
        "desc": "병원 및 의료 시설을 위한 박테리아 증식 방지 시스템."
      },
      {
        "title": "내구력 강화",
        "desc": "고층 빌딩과 산업 단지를 위한 높은 압력 저항 설계."
      },
      {
        "title": "결로 및 부식 방지",
        "desc": "호텔 및 데이터 센터 공조를 위한 탁월한 단열 특성."
      }
    ]
  },
  "nextEyebrow": "솔루션 찾기",
  "nextTitle": "귀하의 프로젝트를 선택하십시오.",
  "nextLead": "건물 유형에 특화된 자세한 기술 데이터와 성공 사례를 확인하세요.",
  "nextCta": "모든 사례 보기",
  "krankenhaus": {
    "title": "병원 및 의료 시설",
    "desc": "레지오넬라균 방지 및 무균 상태 유지가 최우선입니다.",
    "link": "자세히 보기"
  },
  "hotels": {
    "title": "호텔 및 상업 시설",
    "desc": "무소음 작동 및 유지 보수 비용 절감이 핵심입니다.",
    "link": "자세히 보기"
  },
  "vorfertigung": {
    "title": "공장 사전 제작(Vorfertigung)",
    "desc": "현장 공기 단축 및 정밀한 대형 모듈 사전 조립.",
    "link": "자세히 보기"
  },
  "hochhaus": {
    "title": "고층 빌딩 (Hochhaus)",
    "desc": "강력한 수압을 견디는 고성능 배관 인프라.",
    "link": "자세히 보기"
  },
  "index": {
    "title": "응용 분야 한눈에 보기",
    "desc": "K-Aqua의 전체 솔루션 인덱스를 확인하세요."
  },
  "rechenzentrum": {
    "title": "데이터 센터 (Rechenzentrum)",
    "desc": "열 발생을 방지하고 서버 냉각을 돕는 결로 없는 냉수 배관.",
    "link": "자세히 보기"
  }
}

with open("ko_products_solutions.json", "w", encoding="utf-8") as f:
    json.dump({"products": products, "solutions": solutions}, f, indent=2, ensure_ascii=False)

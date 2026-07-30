import json

academy = {
  "eyebrow": "아카데미",
  "title1": "PP-R/PPRCT 기초부터",
  "titleGrad": "숙련된 기술까지.",
  "lead": "4가지 PP-R 용접 기술 비디오와 마스터 퀴즈. K-Aqua 아카데미에서 제공하는 현장 최적화된 고해상도 교육 자료.",
  "quizEyebrow": "용접 마스터 퀴즈",
  "quizTitle": "5개의 질문. 1개의 배지.",
  "intro": "PP-R/PPRCT에 대한 지식을 테스트하십시오. 만점 시 '용접 마스터' 타이틀 부여.",
  "start": "퀴즈 시작하기",
  "qLabel": "질문",
  "quiz": [
    {
      "q": "대구경(예: d630)의 표준 용접 방법은 무엇입니까?",
      "o": [
        "수동 소켓 퓨전",
        "버트 퓨전 (Butt Fusion)",
        "접착"
      ]
    },
    {
      "q": "배관 시스템에서 SDR은 무엇을 의미합니까?",
      "o": [
        "표준 치수 비율 (Standard Dimension Ratio, d/s)",
        "정적 밀도 등급 (Static Density Rating)",
        "안전 압력 예비 (Safety Pressure Reserve)"
      ]
    },
    {
      "q": "PPRCT와 기존 PP-R의 차이점은 무엇입니까?",
      "o": [
        "더 낮은 가격",
        "결정 구조 변형 → 더 높은 온도 및 압력 저항",
        "금속 보강"
      ]
    },
    {
      "q": "폴리프로필렌의 재활용 코드는 무엇입니까?",
      "o": [
        "코드 3",
        "코드 5",
        "코드 7"
      ]
    },
    {
      "q": "전기 융착 (Electrofusion) 중 열은 어디서 발생합니까?",
      "o": [
        "가열 요소 거울",
        "피팅에 내장된 열선",
        "뜨거운 공기"
      ]
    }
  ],
  "resPerfect": "완벽합니다! '용접 마스터' 타이틀을 획득했습니다!",
  "resGood": "훌륭합니다! '용접 기술자' 자격을 확보했습니다. 마스터를 위해서는 5문제를 모두 맞혀야 합니다.",
  "resLow": "위의 비디오가 도움이 될 것입니다. 마스터에 다시 도전하세요.",
  "retry": "다시 시도하기",
  "titlePerfect": "용접 마스터",
  "titleGood": "용접 기술자",
  "videos": {
    "title": "비디오 가이드",
    "metaDesc": "K-Aqua PP-R 파이프의 4가지 주요 용접 방법에 대한 자세한 비디오 지침입니다.",
    "seoText": {
      "t1": "PP-R 용접 튜토리얼",
      "p1": "K-Aqua 아카데미는 PP-R 배관 시스템을 위한 전문가 수준의 비디오 튜토리얼을 제공합니다.",
      "p2": "소켓 퓨전부터 전기 융착까지 모든 과정을 다룹니다."
    },
    "hero": {
      "badge": "아카데미",
      "title": "안전한 연결을 위한 지침",
      "desc": "K-Aqua 시스템의 수명은 파이프에만 있지 않습니다. 용접에 있습니다."
    },
    "intro": {
      "title1": "용접 기술의",
      "title2": "세부 사항",
      "p1": "용접 과정에서의 작은 실수는 20년 후 누수로 이어질 수 있습니다.",
      "p2": "이러한 이유로 당사는 4가지 핵심 용접 공정을 고해상도로 문서화했습니다.",
      "p3": "각 비디오는 현장에서 바로 적용할 수 있는 명확한 단계를 제공합니다."
    },
    "methods": {
      "title": "공정 목록",
      "socket": {
        "title": "소켓 퓨전 (Socket Fusion)",
        "desc": "20mm - 125mm의 기본 용접 방식. 빠르고 영구적인 연결.",
        "duration": "03:45"
      },
      "butt": {
        "title": "버트 퓨전 (Butt Fusion)",
        "desc": "160mm - 630mm 대구경을 위한 맞대기 용접.",
        "duration": "05:12"
      },
      "electro": {
        "title": "전기 융착 (Electrofusion)",
        "desc": "협소한 공간이나 보수 작업에 적합한 전기 융착.",
        "duration": "04:20"
      },
      "saddle": {
        "title": "새들 퓨전 (Saddle Fusion)",
        "desc": "파이프를 절단하지 않고 분기점을 만드는 방법.",
        "duration": "03:15"
      }
    }
  },
  "zertifizierung": {
    "title": "품질 인증",
    "metaDesc": "K-Aqua 파이프 및 피팅 시스템의 국제 인증 및 테스트 절차에 대해 알아보세요.",
    "seoText": {
      "t1": "품질 및 안전 인증",
      "p1": "K-Aqua는 DVGW, SKZ, KIWA 등 세계 최고 수준의 인증 기관으로부터 철저한 검증을 받았습니다.",
      "p2": "우리의 모든 파이프는 엄격한 품질 기준을 통과했습니다."
    },
    "hero": {
      "badge": "품질",
      "title": "타협 없는 안전",
      "desc": "식수 및 난방 시스템의 무결성을 증명하는 국제 인증서."
    },
    "certifications": {
      "title": "주요 인증",
      "items": [
        {
          "title": "DVGW",
          "p1": "독일의 가장 엄격한 식수 및 가스 인증입니다.",
          "p2": "최고의 위생 및 시스템 무결성을 보장합니다."
        },
        {
          "title": "SKZ",
          "p1": "플라스틱 소재의 내구성과 압력 저항을 검증합니다.",
          "p2": "정기적인 외부 감사를 통해 품질을 유지합니다."
        },
        {
          "title": "KIWA",
          "p1": "유럽 전역에서 인정받는 품질 및 안전 인증입니다.",
          "p2": "국제적인 기준에 부합하는 제품임을 보증합니다."
        }
      ]
    },
    "lab": {
      "title": "자체 실험실",
      "items": [
        {
          "title": "수압 테스트",
          "desc": "한계 압력 이상의 수압 테스트를 통해 파이프의 내구성을 확인합니다."
        },
        {
          "title": "열 충격 테스트",
          "desc": "극한의 온도 변화에도 파이프가 손상되지 않음을 검증합니다."
        },
        {
          "title": "현미경 분석",
          "desc": "소재의 미세 구조를 분석하여 결함이 없는지 확인합니다."
        }
      ]
    },
    "timeline": {
      "title": "품질 검사 프로세스",
      "items": [
        {
          "title": "원자재 검수",
          "desc": "입고된 원자재의 순도 및 품질을 테스트합니다."
        },
        {
          "title": "생산 중 모니터링",
          "desc": "두께 및 외경을 실시간 레이저로 측정합니다."
        },
        {
          "title": "샘플 테스트",
          "desc": "각 배치에서 무작위 샘플을 추출하여 극한 조건에서 테스트합니다."
        },
        {
          "title": "최종 검수",
          "desc": "출하 전 모든 제품의 규격과 외관을 확인합니다."
        },
        {
          "title": "문서화",
          "desc": "모든 배치 데이터는 추적 가능성을 위해 저장됩니다."
        }
      ]
    }
  },
  "glossar": {
    "title": "용어 사전",
    "metaDesc": "PP-R 및 플라스틱 파이프 시스템과 관련된 주요 기술 용어를 설명합니다.",
    "seoText": {
      "t1": "플라스틱 배관 기술 용어",
      "p1": "SDR부터 열팽창 계수까지 전문적인 용어들의 의미를 명확히 이해하십시오.",
      "p2": "현장과 설계에서 소통의 정확성을 높여줍니다."
    },
    "hero": {
      "badge": "지식",
      "title": "업계 표준 이해하기",
      "desc": "SDR이 무엇을 의미하는지, PN 등급이 어떻게 결정되는지 알아보십시오."
    },
    "scroll": {
      "title": "핵심 개념",
      "items": [
        {
          "title": "SDR (Standard Dimension Ratio)",
          "desc": "파이프 외경(d)과 벽 두께(s)의 비율입니다."
        },
        {
          "title": "PN (Pressure Nominal)",
          "desc": "20°C 물 기준 최대 허용 작동 압력(bar)입니다."
        },
        {
          "title": "PP-R",
          "desc": "Polypropylene Random Copolymer의 약자로 열 안정성이 뛰어납니다."
        },
        {
          "title": "PPRCT",
          "desc": "결정 구조가 변형된 PP-R로, 고온에서 더 높은 내압성을 가집니다."
        }
      ]
    },
    "bento": {
      "title": "기술적 특성",
      "items": [
        {
          "title": "열팽창 (Thermal Expansion)",
          "desc": "온도 변화에 따른 파이프 길이의 변화율."
        },
        {
          "title": "다층 파이프 (Multilayer)",
          "desc": "유리 섬유가 포함되어 열팽창이 적은 구조."
        },
        {
          "title": "용접 깊이 (Welding Depth)",
          "desc": "완벽한 접합을 위해 피팅 안으로 파이프가 삽입되어야 하는 깊이."
        },
        {
          "title": "가열 시간 (Heating Time)",
          "desc": "파이프와 피팅이 용접 도구에 머무는 정확한 시간."
        },
        {
          "title": "냉각 시간 (Cooling Time)",
          "desc": "조인트가 완전히 굳을 때까지 필요한 대기 시간."
        }
      ]
    },
    "timeline": {
      "title": "설치 과정 용어",
      "items": [
        {
          "title": "절단 (Cutting)",
          "desc": "직각으로 매끄럽게 파이프를 자르는 과정."
        },
        {
          "title": "면취 (Peeling/Chamfering)",
          "desc": "다층 파이프의 외피를 벗기거나 끝을 다듬는 과정."
        },
        {
          "title": "가열 (Heating)",
          "desc": "정확히 260°C에서 부품을 녹이는 과정."
        },
        {
          "title": "결합 (Joining)",
          "desc": "두 부품을 비틀지 않고 똑바로 밀어 넣는 과정."
        }
      ]
    }
  }
}
with open("ko_academy_full.json", "w", encoding="utf-8") as f:
    json.dump({"academy": academy}, f, indent=2, ensure_ascii=False)

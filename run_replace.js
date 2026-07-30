const fs = require('fs');

const file = 'messages/ko.json';
let content = fs.readFileSync(file, 'utf8');

const target = `      "desc": "정의되지 않은 기타 모든 문의.",
      "kicker": "일반 문의",
      "head": "엔지니어와 직접 상의하세요",
      "short": "엔지니어 연결",
      "text": "연락처와 원하시는 주제를 남겨주시면, 나머지는 저희가 직접 전화로 해결해 드립니다.",
      "interest": "상담",
      "done": "담당 엔지니어가 근무일 기준 1일 이내에 연락드릴 것입니다."
    }
  }
}`;

const p1 = fs.readFileSync('part1.txt', 'utf8');
const p2 = fs.readFileSync('part2.txt', 'utf8');
const p3 = fs.readFileSync('part3.txt', 'utf8');

const replacement = `      "desc": "정의되지 않은 기타 모든 문의.",
      "kicker": "일반 문의",
      "head": "엔지니어와 직접 상의하세요",
      "short": "엔지니어 연결",
      "text": "연락처와 원하시는 주제를 남겨주시면, 나머지는 저희가 직접 전화로 해결해 드립니다.",
      "interest": "상담",
      "done": "담당 엔지니어가 근무일 기준 1일 이내에 연락드릴 것입니다."
    }
  },
  ` + p1 + `,\n  ` + p2 + `,\n  ` + p3 + `\n}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully replaced via NodeJS script!");
} else {
  console.log("Target not found!");
}

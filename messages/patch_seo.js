const fs = require('fs');
const de = JSON.parse(fs.readFileSync('de.json', 'utf8')).seoArticle;
const kaData = JSON.parse(fs.readFileSync('ka.json', 'utf8'));
const ka = kaData.seoArticle;

// translations
if(!ka.transitionFittings) ka.transitionFittings = {};
ka.transitionFittings.advList = [
  "DZR-თითბერის ჩანართები უზრუნველყოფენ თუთიის გამოყოფის მიმართ უმაღლეს მდგრადობას.",
  "დაგრეხვის საწინააღმდეგო დიზაინი უძლებს მაღალ მაბრუნებელ მომენტს.",
  "პლასტმასსა და ლითონს შორის განუყოფელი კავშირი უზრუნველყოფს გაჟონვისგან დაცულ ფუნქციონირებას."
];

if (!ka.valves) ka.valves = {};
ka.valves.guideText = "ეს სარქველები შექმნილია წნევის მინიმალური ვარდნით ზუსტი კონტროლის უზრუნველსაყოფად.";

if (!ka.fittings) ka.fittings = {};
ka.fittings.seoTitle = "PP-R ფიტინგები მილების საიმედო შეერთებისთვის | K-Aqua";
ka.fittings.seoText = "K-Aqua-ს PP-R ფიტინგების სრული ასორტიმენტი გარანტიას იძლევა თქვენი მილების სისტემების უსაფრთხო, გაჟონვისგან დაცულ შეერთებას. ჩვენი ფიტინგები განკუთვნილია სხვადასხვა გამოყენებისთვის.";
ka.fittings.guideText = "აირჩიეთ K-Aqua-ს მაღალი ხარისხის ფიტინგებიდან შეუფერხებელი ინსტალაციისთვის.";

if (!ka.weldInSaddles) ka.weldInSaddles = {};
ka.weldInSaddles.seoTitle = "შესადუღებელი უნაგირები განშტოებებისთვის | K-Aqua";
ka.weldInSaddles.seoText = "K-Aqua შესადუღებელი უნაგირები გთავაზობთ ეფექტურ გადაწყვეტას არსებული მილსადენების განშტოებებისთვის. მარტივი მონტაჟი და საიმედო შესრულება.";
ka.weldInSaddles.guideText = "დაამატეთ ახალი ხაზები არსებულ სისტემას ჩვენი მტკიცე შესადუღებელი უნაგირების გამოყენებით.";

fs.writeFileSync('ka.json', JSON.stringify(kaData, null, 2));

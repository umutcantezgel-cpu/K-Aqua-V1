const fs = require('fs');
let ka = JSON.parse(fs.readFileSync('ka.json', 'utf8'));

let p = ka.products;

// Top level
p.hero.eyebrow = "K Aqua პროდუქტები";
p.hero.title1 = "გერმანული ინჟინერია.";
p.hero.title2 = "უმაღლესი სიზუსტე.";
p.hero.desc = "აღმოაჩინეთ K-Aqua-ს პრემიუმ PP-R მილების სისტემების სრული ასორტიმენტი. შექმნილია მაქსიმალური წნევის, ტემპერატურისა და ჰიგიენური მოთხოვნებისთვის მსოფლიოს ყველაზე მომთხოვნ პროექტებში.";

// Pipes
if(p.pipes) {
  p.pipes.meta = { title: "PP-R მილები | K Aqua", desc: "მაღალი ხარისხის პოლიპროპილენის მილები სუფთა წყლისა და გათბობისთვის." };
  p.pipes.hero.eyebrow = "K Aqua მილები";
  p.pipes.hero.title = "სისტემის არტერიები.";
  p.pipes.hero.lead = "K Aqua მილები ქმნიან ყოველი ინფრასტრუქტურის საფუძველს. დამზადებულია პრემიუმ PPR-C და PPRCT მასალისგან.";
  p.pipes.sticky.eyebrow = "ტექნოლოგია";
  p.pipes.sticky.title = "მილების ევოლუცია.";
  p.pipes.sticky.lead = "ჩვენი მილები გთავაზობთ შეუდარებელ შესრულებას.";
  p.pipes.cta.title = "შეისწავლეთ ჩვენი მილები";
  p.pipes.cta.desc = "იხილეთ სრული ტექნიკური სპეციფიკაციები კატალოგში.";
  p.pipes.cta.primary = "კატალოგის ჩამოტვირთვა";
}

// Fittings
if(p.fittings) {
  p.fittings.meta = { title: "PP-R ფიტინგები | K Aqua", desc: "K Aqua ფიტინგები. გაჟონვისგან დამცავი ჰომოგენური კავშირები 50 წლიანი გარანტიით." };
  p.fittings.hero.eyebrow = "K Aqua ფიტინგები";
  p.fittings.hero.title = "სრულყოფილი კავშირი.";
  p.fittings.hero.lead = "სადაც მილები ხვდება, ჩვენი ფიტინგები უზრუნველყოფენ 100% გაჟონვისგან დაცულ, ჰომოგენურ შედუღებას.";
  p.fittings.sticky.eyebrow = "ინჟინერია";
  p.fittings.sticky.title = "დაპროექტებული უსაფრთხოებისთვის.";
  p.fittings.sticky.lead = "არანაირი O-რგოლები, არანაირი სისუსტე.";
  p.fittings.cta.title = "იხილეთ ყველა ფიტინგი";
  p.fittings.cta.desc = "ფართო ასორტიმენტი ყველა ინსტალაციისთვის.";
  p.fittings.cta.primary = "პროდუქტების ნახვა";
}

// Valves
if(p.valves) {
  p.valves.meta = { title: "ჩამკეტი სარქველები | K Aqua", desc: "კოროზიის მიმართ მდგრადი სარქველები PP-R სისტემებისთვის." };
  p.valves.hero.eyebrow = "K Aqua სარქველები";
  p.valves.hero.title = "აბსოლუტური კონტროლი.";
  p.valves.hero.lead = "აკონტროლეთ ნაკადი საიმედოდ, კოროზიისა და ბიოფილმის წარმოქმნის რისკის გარეშე.";
}

// Transition Fittings
if(p.transitionFittings) {
  p.transitionFittings.meta = { title: "გარდამავალი ფიტინგები | K Aqua", desc: "DZR თითბერის ჩანართები პლასტმასიდან ლითონზე უსაფრთხო გადასვლისთვის." };
  p.transitionFittings.hero.eyebrow = "K Aqua გარდამავალი ფიტინგები";
  p.transitionFittings.hero.title = "უსაფრთხო გადასვლა.";
  p.transitionFittings.hero.lead = "შეაერთეთ PP-R სისტემები ლითონის კომპონენტებთან გალვანური კოროზიის გარეშე, DZR თითბერის გამოყენებით.";
  p.transitionFittings.cta.title = "დაუკავშირდით ყველაფერს";
  p.transitionFittings.cta.primary = "ტექნიკური დეტალები";
}

fs.writeFileSync('ka.json', JSON.stringify(ka, null, 2));

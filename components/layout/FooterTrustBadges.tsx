import React from 'react';
import { ShieldCheck, Award, Leaf, Droplet, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "SKZ-Cert",
    subtitle: "ISO 9001 / 14001 / 50001",
  },
  {
    icon: <Droplet className="w-5 h-5" />,
    title: "DIN 8077/8078",
    subtitle: "PP-R Rohrstandards",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Nachhaltigkeit",
    subtitle: "Eco-Friendly",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "GENAU-System",
    subtitle: "Integriertes Management",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Made in Germany",
    subtitle: "Produktion in Waldsolms",
  }
];

export default function FooterTrustBadges() {
  return (
    <div className="w-full py-10 border-y border-white/10">
      <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-12">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className="group flex items-center gap-4 cursor-default"
          >
            <div className="text-white/30 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out">
              {badge.icon}
            </div>
            <div className="flex flex-col">
              <h4 className="text-white/70 group-hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-500">
                {badge.title}
              </h4>
              <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5 transition-colors duration-500 group-hover:text-white/70">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Award, Leaf, Droplet, CheckCircle } from 'lucide-react';

const icons = [
  <Award key="award" className="w-5 h-5" />,
  <Droplet key="droplet" className="w-5 h-5" />,
  <Leaf key="leaf" className="w-5 h-5" />,
  <ShieldCheck key="shield" className="w-5 h-5" />,
  <CheckCircle key="check" className="w-5 h-5" />,
];

export default function FooterTrustBadges() {
  const t = useTranslations('footer');
  const badges = t.raw('badges') as { t: string; s: string }[];

  return (
    <div className="w-full py-10 border-y border-white/10">
      <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-12">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="group flex items-center gap-4 cursor-default"
          >
            <div className="text-white/30 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out">
              {icons[index]}
            </div>
            <div className="flex flex-col">
              <p className="text-white/70 group-hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-500">
                {badge.t}
              </p>
              <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5 transition-colors duration-500 group-hover:text-white/70">
                {badge.s}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

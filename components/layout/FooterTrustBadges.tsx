import React from 'react';
import { ShieldCheck, Award, Leaf, Droplet, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: <Award className="w-6 h-6 text-gray-400" />,
    title: "ISO 9001",
    subtitle: "Zertifizierte Qualität",
  },
  {
    icon: <Droplet className="w-6 h-6 text-gray-400" />,
    title: "DVGW",
    subtitle: "Geprüfte Sicherheit",
  },
  {
    icon: <Leaf className="w-6 h-6 text-gray-400" />,
    title: "Nachhaltigkeit",
    subtitle: "Eco-Friendly",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-gray-400" />,
    title: "TÜV Rheinland",
    subtitle: "Regelmäßig geprüft",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-gray-400" />,
    title: "5 Jahre Garantie",
    subtitle: "Auf alle Systeme",
  }
];

export default function FooterTrustBadges() {
  return (
    <div className="w-full py-8 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-40 sm:w-48"
            >
              <div className="mb-3 p-3 rounded-full bg-black/40 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h4 className="text-gray-200 text-sm font-semibold tracking-wide text-center">
                {badge.title}
              </h4>
              <p className="text-gray-500 text-xs text-center mt-1">
                {badge.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

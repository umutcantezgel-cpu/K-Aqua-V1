import React from "react";
import {
  Droplet as LucideDroplet,
  ArrowRight as LucideArrowRight,
  ArrowUpRight as LucideArrowUpRight,
  Download as LucideDownload,
  Play as LucidePlay,
  Leaf as LucideLeaf,
  Recycle as LucideRecycle,
  Shield as LucideShield,
  Layers as LucideLayers,
  Thermometer as LucideThermometer,
  Globe as LucideGlobe,
  Award as LucideAward,
  Factory as LucideFactory,
  Wrench as LucideWrench,
  Phone as LucidePhone,
  Mail as LucideMail,
  MapPin as LucideMapPin,
  Users as LucideUsers,
  FileText as LucideFileText,
  Sun as LucideSun,
  Moon as LucideMoon,
  Menu as LucideMenu,
  X as LucideX,
  Check as LucideCheck,
  Ruler as LucideRuler,
  Flame as LucideFlame,
  Handshake as LucideHandshake,
  ChevronDown as LucideChevronDown,
  Zap as LucideZap,
  Package as LucidePackage,
  Truck as LucideTruck,
  LucideProps,
} from "lucide-react";
import clsx from "clsx";

export type IconProps = LucideProps;

const createIcon = (
  LucideIcon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  isArrow = false
) => {
  const Component = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 20, strokeWidth = 2, className, ...props }, ref) => {
      return (
        <LucideIcon
          ref={ref}
          size={size}
          strokeWidth={strokeWidth}
          className={clsx(
            isArrow && "rtl-flip rtl:-scale-x-100",
            className
          )}
          {...props}
        />
      );
    }
  );
  Component.displayName = LucideIcon.displayName || "Icon";
  return Component;
};

export const Droplet = createIcon(LucideDroplet);
export const ArrowRight = createIcon(LucideArrowRight, true);
export const ArrowUpRight = createIcon(LucideArrowUpRight, true);
export const Download = createIcon(LucideDownload);
export const Play = createIcon(LucidePlay);
export const Leaf = createIcon(LucideLeaf);
export const Recycle = createIcon(LucideRecycle);
export const Shield = createIcon(LucideShield);
export const Layers = createIcon(LucideLayers);
export const Thermometer = createIcon(LucideThermometer);
export const Globe = createIcon(LucideGlobe);
export const Award = createIcon(LucideAward);
export const Factory = createIcon(LucideFactory);
export const Wrench = createIcon(LucideWrench);
export const Phone = createIcon(LucidePhone);
export const Mail = createIcon(LucideMail);
export const MapPin = createIcon(LucideMapPin);
export const Users = createIcon(LucideUsers);
export const FileText = createIcon(LucideFileText);
export const Sun = createIcon(LucideSun);
export const Moon = createIcon(LucideMoon);
export const Menu = createIcon(LucideMenu);
export const X = createIcon(LucideX);
export const Check = createIcon(LucideCheck);
export const Ruler = createIcon(LucideRuler);
export const Flame = createIcon(LucideFlame);
export const Handshake = createIcon(LucideHandshake);
export const ChevronDown = createIcon(LucideChevronDown);
export const Zap = createIcon(LucideZap);
export const Package = createIcon(LucidePackage);
export const Truck = createIcon(LucideTruck);

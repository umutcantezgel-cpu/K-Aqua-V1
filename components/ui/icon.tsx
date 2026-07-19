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
  Activity as LucideActivity,
  TrendingDown as LucideTrendingDown,
  Coins as LucideCoins,
  ShieldAlert as LucideShieldAlert,
  TestTube as LucideTestTube,
  ThermometerSnowflake as LucideThermometerSnowflake,
  ThermometerSun as LucideThermometerSun,
  TrendingUp as LucideTrendingUp,
  VolumeX as LucideVolumeX,
  Waves as LucideWaves,
  Wind as LucideWind,
  LayoutDashboard as LucideLayoutDashboard,
  Pickaxe as LucidePickaxe,
  ShieldCheck as LucideShieldCheck,
  Route as LucideRoute,
  Anchor as LucideAnchor,
  Building as LucideBuilding,
  Settings as LucideSettings,
  Link as LucideLink,
  Droplets as LucideDroplets,
  ShieldAlert as LucideShieldAlert2, // Keep the old one if needed, but I'll replace the existing one block instead.
  AlertOctagon as LucideAlertOctagon,
  AlertTriangle as LucideAlertTriangle,
  ArrowRightLeft as LucideArrowRightLeft,
  BarChart as LucideBarChart,
  Beaker as LucideBeaker,
  Box as LucideBox,
  Building2 as LucideBuilding2,
  CheckCircle as LucideCheckCircle,
  CheckCircle2 as LucideCheckCircle2,
  Clock as LucideClock,
  CloudRain as LucideCloudRain,
  Code as LucideCode,
  Coffee as LucideCoffee,
  Cpu as LucideCpu,
  Database as LucideDatabase,
  Ear as LucideEar,
  FlaskConical as LucideFlaskConical,
  Hammer as LucideHammer,
  HeartPulse as LucideHeartPulse,
  Info as LucideInfo,
  Microscope as LucideMicroscope,
  MonitorSmartphone as LucideMonitorSmartphone,
  MoveHorizontal as LucideMoveHorizontal,
  Network as LucideNetwork,
  Power as LucidePower,
  Repeat as LucideRepeat,
  Scale as LucideScale,
  Search as LucideSearch,
  Server as LucideServer,
  Settings2 as LucideSettings2,
  Snowflake as LucideSnowflake,
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
export const Activity = createIcon(LucideActivity);
export const TrendingDown = createIcon(LucideTrendingDown);
export const Coins = createIcon(LucideCoins);
export const ShieldAlert = createIcon(LucideShieldAlert);
export const TestTube = createIcon(LucideTestTube);
export const ThermometerSnowflake = createIcon(LucideThermometerSnowflake);
export const ThermometerSun = createIcon(LucideThermometerSun);
export const TrendingUp = createIcon(LucideTrendingUp);
export const VolumeX = createIcon(LucideVolumeX);
export const Waves = createIcon(LucideWaves);
export const Wind = createIcon(LucideWind);
export const LayoutDashboard = createIcon(LucideLayoutDashboard);
export const Pickaxe = createIcon(LucidePickaxe);
export const ShieldCheck = createIcon(LucideShieldCheck);
export const Route = createIcon(LucideRoute);
export const Anchor = createIcon(LucideAnchor);
export const Building = createIcon(LucideBuilding);
export const Settings = createIcon(LucideSettings);
export const Link = createIcon(LucideLink);
export const Droplets = createIcon(LucideDroplets);
export const AlertOctagon = createIcon(LucideAlertOctagon);
export const AlertTriangle = createIcon(LucideAlertTriangle);
export const ArrowRightLeft = createIcon(LucideArrowRightLeft);
export const BarChart = createIcon(LucideBarChart);
export const Beaker = createIcon(LucideBeaker);
export const Box = createIcon(LucideBox);
export const Building2 = createIcon(LucideBuilding2);
export const CheckCircle = createIcon(LucideCheckCircle);
export const CheckCircle2 = createIcon(LucideCheckCircle2);
export const Clock = createIcon(LucideClock);
export const CloudRain = createIcon(LucideCloudRain);
export const Code = createIcon(LucideCode);
export const Coffee = createIcon(LucideCoffee);
export const Cpu = createIcon(LucideCpu);
export const Database = createIcon(LucideDatabase);
export const Ear = createIcon(LucideEar);
export const FlaskConical = createIcon(LucideFlaskConical);
export const Hammer = createIcon(LucideHammer);
export const HeartPulse = createIcon(LucideHeartPulse);
export const Info = createIcon(LucideInfo);
export const Microscope = createIcon(LucideMicroscope);
export const MonitorSmartphone = createIcon(LucideMonitorSmartphone);
export const MoveHorizontal = createIcon(LucideMoveHorizontal);
export const Network = createIcon(LucideNetwork);
export const Power = createIcon(LucidePower);
export const Repeat = createIcon(LucideRepeat);
export const Scale = createIcon(LucideScale);
export const Search = createIcon(LucideSearch);
export const Server = createIcon(LucideServer);
export const Settings2 = createIcon(LucideSettings2);
export const Snowflake = createIcon(LucideSnowflake);

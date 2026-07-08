/**
 * K-Aqua Button — primäre, sekundäre (ghost) und inverse Handlungsaufforderungen.
 * @startingPoint section="Components" subtitle="Primary / Ghost / Inverse, 3 Größen, Icon-Slot" viewport="700x320"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** primary (violett, Standard) · ghost (Outline) · inverse (für dunkle Flächen) */
  variant?: 'primary' | 'ghost' | 'inverse';
  /** sm 44px · md 48px · lg 56px Mindesthöhe */
  size?: 'sm' | 'md' | 'lg';
  /** genau EIN Icon, 16–18px, lucide-Stil */
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  /** Rendert als <a>; http-Links öffnen in neuem Tab */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

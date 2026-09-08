import {
  Car,
  GraduationCap,
  HeartPulse,
  Home,
  type LucideIcon,
  MoreHorizontal,
  PartyPopper,
  PawPrint,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Car,
  HeartPulse,
  Home,
  Sparkles,
  ShoppingBag,
  GraduationCap,
  PawPrint,
  Wrench,
  PartyPopper,
};

interface CategoryIconProps {
  icon: string;
  className?: string;
}

export function CategoryIcon({ icon, className }: CategoryIconProps) {
  const Icon = ICONS[icon] ?? MoreHorizontal;
  return <Icon className={className} aria-hidden="true" />;
}

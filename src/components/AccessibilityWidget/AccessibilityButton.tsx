import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityButtonProps {
  onClick: () => void;
  oversized: boolean;
}

export function AccessibilityButton({ onClick, oversized }: AccessibilityButtonProps) {
  return (
    <button
      data-a11y-widget="true"
      className={cn(
        "fixed bottom-4 right-4 z-[9998] rounded-full shadow-lg",
        "bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-primary-foreground/20",
        "hover:scale-110 hover:shadow-xl transition-all duration-200",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-primary focus-visible:outline-offset-2",
        oversized ? "w-20 h-20" : "w-14 h-14",
        "animate-fade-in"
      )}
      onClick={onClick}
      aria-label="Open accessibility menu (CTRL+U)"
      title="Accessibility Menu (CTRL+U)"
    >
      <User className={cn("mx-auto stroke-[3]", oversized ? "w-10 h-10" : "w-7 h-7")} />
    </button>
  );
}

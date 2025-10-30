import { Accessibility } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityButtonProps {
  onClick: () => void;
  oversized: boolean;
}

export function AccessibilityButton({ onClick, oversized }: AccessibilityButtonProps) {
  return (
    <button
      className={cn(
        "fixed bottom-4 right-4 z-[9998] rounded-full shadow-lg border-4 border-primary/30",
        "bg-primary text-primary-foreground",
        "hover:scale-110 hover:shadow-xl hover:border-primary/50 transition-all duration-200",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-primary focus-visible:outline-offset-2",
        oversized ? "w-20 h-20" : "w-14 h-14",
        "animate-fade-in"
      )}
      onClick={onClick}
      aria-label="Open accessibility menu (CTRL+U)"
      title="Accessibility Menu (CTRL+U)"
    >
      <Accessibility className={cn("mx-auto", oversized ? "w-10 h-10" : "w-7 h-7")} />
    </button>
  );
}

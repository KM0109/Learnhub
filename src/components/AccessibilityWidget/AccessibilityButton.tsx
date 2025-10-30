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
        "bg-[#853DE4] hover:bg-[#7532cc] text-white border-4 border-white/20",
        "hover:scale-110 hover:shadow-xl transition-all duration-200",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#853DE4] focus-visible:outline-offset-2",
        oversized ? "w-20 h-20 p-3" : "w-14 h-14 p-2",
        "animate-fade-in flex items-center justify-center"
      )}
      onClick={onClick}
      aria-label="Open accessibility menu (CTRL+U)"
      title="Accessibility Menu (CTRL+U)"
    >
      <img
        src="/src/assets/Accessibility.svg"
        alt="Accessibility"
        className={cn("w-full h-full object-contain")}
      />
    </button>
  );
}

import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilityButtonProps {
  onClick: () => void;
  oversized: boolean;
}

export function AccessibilityButton({ onClick, oversized }: AccessibilityButtonProps) {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('a11y-button-position');
    if (stored) {
      setPosition(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(window.innerWidth - 64, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 64, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      localStorage.setItem('a11y-button-position', JSON.stringify(position));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <button
      className={cn(
        "fixed z-50 rounded-full bg-primary text-primary-foreground shadow-lg",
        "hover:scale-110 transition-all duration-200 cursor-move",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        oversized ? "w-20 h-20" : "w-14 h-14",
        mounted ? "animate-fade-in" : "opacity-0"
      )}
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      aria-label="Open accessibility menu (CTRL+U)"
      title="Accessibility Menu (CTRL+U)"
    >
      <User className={cn("mx-auto", oversized ? "w-10 h-10" : "w-7 h-7")} />
    </button>
  );
}

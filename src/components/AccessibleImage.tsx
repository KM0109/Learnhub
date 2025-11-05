import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAccessibilityContext } from "@/context/AccessibilityContext";

interface AccessibleImageProps {
  src: string;
  alt: string;
  className?: string;
  [key: string]: any;
}

const AccessibleImage = ({ src, alt, className, ...props }: AccessibleImageProps) => {
  const { settings } = useAccessibilityContext();
  const [showAlt, setShowAlt] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowAlt(settings.screenReader);
  }, [settings.screenReader]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAlt(!showAlt);
    setContextMenu(null);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
      setContextMenu(null);
    }
  };

  return (
    <div className="relative inline-block w-full" onClick={handleClickOutside}>
      {showAlt ? (
        <div
          className={`bg-secondary/50 border-2 border-dashed border-primary/30 rounded-lg p-4 flex items-center justify-center min-h-48 ${className}`}
          role="img"
          aria-label={alt}
          onContextMenu={handleContextMenu}
        >
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-2">Screen Reader Text:</p>
            <p className="text-base text-muted-foreground">{alt}</p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              (Right-click to view original image)
            </p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onContextMenu={handleContextMenu}
          {...props}
        />
      )}

      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed bg-card border border-border rounded-lg shadow-lg z-50"
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
        >
          <button
            onClick={handleToggle}
            onMouseDown={(e) => e.preventDefault()}
            className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-secondary text-foreground first:rounded-t-lg last:rounded-b-lg transition-colors"
          >
            {showAlt ? (
              <>
                <Eye className="h-4 w-4" />
                Show Image
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4" />
                Show Alt Text (Screen Reader)
              </>
            )}
          </button>
        </div>
      )}

      {showAlt && (
        <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <EyeOff className="h-3 w-3" />
          <span>Screen reader view active</span>
        </div>
      )}
    </div>
  );
};

export default AccessibleImage;

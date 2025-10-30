import { 
  Circle, Sparkles, Type, ArrowsUpFromLine, AlignLeft, Palette, 
  Link as LinkIcon, ImageOff, Loader, Keyboard, Layers, MessageCircle, 
  Book, Volume2, Mouse, Info, Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { AccessibilitySettings } from '@/hooks/useAccessibility';

interface ControlCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  active: boolean;
  onClick: () => void;
  info?: string;
  badge?: string;
  subtitle?: string;
}

function ControlCard({ icon: Icon, title, active, onClick, info, badge, subtitle }: ControlCardProps) {
  const content = (
    <button
      onClick={onClick}
      className={`relative p-3 rounded-lg border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#853DE4] focus-visible:outline-offset-2 flex flex-col items-center justify-center min-h-[90px] w-full ${
        active
          ? 'bg-[#853DE4] text-white border-[#853DE4] shadow-md'
          : 'bg-background hover:bg-[#853DE4]/5 hover:border-[#853DE4]/30 border-border'
      }`}
    >
      {active && (
        <Check className="absolute top-2 right-2 w-3.5 h-3.5" />
      )}
      <div className="flex justify-center items-center gap-1 mb-1.5">
        <Icon className="w-5 h-5 flex-shrink-0" />
        {badge && (
          <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-4 ${active ? 'bg-white/20 text-white border-0' : ''}`}>
            {badge}
          </Badge>
        )}
      </div>
      <div className="text-xs font-medium text-center leading-tight">{title}</div>
      {subtitle && (
        <div className={`text-[10px] mt-1 text-center leading-tight ${active ? 'opacity-90' : 'text-muted-foreground'}`}>
          {subtitle}
        </div>
      )}
    </button>
  );

  if (info) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{info}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

interface AccessibilityControlsProps {
  settings: AccessibilitySettings;
  onToggle: (key: keyof AccessibilitySettings) => void;
  onUpdate: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
}

export function AccessibilityControls({ settings, onToggle, onUpdate }: AccessibilityControlsProps) {
  const cycleContrast = () => {
    const modes: Array<AccessibilitySettings['contrast']> = ['normal', 'invert', 'dark', 'light'];
    const current = modes.indexOf(settings.contrast);
    onUpdate('contrast', modes[(current + 1) % modes.length]);
  };

  const cycleTextSize = () => {
    onUpdate('textSize', (settings.textSize + 1) % 4);
  };

  const cycleTextSpacing = () => {
    onUpdate('textSpacing', (settings.textSpacing + 1) % 4);
  };

  const cycleLineHeight = () => {
    onUpdate('lineHeight', (settings.lineHeight + 1) % 4);
  };

  const cycleTextAlign = () => {
    const aligns: Array<AccessibilitySettings['textAlign']> = ['left', 'center', 'right'];
    const current = aligns.indexOf(settings.textAlign);
    onUpdate('textAlign', aligns[(current + 1) % aligns.length]);
  };

  const cycleSaturation = () => {
    const modes: Array<AccessibilitySettings['saturation']> = ['normal', 'low', 'high', 'desaturate'];
    const current = modes.indexOf(settings.saturation);
    onUpdate('saturation', modes[(current + 1) % modes.length]);
  };

  const cycleCursor = () => {
    const modes: Array<AccessibilitySettings['cursorMode']> = ['normal', 'big', 'reading-guide', 'reading-mask'];
    const current = modes.indexOf(settings.cursorMode);
    onUpdate('cursorMode', modes[(current + 1) % modes.length]);
  };

  // Helper functions to get display labels
  const getContrastLabel = () => {
    const labels = { normal: 'Normal', invert: 'Invert', dark: 'Dark', light: 'Light' };
    return labels[settings.contrast];
  };

  const getTextSizeLabel = () => {
    return settings.textSize === 0 ? 'Normal' : `${1 + settings.textSize * 0.25}x`;
  };

  const getTextSpacingLabel = () => {
    const labels = ['Normal', '1.5x', '2x', '2.5x'];
    return labels[settings.textSpacing];
  };

  const getLineHeightLabel = () => {
    const values = [1.5, 1.75, 2, 2.25];
    return settings.lineHeight === 0 ? 'Normal' : `${values[settings.lineHeight]}x`;
  };

  const getTextAlignLabel = () => {
    const labels = { left: 'Left', center: 'Center', right: 'Right' };
    return labels[settings.textAlign];
  };

  const getSaturationLabel = () => {
    const labels = { normal: 'Normal', low: 'Low', high: 'High', desaturate: 'B&W' };
    return labels[settings.saturation];
  };

  const getCursorLabel = () => {
    const labels = { normal: 'Normal', big: 'Big', 'reading-guide': 'Guide', 'reading-mask': 'Mask' };
    return labels[settings.cursorMode];
  };

  return (
    <div className="space-y-5">
      <div className="bg-muted/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#853DE4] rounded-full"></span>
          Visual Adjustments
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <ControlCard
            icon={Circle}
            title="Contrast+"
            subtitle={getContrastLabel()}
            active={settings.contrast !== 'normal'}
            onClick={cycleContrast}
            info="Cycle through contrast modes: Invert, Dark, Light"
          />
          <ControlCard
            icon={Sparkles}
            title="Smart Contrast"
            active={settings.smartContrast}
            onClick={() => onToggle('smartContrast')}
            badge="AI"
            info="AI-powered contrast adjustment for WCAG compliance"
          />
          <ControlCard
            icon={Palette}
            title="Saturation"
            subtitle={getSaturationLabel()}
            active={settings.saturation !== 'normal'}
            onClick={cycleSaturation}
            info="Adjust color saturation"
          />
          <ControlCard
            icon={LinkIcon}
            title="Highlight Links"
            active={settings.highlightLinks}
            onClick={() => onToggle('highlightLinks')}
            info="Highlight all links on the page"
          />
          <ControlCard
            icon={ImageOff}
            title="Hide Images"
            active={settings.hideImages}
            onClick={() => onToggle('hideImages')}
            info="Remove all images from view"
          />
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#853DE4] rounded-full"></span>
          Text & Typography
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <ControlCard
            icon={Type}
            title="Bigger Text"
            subtitle={getTextSizeLabel()}
            active={settings.textSize > 0}
            onClick={cycleTextSize}
            info="Increase text size (4 levels)"
          />
          <ControlCard
            icon={ArrowsUpFromLine}
            title="Text Spacing"
            subtitle={getTextSpacingLabel()}
            active={settings.textSpacing > 0}
            onClick={cycleTextSpacing}
            info="Adjust letter spacing (3 levels)"
          />
          <ControlCard
            icon={ArrowsUpFromLine}
            title="Line Height"
            subtitle={getLineHeightLabel()}
            active={settings.lineHeight > 0}
            onClick={cycleLineHeight}
            info="Adjust line height (3 levels)"
          />
          <ControlCard
            icon={AlignLeft}
            title="Text Align"
            subtitle={getTextAlignLabel()}
            active={settings.textAlign !== 'left'}
            onClick={cycleTextAlign}
            info="Change text alignment"
          />
          <ControlCard
            icon={Type}
            title="Dyslexia Friendly"
            active={settings.dyslexiaFont}
            onClick={() => onToggle('dyslexiaFont')}
            badge="Df"
            info="Use dyslexia-friendly fonts"
          />
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#853DE4] rounded-full"></span>
          Cursor & Reading
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <ControlCard
            icon={Mouse}
            title="Cursor Tools"
            subtitle={getCursorLabel()}
            active={settings.cursorMode !== 'normal'}
            onClick={cycleCursor}
            info="Big cursor, reading guide, or reading mask"
          />
          <ControlCard
            icon={Volume2}
            title="Screen Reader"
            active={settings.screenReader}
            onClick={() => onToggle('screenReader')}
            badge="i"
            info="Built-in text-to-speech with speed controls"
          />
          <ControlCard
            icon={Loader}
            title="Pause Animations"
            active={settings.pauseAnimations}
            onClick={() => onToggle('pauseAnimations')}
            info="Stop all moving content"
          />
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#853DE4] rounded-full"></span>
          Navigation & Structure
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          <ControlCard
            icon={Keyboard}
            title="Keyboard Nav"
            active={settings.keyboardNav}
            onClick={() => onToggle('keyboardNav')}
            info="Highlight interactive elements"
          />
          <ControlCard
            icon={Layers}
            title="Page Structure"
            active={settings.pageStructure}
            onClick={() => onToggle('pageStructure')}
            info="Show headings and landmarks"
          />
          <ControlCard
            icon={MessageCircle}
            title="Tooltips"
            active={settings.tooltips}
            onClick={() => onToggle('tooltips')}
            info="Show hover information"
          />
          <ControlCard
            icon={Book}
            title="Dictionary"
            active={settings.dictionary}
            onClick={() => onToggle('dictionary')}
            badge="i"
            info="Look up words with audio support"
          />
        </div>
      </div>
    </div>
  );
}

import { X, RotateCcw, Move } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { LanguageSelector } from './LanguageSelector';
import { AccessibilityProfiles } from './AccessibilityProfiles';
import { AccessibilityControls } from './AccessibilityControls';
import type { AccessibilitySettings } from '@/hooks/useAccessibility';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onToggle: (key: keyof AccessibilitySettings) => void;
  onUpdate: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  onReset: () => void;
  onApplyProfile: (profileId: string) => void;
}

export function AccessibilityPanel({
  isOpen,
  onClose,
  settings,
  onToggle,
  onUpdate,
  onReset,
  onApplyProfile,
}: AccessibilityPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background border-l z-50 animate-slide-in-right shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Accessibility Menu (CTRL+U)</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Close accessibility menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {/* Language */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Language</h3>
                <LanguageSelector
                  value={settings.language}
                  onChange={(value) => onUpdate('language', value)}
                />
              </div>

              <Separator />

              {/* Profiles */}
              <AccessibilityProfiles
                activeProfile={settings.activeProfile}
                onSelectProfile={onApplyProfile}
              />

              <Separator />

              {/* Oversized Widget */}
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <span className="text-sm font-medium">XL Oversized Widget</span>
                <Switch
                  checked={settings.oversizedWidget}
                  onCheckedChange={() => onToggle('oversizedWidget')}
                />
              </div>

              <Separator />

              {/* Main Controls */}
              <AccessibilityControls
                settings={settings}
                onToggle={onToggle}
                onUpdate={onUpdate}
              />
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t space-y-3">
            <Button
              onClick={onReset}
              variant="default"
              className="w-full"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors flex items-center gap-1">
                <Move className="w-3 h-3" />
                Move Widget
              </button>
              <a href="#" className="hover:text-foreground transition-colors">
                Accessibility Statement
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

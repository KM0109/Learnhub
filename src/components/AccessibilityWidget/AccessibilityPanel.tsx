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
        className="fixed inset-0 bg-black/50 z-[9997] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto w-auto sm:w-full sm:max-w-[440px] max-h-[85vh] bg-background border rounded-xl z-[9999] animate-slide-in-right shadow-2xl">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Accessibility Menu (CTRL+U)</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary/5 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
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
              className="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button className="hover:text-foreground transition-colors flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded px-2 py-1">
                <Move className="w-3 h-3" />
                Move Widget
              </button>
              <a 
                href="#" 
                className="hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded px-2 py-1"
              >
                Accessibility Statement
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

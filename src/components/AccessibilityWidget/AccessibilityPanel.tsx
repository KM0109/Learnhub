import { X, RotateCcw } from 'lucide-react';
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
      <div data-a11y-widget="true" className="fixed bottom-4 right-4 left-4 sm:left-auto w-auto sm:w-full sm:max-w-[480px] h-[85vh] bg-background border rounded-2xl z-[9999] animate-slide-in-right shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b flex items-center justify-between bg-gradient-to-r from-[#853DE4] to-[#9b5df0] text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center p-1">
                <img
                  src="/src/assets/Accessibility.svg"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-lg font-semibold">Accessibility Menu</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Close accessibility menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 overflow-auto">
            <div className="space-y-5 p-5">
              {/* Language */}
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#853DE4] rounded-full"></span>
                  Language
                </h3>
                <LanguageSelector
                  value={settings.language}
                  onChange={(value) => onUpdate('language', value)}
                />
              </div>

              {/* Profiles */}
              <div className="bg-muted/30 rounded-xl p-4">
                <AccessibilityProfiles
                  activeProfile={settings.activeProfile}
                  onSelectProfile={onApplyProfile}
                />
              </div>

              {/* Oversized Widget */}
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold block">XL Widget Size</span>
                    <span className="text-xs text-muted-foreground">Increase accessibility button size</span>
                  </div>
                  <Switch
                    checked={settings.oversizedWidget}
                    onCheckedChange={() => onToggle('oversizedWidget')}
                  />
                </div>
              </div>

              {/* Main Controls */}
              <AccessibilityControls
                settings={settings}
                onToggle={onToggle}
                onUpdate={onUpdate}
              />
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-5 border-t bg-muted/30 space-y-3">
            <Button
              onClick={onReset}
              variant="default"
              className="w-full bg-[#853DE4] hover:bg-[#7532cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#853DE4] focus-visible:outline-offset-2"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>

            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <a
                href="#"
                className="hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#853DE4] focus-visible:outline-offset-2 rounded px-2 py-1"
              >
                Accessibility Statement
              </a>
              <span className="mx-2">•</span>
              <span>CTRL+U to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useMemo } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { X, Search, ChevronDown, Info, RotateCcw, Move, Check, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LANGUAGES } from '@/types/accessibility';

export const AccessibilityWidget = () => {
  const { settings, isOpen, setIsOpen, updateSetting, resetSettings, applyProfile } = useAccessibility();
  const [languageSearch, setLanguageSearch] = useState('');

  const filteredLanguages = useMemo(() =>
    LANGUAGES.filter(lang =>
      lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(languageSearch.toLowerCase()) ||
      lang.countryCode.toLowerCase().includes(languageSearch.toLowerCase())
    ), [languageSearch]
  );

  const selectedLanguage = useMemo(() =>
    LANGUAGES.find(lang => lang.code === settings.languageCode) || LANGUAGES[0],
    [settings.languageCode]
  );

  const accessibilityProfiles = [
    { id: 'motor', label: 'Motor Impaired', icon: '♿' },
    { id: 'blind', label: 'Blind', icon: '👁️' },
    { id: 'dyslexia', label: 'Dyslexia', icon: 'Df' },
    { id: 'cognitive', label: 'Cognitive & Learning', icon: '🧩' },
  ];

  const accessibilityControls = [
    { id: 'smartContrast', label: 'Smart Contrast', icon: '◐', hasInfo: false },
    { id: 'pauseAnimations', label: 'Pause Animations', icon: '⟳', hasInfo: false },
    { id: 'screenReader', label: 'Read Fast', icon: '〰️', hasInfo: true },
    { id: 'contrastPlus', label: 'Invert Colors', icon: '🖥️', hasInfo: false },
    { id: 'highlightLinks', label: 'Highlight Links', icon: '🔗', hasInfo: false },
    { id: 'biggerText', label: 'Bigger Text', icon: 'TT', hasInfo: false },
    { id: 'textSpacing', label: 'Light Spacing', icon: '↔', hasInfo: false },
    { id: 'hideImages', label: 'Hide Images', icon: '🖼️', hasInfo: false },
    { id: 'dyslexiaFriendly', label: 'Dyslexia Friendly', icon: 'Df', hasInfo: true },
    { id: 'cursor', label: 'Cursor', icon: '↖', hasInfo: false },
    { id: 'tooltips', label: 'Tooltips', icon: '💬', hasInfo: false },
    { id: 'pageStructure', label: 'Page Structure', icon: '📑', hasInfo: false },
    { id: 'lineHeight', label: 'Line Height (1.5x)', icon: '≡', hasInfo: false },
    { id: 'textAlign', label: 'Align Left', icon: '☰', hasInfo: false },
    { id: 'dictionary', label: 'Dictionary', icon: '📖', hasInfo: true },
  ];

  const toggleSetting = (key: string) => {
    updateSetting(key as any, !settings[key as keyof typeof settings]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
        aria-label="Open Accessibility Menu (CTRL+U)"
        title="Open Accessibility Menu (CTRL+U)"
      >
        <div className="relative">
          <Accessibility className="w-8 h-8" strokeWidth={2.5} />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md h-full bg-background shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b bg-background">
                <h2 className="text-lg font-semibold">
                  Accessibility Menu <span className="text-sm text-muted-foreground">(CTRL+U)</span>
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close accessibility menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg">
                        {selectedLanguage.flag}
                      </div>
                      <div className="flex-1">
                        <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                          {selectedLanguage.name} ({selectedLanguage.countryCode})
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="text"
                        placeholder="Search language"
                        value={languageSearch}
                        onChange={(e) => setLanguageSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <ScrollArea className="h-48 rounded-md border">
                      <div className="p-2 space-y-1">
                        {filteredLanguages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => updateSetting('languageCode', lang.code)}
                            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition-colors"
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <Badge variant="secondary" className="font-mono text-xs">
                              {lang.countryCode}
                            </Badge>
                            <span className="flex-1 text-left text-sm">
                              {lang.name} ({lang.nativeName})
                            </span>
                            {lang.code === settings.languageCode && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors">
                      <Accessibility className="w-5 h-5" />
                      Accessibility Profiles
                      <ChevronDown className="w-4 h-4 ml-auto" />
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      {accessibilityProfiles.map((profile) => (
                        <button
                          key={profile.id}
                          onClick={() => applyProfile(profile.id as any)}
                          className={`p-4 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                            settings.profile === profile.id ? 'border-primary bg-primary/10' : 'border-border'
                          }`}
                        >
                          <div className="text-2xl mb-2">{profile.icon}</div>
                          <div className="text-xs font-medium">{profile.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">XL</span>
                      <span className="text-sm font-medium">Oversized Widget</span>
                    </div>
                    <Switch
                      checked={settings.oversizedWidget}
                      onCheckedChange={(checked) => updateSetting('oversizedWidget', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-3">
                    {accessibilityControls.map((control) => {
                      const isActive = settings[control.id as keyof typeof settings];
                      return (
                        <button
                          key={control.id}
                          onClick={() => toggleSetting(control.id)}
                          className={`relative p-4 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5 flex flex-col items-center gap-2 ${
                            isActive ? 'border-primary bg-primary/10' : 'border-border bg-card'
                          }`}
                        >
                          {isActive && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                          {control.hasInfo && !isActive && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">
                              <Info className="w-3 h-3" />
                            </div>
                          )}
                          <span className="text-xl">{control.icon}</span>
                          <span className="text-xs font-medium text-center leading-tight">{control.label}</span>
                          {isActive && (
                            <div className="w-8 h-1 bg-primary rounded-full mt-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <Separator />

                  <Button
                    onClick={resetSettings}
                    variant="outline"
                    className="w-full hover:bg-primary/10 hover:border-primary"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Accessibility Settings
                  </Button>

                  <button className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-primary/10 hover:border-primary transition-colors">
                    <div className="flex items-center gap-2">
                      <Move className="w-4 h-4" />
                      <span className="text-sm font-medium">Move Widget</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <div className="text-center pb-4">
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Accessibility Statement
                    </a>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
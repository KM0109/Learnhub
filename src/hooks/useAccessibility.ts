import { useState, useEffect, useCallback } from 'react';

export interface AccessibilitySettings {
  language: string;
  contrast: 'normal' | 'invert' | 'dark' | 'light';
  smartContrast: boolean;
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
  saturation: 'normal' | 'low' | 'high' | 'desaturate';
  highlightLinks: boolean;
  hideImages: boolean;
  dyslexiaFont: boolean;
  dyslexiaFontType: 1 | 2;
  cursorMode: 'normal' | 'big' | 'reading-guide' | 'reading-mask';
  screenReader: boolean;
  screenReaderSpeed: number;
  pauseAnimations: boolean;
  keyboardNav: boolean;
  pageStructure: boolean;
  tooltips: boolean;
  dictionary: boolean;
  oversizedWidget: boolean;
  activeProfile: string | null;
}

const defaultSettings: AccessibilitySettings = {
  language: 'en-US',
  contrast: 'normal',
  smartContrast: false,
  textSize: 0,
  textSpacing: 0,
  lineHeight: 0,
  textAlign: 'left',
  saturation: 'normal',
  highlightLinks: false,
  hideImages: false,
  dyslexiaFont: false,
  dyslexiaFontType: 1,
  cursorMode: 'normal',
  screenReader: false,
  screenReaderSpeed: 1,
  pauseAnimations: false,
  keyboardNav: false,
  pageStructure: false,
  tooltips: false,
  dictionary: false,
  oversizedWidget: false,
  activeProfile: null,
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem('accessibility-settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  });

  const [isOpen, setIsOpen] = useState(false);

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply settings to DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Contrast
    root.setAttribute('data-contrast', settings.contrast);
    
    // Text size
    root.style.setProperty('--a11y-text-scale', `${1 + settings.textSize * 0.25}`);
    
    // Text spacing
    root.style.setProperty('--a11y-letter-spacing', `${settings.textSpacing * 0.05}em`);
    
    // Line height
    root.style.setProperty('--a11y-line-height', `${1.5 + settings.lineHeight * 0.25}`);
    
    // Text align
    root.setAttribute('data-text-align', settings.textAlign);
    
    // Saturation
    root.setAttribute('data-saturation', settings.saturation);
    
    // Hide images
    root.setAttribute('data-hide-images', settings.hideImages.toString());
    
    // Highlight links
    root.setAttribute('data-highlight-links', settings.highlightLinks.toString());
    
    // Dyslexia font
    root.setAttribute('data-dyslexia-font', settings.dyslexiaFont.toString());
    
    // Cursor mode
    root.setAttribute('data-cursor-mode', settings.cursorMode);
    
    // Pause animations
    root.setAttribute('data-pause-animations', settings.pauseAnimations.toString());
    
    // Keyboard navigation
    root.setAttribute('data-keyboard-nav', settings.keyboardNav.toString());
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleSetting = useCallback((key: keyof AccessibilitySettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const applyProfile = useCallback((profileId: string) => {
    const profiles: Record<string, Partial<AccessibilitySettings>> = {
      'motor-impaired': {
        keyboardNav: true,
        textSize: 2,
        cursorMode: 'big',
      },
      'blind': {
        screenReader: true,
        keyboardNav: true,
      },
      'color-blind': {
        saturation: 'high',
        smartContrast: true,
      },
      'dyslexia': {
        dyslexiaFont: true,
        textSpacing: 2,
        lineHeight: 2,
      },
      'visually-impaired': {
        textSize: 3,
        contrast: 'dark',
        highlightLinks: true,
      },
      'adhd': {
        pauseAnimations: true,
        cursorMode: 'reading-mask',
        saturation: 'low',
      },
      'cognitive': {
        textSize: 2,
        lineHeight: 2,
        pageStructure: true,
      },
      'seizure': {
        pauseAnimations: true,
        saturation: 'desaturate',
      },
    };

    setSettings(prev => ({
      ...defaultSettings,
      ...profiles[profileId],
      activeProfile: profileId,
    }));
  }, []);

  return {
    settings,
    isOpen,
    setIsOpen,
    updateSetting,
    toggleSetting,
    resetSettings,
    applyProfile,
  };
}

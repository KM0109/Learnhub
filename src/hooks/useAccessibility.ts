import { useState, useEffect, useCallback } from 'react';
import { AccessibilitySettings } from '@/types/accessibility';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  languageCode: 'en-US',
  profile: null,
  oversizedWidget: false,
  smartContrast: false,
  pauseAnimations: false,
  screenReader: false,
  contrastPlus: false,
  highlightLinks: false,
  biggerText: false,
  textSpacing: false,
  hideImages: false,
  dyslexiaFriendly: false,
  cursor: false,
  tooltips: false,
  pageStructure: false,
  lineHeight: false,
  textAlign: false,
  dictionary: false,
  widgetPosition: { x: 20, y: 20 },
};

const STORAGE_KEY = 'accessibility_settings';

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const updateSetting = useCallback((key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    removeSettings();
  }, []);

  const applyProfile = useCallback((profile: AccessibilitySettings['profile']) => {
    const profileSettings: Partial<AccessibilitySettings> = {};

    switch (profile) {
      case 'motor':
        profileSettings.biggerText = true;
        profileSettings.cursor = true;
        profileSettings.highlightLinks = true;
        break;
      case 'blind':
        profileSettings.screenReader = true;
        profileSettings.pageStructure = true;
        profileSettings.contrastPlus = true;
        break;
      case 'dyslexia':
        profileSettings.dyslexiaFriendly = true;
        profileSettings.textSpacing = true;
        profileSettings.lineHeight = true;
        break;
      case 'cognitive':
        profileSettings.pauseAnimations = true;
        profileSettings.tooltips = true;
        profileSettings.dictionary = true;
        break;
    }

    setSettings(prev => ({ ...prev, profile, ...profileSettings }));
  }, []);

  return {
    settings,
    isOpen,
    setIsOpen,
    updateSetting,
    resetSettings,
    applyProfile,
  };
};

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;

  if (settings.smartContrast) {
    root.classList.add('smart-contrast');
  } else {
    root.classList.remove('smart-contrast');
  }

  if (settings.pauseAnimations) {
    root.classList.add('pause-animations');
  } else {
    root.classList.remove('pause-animations');
  }

  if (settings.contrastPlus) {
    root.classList.add('contrast-plus');
  } else {
    root.classList.remove('contrast-plus');
  }

  if (settings.highlightLinks) {
    root.classList.add('highlight-links');
  } else {
    root.classList.remove('highlight-links');
  }

  if (settings.biggerText) {
    root.classList.add('bigger-text');
  } else {
    root.classList.remove('bigger-text');
  }

  if (settings.textSpacing) {
    root.classList.add('text-spacing');
  } else {
    root.classList.remove('text-spacing');
  }

  if (settings.hideImages) {
    root.classList.add('hide-images');
  } else {
    root.classList.remove('hide-images');
  }

  if (settings.dyslexiaFriendly) {
    root.classList.add('dyslexia-friendly');
  } else {
    root.classList.remove('dyslexia-friendly');
  }

  if (settings.lineHeight) {
    root.classList.add('line-height');
  } else {
    root.classList.remove('line-height');
  }

  if (settings.textAlign) {
    root.classList.add('text-align');
  } else {
    root.classList.remove('text-align');
  }
}

function removeSettings() {
  const root = document.documentElement;
  const classes = [
    'smart-contrast',
    'pause-animations',
    'contrast-plus',
    'highlight-links',
    'bigger-text',
    'text-spacing',
    'hide-images',
    'dyslexia-friendly',
    'line-height',
    'text-align',
  ];
  root.classList.remove(...classes);
}
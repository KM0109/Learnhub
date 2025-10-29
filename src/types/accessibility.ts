export interface AccessibilitySettings {
  languageCode: string;
  profile: 'motor' | 'blind' | 'dyslexia' | 'cognitive' | null;
  oversizedWidget: boolean;
  smartContrast: boolean;
  pauseAnimations: boolean;
  screenReader: boolean;
  contrastPlus: boolean;
  highlightLinks: boolean;
  biggerText: boolean;
  textSpacing: boolean;
  hideImages: boolean;
  dyslexiaFriendly: boolean;
  cursor: boolean;
  tooltips: boolean;
  pageStructure: boolean;
  lineHeight: boolean;
  textAlign: boolean;
  dictionary: boolean;
  widgetPosition: { x: number; y: number };
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English', nativeName: 'English', flag: '🇺🇸', countryCode: 'US' },
  { code: 'az-AZ', name: 'Azerbaijani', nativeName: 'Azəri', flag: '🇦🇿', countryCode: 'AZ' },
  { code: 'id-ID', name: 'Bahasa Indonesia', nativeName: 'Indonesian', flag: '🇮🇩', countryCode: 'ID' },
  { code: 'eu-ES', name: 'Basque', nativeName: 'Basque', flag: '🇪🇺', countryCode: 'EU' },
  { code: 'ca-ES', name: 'Catala', nativeName: 'Catalan', flag: '🇨🇦', countryCode: 'CA' },
  { code: 'ceb-PH', name: 'Cebuano', nativeName: 'Filipino', flag: '🇵🇭', countryCode: 'CE' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', countryCode: 'ES' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', countryCode: 'FR' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', countryCode: 'DE' },
  { code: 'it-IT', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', countryCode: 'IT' },
  { code: 'pt-PT', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', countryCode: 'PT' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', countryCode: 'RU' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', countryCode: 'CN' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', countryCode: 'JP' },
  { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', countryCode: 'SA' },
];
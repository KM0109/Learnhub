import { createContext, useContext } from 'react';
import { AccessibilitySettings } from '@/hooks/useAccessibility';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children, settings }: { children: React.ReactNode; settings: AccessibilitySettings }) {
  return (
    <AccessibilityContext.Provider value={{ settings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibilityContext must be used within AccessibilityProvider');
  }
  return context;
}

import { useEffect } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { AccessibilityButton } from './AccessibilityButton';
import { AccessibilityPanel } from './AccessibilityPanel';

export function AccessibilityWidget() {
  const {
    settings,
    isOpen,
    setIsOpen,
    updateSetting,
    toggleSetting,
    resetSettings,
    applyProfile,
  } = useAccessibility();

  // Keyboard shortcut: CTRL+U
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

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <AccessibilityButton
        onClick={() => setIsOpen(true)}
        oversized={settings.oversizedWidget}
      />

      <AccessibilityPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        settings={settings}
        onToggle={toggleSetting}
        onUpdate={updateSetting}
        onReset={resetSettings}
        onApplyProfile={applyProfile}
      />
    </>
  );
}

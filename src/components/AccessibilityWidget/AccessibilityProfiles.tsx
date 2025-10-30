import { Accessibility, Eye, Brain, Puzzle, ChevronDown, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const profiles = [
  { id: 'motor-impaired', name: 'Motor Impaired', icon: Accessibility, description: 'Keyboard navigation' },
  { id: 'blind', name: 'Blind', icon: Eye, description: 'Screen reader support' },
  { id: 'dyslexia', name: 'Dyslexia', icon: Brain, description: 'Readable fonts' },
  { id: 'cognitive', name: 'Cognitive & Learning', icon: Puzzle, description: 'Simplified layout' },
];

interface AccessibilityProfilesProps {
  activeProfile: string | null;
  onSelectProfile: (profileId: string) => void;
}

export function AccessibilityProfiles({ activeProfile, onSelectProfile }: AccessibilityProfilesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border bg-card hover:bg-primary/5 transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-medium">Accessibility Profiles</span>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3">
        <div className="grid grid-cols-2 gap-2">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile.id)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  activeProfile === profile.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-card hover:bg-primary/5 hover:border-primary/20'
                }`}
              >
                <Icon className="w-5 h-5 mb-2" />
                <div className="text-sm font-medium">{profile.name}</div>
                <div className="text-xs opacity-80 mt-1">{profile.description}</div>
              </button>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

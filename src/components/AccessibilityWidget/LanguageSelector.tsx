import { useState } from 'react';
import { Search, Check, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const languages = [
  { code: 'en-US', name: 'English', native: 'English', flag: '🇺🇸', country: 'US' },
  { code: 'es-ES', name: 'Spanish', native: 'Español', flag: '🇪🇸', country: 'ES' },
  { code: 'fr-FR', name: 'French', native: 'Français', flag: '🇫🇷', country: 'FR' },
  { code: 'de-DE', name: 'German', native: 'Deutsch', flag: '🇩🇪', country: 'DE' },
  { code: 'it-IT', name: 'Italian', native: 'Italiano', flag: '🇮🇹', country: 'IT' },
  { code: 'pt-PT', name: 'Portuguese', native: 'Português', flag: '🇵🇹', country: 'PT' },
  { code: 'ru-RU', name: 'Russian', native: 'Русский', flag: '🇷🇺', country: 'RU' },
  { code: 'ja-JP', name: 'Japanese', native: '日本語', flag: '🇯🇵', country: 'JP' },
  { code: 'zh-CN', name: 'Chinese', native: '中文', flag: '🇨🇳', country: 'CN' },
  { code: 'ar-SA', name: 'Arabic', native: 'العربية', flag: '🇸🇦', country: 'SA' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedLang = languages.find(l => l.code === value) || languages[0];
  const filtered = languages.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.native.toLowerCase().includes(search.toLowerCase()) ||
    l.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border bg-card hover:bg-primary/5 hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedLang.flag}</span>
            <div className="text-left">
              <div className="text-sm font-medium">{selectedLang.name}</div>
              <div className="text-xs text-muted-foreground">{selectedLang.native}</div>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search languages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="h-48 rounded-lg border">
            <div className="p-2 space-y-1">
              {filtered.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onChange(lang.code);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-primary/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lang.flag}</span>
                    <Badge variant="outline" className="text-xs">{lang.country}</Badge>
                    <div>
                      <div className="text-sm font-medium">{lang.name}</div>
                      <div className="text-xs text-muted-foreground">{lang.native}</div>
                    </div>
                  </div>
                  {value === lang.code && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

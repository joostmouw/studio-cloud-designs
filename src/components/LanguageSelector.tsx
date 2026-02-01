import { useState } from 'react';
import { Globe, Search, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const currentLang = languages.find(l => l.code === currentLanguage);

  // Primary languages (EN, NL, DK)
  const primaryLanguages = languages.slice(0, 3);

  // Other languages (top 20)
  const otherLanguages = languages.slice(3);

  // Filter languages based on search
  const filteredOtherLanguages = otherLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    setSearchQuery('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Change language"
        >
          <Globe size={18} className="text-muted-foreground" />
          <span className="text-sm font-medium">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[280px] max-h-[400px] overflow-hidden">
        {/* Primary Languages */}
        <div className="p-2">
          <p className="text-xs text-muted-foreground mb-2 px-2">PRIMARY LANGUAGES</p>
          {primaryLanguages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center justify-between cursor-pointer py-2 px-2"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{lang.name}</span>
                  <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
                </div>
              </div>
              {currentLanguage === lang.code && (
                <Check size={16} className="text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Other Languages with Search */}
        <div className="p-2">
          <p className="text-xs text-muted-foreground mb-2 px-2">OTHER LANGUAGES</p>

          {/* Search Input */}
          <div className="relative mb-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-sm"
            />
          </div>

          {/* Scrollable Language List */}
          <div className="max-h-[200px] overflow-y-auto">
            {filteredOtherLanguages.length > 0 ? (
              filteredOtherLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between cursor-pointer py-2 px-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
                    </div>
                  </div>
                  {currentLanguage === lang.code && (
                    <Check size={16} className="text-primary" />
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                No languages found
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

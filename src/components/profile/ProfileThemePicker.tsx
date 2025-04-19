
import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeOption } from '@/types';
import { THEME_OPTIONS } from '@/constants';

interface ProfileThemePickerProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
}

export function ProfileThemePicker({
  currentThemeId,
  onThemeChange
}: ProfileThemePickerProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Theme</h3>
        <Select value={currentThemeId} onValueChange={onThemeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {THEME_OPTIONS.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {THEME_OPTIONS.map((theme) => (
          <div
            key={theme.id}
            className={`
              h-20 rounded-md border-2 cursor-pointer overflow-hidden
              flex items-center justify-center relative
              ${theme.previewClass}
              ${currentThemeId === theme.id ? 'border-primary' : 'border-transparent'}
            `}
            onClick={() => onThemeChange(theme.id)}
          >
            {currentThemeId === theme.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <Check className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

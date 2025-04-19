
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LinkType } from '@/types';
import { LINK_TYPE_CONFIG } from '@/constants';

interface LinkTypeSelectorProps {
  value: LinkType;
  onValueChange: (value: LinkType) => void;
}

const linkTypeOptions = [
  { value: 'default', label: 'Default Link' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
  { value: 'custom', label: 'Custom' },
];

export function LinkTypeSelector({ value, onValueChange }: LinkTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  
  const selectedType = linkTypeOptions.find(type => type.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedType?.label || "Select link type"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search link type..." />
          <CommandEmpty>No link type found.</CommandEmpty>
          <CommandGroup>
            {linkTypeOptions.map((type) => (
              <CommandItem
                key={type.value}
                value={type.value}
                onSelect={() => {
                  onValueChange(type.value as LinkType);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === type.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {type.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

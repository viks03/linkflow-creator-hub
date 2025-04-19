
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  links: Link[];
  theme: Theme;
  settings: UserSettings;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  enabled: boolean;
  order: number;
  pinned?: boolean;
  type: LinkType;
  customColor?: string;
  subtitle?: string;
}

export type LinkType = 'default' | 'youtube' | 'twitter' | 'instagram' | 'tiktok' | 'github' | 'linkedin' | 'email' | 'custom';

export interface Theme {
  id: string;
  name: string;
  colorScheme: 'light' | 'dark' | 'system';
  primaryColor: string;
  backgroundColor: string;
  buttonStyle: 'rounded' | 'pill' | 'square' | 'soft' | 'glass' | 'outline' | 'minimal';
  buttonAnimation?: 'none' | 'pulse' | 'bounce' | 'glow' | 'slide';
  backgroundEffect?: 'none' | 'particles' | 'gradient' | 'shapes';
  customCSS?: string;
}

export interface UserSettings {
  allowAnalytics: boolean;
  isProfilePublic: boolean;
  customDomain?: string;
  cacheVersion?: number;
}

export type ThemeOption = {
  id: string;
  name: string;
  previewClass: string;
  colorScheme: 'light' | 'dark' | 'system';
  buttonStyle: 'rounded' | 'pill' | 'square' | 'soft' | 'glass' | 'outline' | 'minimal';
  buttonAnimation?: 'none' | 'pulse' | 'bounce' | 'glow' | 'slide';
  backgroundEffect?: 'none' | 'particles' | 'gradient' | 'shapes';
};

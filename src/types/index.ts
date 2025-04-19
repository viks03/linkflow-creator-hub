
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
}

export interface Theme {
  id: string;
  name: string;
  colorScheme: 'light' | 'dark' | 'system';
  primaryColor: string;
  backgroundColor: string;
  buttonStyle: 'rounded' | 'pill' | 'square';
  buttonAnimation?: string;
  customCSS?: string;
}

export interface UserSettings {
  allowAnalytics: boolean;
  isProfilePublic: boolean;
  customDomain?: string;
}

export type ThemeOption = {
  id: string;
  name: string;
  previewClass: string;
  colorScheme: 'light' | 'dark' | 'system';
};

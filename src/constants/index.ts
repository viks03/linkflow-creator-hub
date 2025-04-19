
import { UserProfile, ThemeOption } from '@/types';

// Demo user profile for testing
export const DEMO_USER_PROFILE: UserProfile = {
  id: 'user_demo',
  username: 'creator',
  email: 'demo@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  bio: 'Content creator passionate about sharing knowledge and inspiration. Follow me for regular updates!',
  links: [
    {
      id: 'link_1',
      title: 'My YouTube Channel',
      url: 'https://youtube.com',
      icon: 'youtube',
      enabled: true,
      order: 1,
      pinned: true,
      type: 'youtube',
    },
    {
      id: 'link_2',
      title: 'Instagram',
      url: 'https://instagram.com',
      icon: 'instagram',
      enabled: true,
      order: 2,
      type: 'instagram',
    },
    {
      id: 'link_3',
      title: 'Latest Blog Post',
      url: 'https://medium.com',
      icon: 'file-text',
      enabled: true,
      order: 3,
      type: 'default',
      subtitle: 'Check out my new tutorial series'
    },
    {
      id: 'link_4',
      title: 'My Shop',
      url: 'https://etsy.com',
      icon: 'shopping-bag',
      enabled: true,
      order: 4,
      type: 'default',
    },
    {
      id: 'link_5',
      title: 'Twitter/X',
      url: 'https://twitter.com',
      icon: 'twitter',
      enabled: false,
      order: 5,
      type: 'twitter',
    }
  ],
  theme: {
    id: 'midnight',
    name: 'Midnight',
    colorScheme: 'dark',
    primaryColor: '#3B82F6',
    backgroundColor: '#0F172A',
    buttonStyle: 'glass',
    buttonAnimation: 'glow',
    backgroundEffect: 'particles'
  },
  settings: {
    allowAnalytics: true,
    isProfilePublic: true,
    cacheVersion: 1
  }
};

// Available themes
export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    name: 'Classic Light',
    previewClass: 'bg-white',
    colorScheme: 'light',
    buttonStyle: 'rounded',
  },
  {
    id: 'dark',
    name: 'Classic Dark',
    previewClass: 'bg-gray-900',
    colorScheme: 'dark',
    buttonStyle: 'rounded',
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    previewClass: 'bg-neutral-50',
    colorScheme: 'light',
    buttonStyle: 'minimal',
    buttonAnimation: 'none',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    previewClass: 'bg-slate-900 bg-gradient-8',
    colorScheme: 'dark',
    buttonStyle: 'glass',
    buttonAnimation: 'glow',
    backgroundEffect: 'particles',
  },
  {
    id: 'neon',
    name: 'Neon Dreams',
    previewClass: 'bg-black bg-gradient-9',
    colorScheme: 'dark',
    buttonStyle: 'soft',
    buttonAnimation: 'glow',
  },
  {
    id: 'forest',
    name: 'Forest',
    previewClass: 'theme-green bg-gradient-10',
    colorScheme: 'light',
    buttonStyle: 'soft',
    buttonAnimation: 'pulse',
  },
  {
    id: 'candy',
    name: 'Candy',
    previewClass: 'theme-pink bg-gradient-3',
    colorScheme: 'light',
    buttonStyle: 'pill',
    buttonAnimation: 'bounce',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    previewClass: 'theme-orange bg-gradient-7',
    colorScheme: 'light',
    buttonStyle: 'rounded',
    buttonAnimation: 'pulse',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    previewClass: 'theme-blue bg-gradient-1',
    colorScheme: 'light',
    buttonStyle: 'pill',
    buttonAnimation: 'slide',
  },
  {
    id: 'royal',
    name: 'Royal',
    previewClass: 'theme-purple bg-gradient-4',
    colorScheme: 'light',
    buttonStyle: 'glass',
    buttonAnimation: 'pulse',
    backgroundEffect: 'gradient',
  },
  {
    id: 'tech',
    name: 'Tech',
    previewClass: 'bg-zinc-900',
    colorScheme: 'dark',
    buttonStyle: 'square',
    buttonAnimation: 'slide',
  },
  {
    id: 'pastel',
    name: 'Pastel Dream',
    previewClass: 'bg-gradient-6',
    colorScheme: 'light',
    buttonStyle: 'pill',
    buttonAnimation: 'bounce',
  }
];

// Link type icons and styles
export const LINK_TYPE_CONFIG = {
  default: {
    icon: 'link',
    class: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
  },
  youtube: {
    icon: 'youtube',
    class: 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50'
  },
  twitter: {
    icon: 'twitter',
    class: 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
  },
  instagram: {
    icon: 'instagram',
    class: 'bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-900/50'
  },
  tiktok: {
    icon: 'video',
    class: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
  },
  github: {
    icon: 'github',
    class: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
  },
  linkedin: {
    icon: 'linkedin',
    class: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
  },
  email: {
    icon: 'mail',
    class: 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
  },
  custom: {
    icon: 'link',
    class: 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50'
  }
};

// Button styles mapping
export const BUTTON_STYLES = {
  rounded: 'rounded-lg shadow-sm',
  pill: 'rounded-full shadow-sm',
  square: 'rounded-none shadow-sm',
  soft: 'rounded-xl shadow-md bg-opacity-90 backdrop-blur-sm',
  glass: 'rounded-xl bg-opacity-20 backdrop-blur-md border border-white/10 shadow-lg',
  outline: 'rounded-lg border-2 shadow-sm bg-transparent',
  minimal: 'rounded-md border border-gray-200 dark:border-gray-700 shadow-none'
};

// Button animations
export const BUTTON_ANIMATIONS = {
  none: '',
  pulse: 'hover:animate-link-pulse',
  bounce: 'hover:animate-bounce-subtle',
  glow: 'hover:shadow-lg hover:shadow-primary/20',
  slide: 'group overflow-hidden relative hover:translate-x-1 transition-transform'
};

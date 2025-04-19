
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
      order: 1
    },
    {
      id: 'link_2',
      title: 'Instagram',
      url: 'https://instagram.com',
      icon: 'instagram',
      enabled: true,
      order: 2
    },
    {
      id: 'link_3',
      title: 'Latest Blog Post',
      url: 'https://medium.com',
      icon: 'file-text',
      enabled: true,
      order: 3
    },
    {
      id: 'link_4',
      title: 'My Shop',
      url: 'https://etsy.com',
      icon: 'shopping-bag',
      enabled: true,
      order: 4
    },
    {
      id: 'link_5',
      title: 'Twitter/X',
      url: 'https://twitter.com',
      icon: 'twitter',
      enabled: false,
      order: 5
    }
  ],
  theme: {
    id: 'theme_default',
    name: 'Default',
    colorScheme: 'light',
    primaryColor: '#3B82F6',
    backgroundColor: '#ffffff',
    buttonStyle: 'rounded'
  },
  settings: {
    allowAnalytics: true,
    isProfilePublic: true
  }
};

// Available themes
export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    name: 'Default',
    previewClass: 'bg-white',
    colorScheme: 'light'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    previewClass: 'bg-gray-900',
    colorScheme: 'dark'
  },
  {
    id: 'purple',
    name: 'Purple Dream',
    previewClass: 'theme-purple bg-gradient-4',
    colorScheme: 'light'
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    previewClass: 'theme-blue bg-gradient-1',
    colorScheme: 'light'
  },
  {
    id: 'green',
    name: 'Forest Green',
    previewClass: 'theme-green bg-gradient-2',
    colorScheme: 'light'
  },
  {
    id: 'pink',
    name: 'Bubble Gum',
    previewClass: 'theme-pink bg-gradient-3',
    colorScheme: 'light'
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    previewClass: 'theme-orange bg-gradient-5',
    colorScheme: 'light'
  }
];

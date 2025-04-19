
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { ProfileBio } from '@/components/profile/ProfileBio';
import { LinkCollection } from '@/components/profile/LinkCollection';
import { useAuth } from '@/contexts/AuthContext';
import { THEME_OPTIONS } from '@/constants';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const [theme, setTheme] = useState<string>('default');
  
  // In a real app, we'd fetch the profile from API based on username
  useEffect(() => {
    if (user && !username) {
      // Set theme from user preferences
      const selectedTheme = THEME_OPTIONS.find(t => t.id === user.theme.id) || THEME_OPTIONS[0];
      setTheme(selectedTheme.id);
    }
  }, [user, username]);
  
  // Get theme classes from selected theme
  const getThemeClass = () => {
    const selectedTheme = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];
    return selectedTheme.previewClass;
  };
  
  if (!user && !username) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-gray-600 mb-6">This profile doesn't exist or is not available.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
        >
          Login or Register
        </button>
      </div>
    );
  }
  
  // Use data from authenticated user or fetch for public profile
  const profileData = user;
  
  return (
    <div className={`min-h-screen flex flex-col items-center p-4 ${getThemeClass()}`}>
      <div className="w-full max-w-md mx-auto mt-8 mb-12">
        <div className="flex flex-col items-center">
          <ProfileAvatar 
            src={profileData?.avatar} 
            username={profileData?.username || 'User'}
            size="xl"
            editable={!username}
          />
          
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            @{profileData?.username || 'username'}
          </h1>
          
          <ProfileBio bio={profileData?.bio || ''} />
          
          <LinkCollection 
            links={profileData?.links || []}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

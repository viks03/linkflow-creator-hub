
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { ProfileBio } from '@/components/profile/ProfileBio';
import { LinkCollection } from '@/components/profile/LinkCollection';
import { useAuth } from '@/contexts/AuthContext';
import { THEME_OPTIONS, BUTTON_STYLES, BUTTON_ANIMATIONS } from '@/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const [theme, setTheme] = useState<string>('default');
  const [loading, setLoading] = useState<boolean>(true);
  
  // In a real app, we'd fetch the profile from API based on username
  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch with short delay
    const fetchTimeout = setTimeout(() => {
      if (user && !username) {
        // Set theme from user preferences
        const selectedTheme = THEME_OPTIONS.find(t => t.id === user.theme.id) || THEME_OPTIONS[0];
        setTheme(selectedTheme.id);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(fetchTimeout);
  }, [user, username]);
  
  // Get theme classes from selected theme
  const getThemeDetails = () => {
    const selectedTheme = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];
    const buttonStyle = selectedTheme.buttonStyle || 'rounded';
    const buttonAnimation = selectedTheme.buttonAnimation || 'none';
    const backgroundEffect = selectedTheme.backgroundEffect || 'none';
    
    return {
      themeClass: selectedTheme.previewClass,
      buttonStyle,
      buttonAnimation,
      backgroundEffect
    };
  };
  
  if (!user && !username && !loading) {
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
  const { themeClass, buttonStyle, buttonAnimation, backgroundEffect } = getThemeDetails();
  
  const bgEffectClass = backgroundEffect === 'particles' 
    ? 'bg-particles' 
    : backgroundEffect === 'shapes' 
      ? 'bg-shapes' 
      : '';

  return (
    <div className={`min-h-screen flex flex-col items-center p-4 ${themeClass} ${bgEffectClass}`}>
      <Card className="w-full max-w-md mx-auto mt-8 mb-12 bg-white/10 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            {loading ? (
              <>
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-48 mt-4" />
                <Skeleton className="h-12 w-full mt-6" />
              </>
            ) : (
              <>
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
                  buttonStyle={buttonStyle}
                  animation={buttonAnimation}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <footer className="text-xs text-gray-500 dark:text-gray-400 mt-auto py-2">
        ✨ Created with LinkFlow
      </footer>
    </div>
  );
};

export default Profile;

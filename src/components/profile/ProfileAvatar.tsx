
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileAvatarProps {
  src?: string;
  username: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
}

export function ProfileAvatar({ 
  src, 
  username, 
  size = 'lg',
  editable = false 
}: ProfileAvatarProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [imageLoaded, setImageLoaded] = useState(!!src);
  
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32'
  };
  
  useEffect(() => {
    setImageLoaded(false);
    if (src) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = src;
    } else {
      setImageLoaded(true);
    }
  }, [src]);
  
  const handleClick = () => {
    if (!editable) return;
    
    setClickCount(prev => prev + 1);
    
    if (clickTimer) clearTimeout(clickTimer);
    
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 500);
    
    setClickTimer(timer);
    
    if (clickCount === 2) {
      setClickCount(0);
      if (isAuthenticated) {
        navigate('/admin');
      }
    }
  };
  
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="avatar-container flex items-center justify-center">
      {!imageLoaded ? (
        <Skeleton className={`${sizeClasses[size]} rounded-full`} />
      ) : (
        <Avatar 
          className={`${sizeClasses[size]} avatar cursor-pointer border-2 border-primary shadow-lg`}
          onClick={handleClick}
        >
          <AvatarImage src={src} alt={username} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(username)}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

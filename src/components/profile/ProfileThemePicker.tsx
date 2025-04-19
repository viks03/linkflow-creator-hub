
import { useState } from 'react';
import { Check, Refresh } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThemeOption } from '@/types';
import { THEME_OPTIONS, BUTTON_STYLES } from '@/constants';
import { useToast } from '@/components/ui/use-toast';

interface ProfileThemePickerProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  onClearCache?: () => void;
}

export function ProfileThemePicker({
  currentThemeId,
  onThemeChange,
  onClearCache
}: ProfileThemePickerProps) {
  const [activeTab, setActiveTab] = useState('gallery');
  const { toast } = useToast();

  const handleClearCache = () => {
    if (onClearCache) {
      onClearCache();
      
      toast({
        title: "Cache cleared",
        description: "Your profile has been refreshed with the latest settings.",
        duration: 3000,
      });
    }
  };
  
  const getButtonPreview = (theme: ThemeOption) => {
    const buttonStyle = theme.buttonStyle || 'rounded';
    const buttonClass = BUTTON_STYLES[buttonStyle as keyof typeof BUTTON_STYLES] || BUTTON_STYLES.rounded;
    const animationClass = theme.buttonAnimation === 'pulse' ? 'animate-link-pulse' : '';
    
    return (
      <div className={`${buttonClass} ${animationClass} w-16 h-8 mx-auto mt-2 flex items-center justify-center bg-white/20 text-xs`}>
        Button
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="gallery" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="gallery">Theme Gallery</TabsTrigger>
          <TabsTrigger value="settings">Theme Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {THEME_OPTIONS.map((theme) => (
              <div
                key={theme.id}
                className={`
                  h-28 rounded-md border-2 cursor-pointer overflow-hidden
                  flex flex-col items-center justify-center relative
                  ${theme.previewClass}
                  ${currentThemeId === theme.id ? 'border-primary shadow-lg' : 'border-transparent'}
                `}
                onClick={() => onThemeChange(theme.id)}
              >
                <span className="text-xs font-medium text-white drop-shadow-md mb-1">
                  {theme.name}
                </span>
                
                {getButtonPreview(theme)}
                
                {currentThemeId === theme.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearCache}
              className="flex items-center gap-1"
            >
              <Refresh className="w-4 h-4" /> 
              Refresh Theme
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Button Styles</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(BUTTON_STYLES).map((style) => (
                  <div 
                    key={style}
                    className={`
                      border rounded p-2 cursor-pointer text-center text-xs
                      ${THEME_OPTIONS.find(t => t.id === currentThemeId)?.buttonStyle === style 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                    onClick={() => {
                      const currentTheme = THEME_OPTIONS.find(t => t.id === currentThemeId);
                      if (currentTheme) {
                        // In a real implementation, this would update both the existing theme and apply it
                        toast({
                          title: "Style Updated",
                          description: `Button style changed to ${style}`,
                        });
                      }
                    }}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Button Animations</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(BUTTON_ANIMATIONS).map((animation) => (
                  <div 
                    key={animation}
                    className={`
                      border rounded p-2 cursor-pointer text-center text-xs
                      ${THEME_OPTIONS.find(t => t.id === currentThemeId)?.buttonAnimation === animation 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                    onClick={() => {
                      const currentTheme = THEME_OPTIONS.find(t => t.id === currentThemeId);
                      if (currentTheme) {
                        // In a real implementation, this would update both the existing theme and apply it
                        toast({
                          title: "Animation Updated",
                          description: `Button animation changed to ${animation}`,
                        });
                      }
                    }}
                  >
                    {animation === 'none' ? 'None' : animation.charAt(0).toUpperCase() + animation.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

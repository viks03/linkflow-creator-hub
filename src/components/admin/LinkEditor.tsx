
import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LinkTypeSelector } from './LinkTypeSelector';
import { Link, LinkType } from '@/types';
import { AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface LinkEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: Partial<Link>) => void;
  link?: Link;
  isNew?: boolean;
}

export function LinkEditor({
  isOpen,
  onClose,
  onSave,
  link,
  isNew = false
}: LinkEditorProps) {
  const [formData, setFormData] = useState<Partial<Link>>({
    title: '',
    url: '',
    enabled: true,
    type: 'default',
    subtitle: '',
    pinned: false
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (link) {
      setFormData({
        id: link.id,
        title: link.title,
        url: link.url,
        enabled: link.enabled,
        order: link.order,
        type: link.type || 'default',
        subtitle: link.subtitle || '',
        pinned: link.pinned || false
      });
    } else {
      setFormData({
        title: '',
        url: '',
        enabled: true,
        type: 'default',
        subtitle: '',
        pinned: false
      });
    }
    
    setValidationErrors({});
  }, [link, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleLinkTypeChange = (type: LinkType) => {
    setFormData(prev => ({
      ...prev,
      type
    }));
    
    // Provide helpful suggestions based on link type
    if (type === 'youtube' && (!formData.url || !formData.url.includes('youtube'))) {
      toast({
        title: "YouTube Link Selected",
        description: "Please enter a valid YouTube URL. Viewers will be able to play the video directly from your profile.",
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      errors.title = 'Please enter a title';
    }
    
    if (!formData.url?.trim()) {
      errors.url = 'Please enter a URL';
    } else if (formData.type === 'youtube' && !isValidYoutubeUrl(formData.url)) {
      errors.url = 'Please enter a valid YouTube URL';
    } else if (formData.type === 'email' && !isValidEmail(formData.url)) {
      errors.url = 'Please enter a valid email address';
    } else if (!isValidUrl(formData.url) && formData.type !== 'email') {
      errors.url = 'Please enter a valid URL';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isValidUrl = (url: string) => {
    try {
      // For email links, we'll prepend mailto: if it's not there yet
      if (formData.type === 'email' && isValidEmail(url)) {
        return true;
      }
      
      // Check if the URL already has a protocol, if not prepend https://
      const urlToCheck = url.match(/^https?:\/\//) ? url : `https://${url}`;
      new URL(urlToCheck);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const isValidYoutubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Format URL based on link type
    let url = formData.url || '';
    
    if (formData.type === 'email' && !url.startsWith('mailto:')) {
      url = `mailto:${url}`;
    } else if (formData.type !== 'email' && !/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    
    onSave({ ...formData, url });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isNew ? 'Add New Link' : 'Edit Link'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. My YouTube Channel"
              value={formData.title}
              onChange={handleChange}
              className={validationErrors.title ? 'border-red-500' : ''}
            />
            {validationErrors.title && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {validationErrors.title}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Link Type</Label>
            <LinkTypeSelector 
              value={formData.type as LinkType} 
              onValueChange={handleLinkTypeChange} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">
              {formData.type === 'email' ? 'Email Address' : 
               formData.type === 'youtube' ? 'YouTube URL' : 'URL'}
            </Label>
            <Input
              id="url"
              name="url"
              placeholder={
                formData.type === 'email' ? 'e.g. contact@example.com' :
                formData.type === 'youtube' ? 'e.g. https://youtube.com/watch?v=...' :
                'e.g. https://example.com'
              }
              value={formData.url}
              onChange={handleChange}
              className={validationErrors.url ? 'border-red-500' : ''}
            />
            {validationErrors.url ? (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {validationErrors.url}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                {formData.type === 'youtube' 
                  ? 'YouTube videos will be playable directly on your profile' 
                  : 'URL will be validated and formatted automatically'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle (Optional)</Label>
            <Textarea
              id="subtitle"
              name="subtitle"
              placeholder="Add a short description"
              value={formData.subtitle}
              onChange={handleChange}
              rows={2}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              A short subtitle to display below the link title
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enabled" className="cursor-pointer">Enable this link</Label>
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => handleSwitchChange('enabled', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="pinned" className="cursor-pointer">Pin to top of profile</Label>
              <Switch
                id="pinned"
                checked={formData.pinned}
                onCheckedChange={(checked) => handleSwitchChange('pinned', checked)}
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


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
import { Label } from '@/components/ui/label';
import { Link } from '@/types';

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
    enabled: true
  });

  useEffect(() => {
    if (link) {
      setFormData({
        id: link.id,
        title: link.title,
        url: link.url,
        enabled: link.enabled,
        order: link.order
      });
    } else {
      setFormData({
        title: '',
        url: '',
        enabled: true
      });
    }
  }, [link, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title?.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!formData.url?.trim()) {
      alert('Please enter a URL');
      return;
    }
    
    // Ensure URL has http:// or https:// prefix
    let url = formData.url;
    if (!/^https?:\/\//i.test(url)) {
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              placeholder="e.g. https://youtube.com/username"
              value={formData.url}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500">
              URL will be validated and formatted automatically
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enabled"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="enabled">Enable this link</Label>
          </div>
          
          <DialogFooter>
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

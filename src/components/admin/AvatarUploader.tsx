
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Upload, Link as LinkIcon } from 'lucide-react';

interface AvatarUploaderProps {
  currentAvatar?: string;
  onAvatarChange: (avatarUrl: string) => void;
}

export function AvatarUploader({
  currentAvatar,
  onAvatarChange
}: AvatarUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onAvatarChange(urlInput);
      setIsOpen(false);
      setUrlInput('');
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onAvatarChange(event.target.result as string);
        setIsOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="mt-2"
      >
        Change Avatar
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('upload')}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload Image
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'url' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('url')}
            >
              <LinkIcon className="w-4 h-4 inline mr-2" />
              Image URL
            </button>
          </div>
          
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG or GIF (max. 5MB)
                </p>
              </div>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}
          
          {activeTab === 'url' && (
            <div className="space-y-4">
              <Input
                placeholder="Enter image URL"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Enter a direct URL to an image (JPG, PNG or GIF)
              </p>
              <Button onClick={handleUrlSubmit} className="w-full">
                Use This Image
              </Button>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

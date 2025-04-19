
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { ProfileBio } from '@/components/profile/ProfileBio';
import { LinkCollection } from '@/components/profile/LinkCollection';
import { LinkEditor } from '@/components/admin/LinkEditor';
import { AvatarUploader } from '@/components/admin/AvatarUploader';
import { ProfileThemePicker } from '@/components/profile/ProfileThemePicker';
import { QRCodeGenerator } from '@/components/profile/QRCodeGenerator';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editingLink, setEditingLink] = useState<Link | undefined>(undefined);
  const [isLinkEditorOpen, setIsLinkEditorOpen] = useState(false);
  const [isNewLink, setIsNewLink] = useState(false);
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const baseUrl = window.location.origin;
  const profileUrl = `${baseUrl}/${user.username}`;
  
  const handleBioUpdate = (newBio: string) => {
    updateUserProfile({ bio: newBio });
  };
  
  const handleAvatarChange = (newAvatar: string) => {
    updateUserProfile({ avatar: newAvatar });
  };
  
  const handleThemeChange = (themeId: string) => {
    updateUserProfile({
      theme: {
        ...user.theme,
        id: themeId
      }
    });
  };
  
  const handleAddLink = () => {
    setEditingLink(undefined);
    setIsNewLink(true);
    setIsLinkEditorOpen(true);
  };
  
  const handleEditLink = (linkId: string) => {
    const link = user.links.find(l => l.id === linkId);
    if (link) {
      setEditingLink(link);
      setIsNewLink(false);
      setIsLinkEditorOpen(true);
    }
  };
  
  const handleDeleteLink = (linkId: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      const updatedLinks = user.links.filter(l => l.id !== linkId);
      updateUserProfile({ links: updatedLinks });
      
      toast({
        title: "Link deleted",
        description: "The link has been removed from your profile"
      });
    }
  };
  
  const handleToggleLink = (linkId: string, enabled: boolean) => {
    const updatedLinks = user.links.map(link => 
      link.id === linkId ? { ...link, enabled } : link
    );
    
    updateUserProfile({ links: updatedLinks });
    
    toast({
      title: enabled ? "Link enabled" : "Link disabled",
      description: enabled 
        ? "The link is now visible on your profile" 
        : "The link is now hidden from your profile"
    });
  };
  
  const handleSaveLink = (linkData: Partial<Link>) => {
    let updatedLinks: Link[];
    
    if (isNewLink) {
      // Add new link
      const newLink: Link = {
        id: `link_${Date.now()}`,
        title: linkData.title || '',
        url: linkData.url || '',
        enabled: linkData.enabled !== undefined ? linkData.enabled : true,
        order: user.links.length + 1
      };
      
      updatedLinks = [...user.links, newLink];
      
      toast({
        title: "Link added",
        description: "Your new link has been added to your profile"
      });
    } else {
      // Update existing link
      updatedLinks = user.links.map(link => 
        link.id === linkData.id ? { ...link, ...linkData } : link
      );
      
      toast({
        title: "Link updated",
        description: "Your link has been updated"
      });
    }
    
    updateUserProfile({ links: updatedLinks });
    setIsLinkEditorOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <main className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar with preview */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Profile Preview</h2>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center">
                <ProfileAvatar 
                  src={user.avatar} 
                  username={user.username}
                  size="md"
                />
                <p className="mt-2 font-medium">@{user.username}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center line-clamp-2">
                  {user.bio || 'No bio yet'}
                </p>
                <div className="w-full mt-4">
                  {user.links.slice(0, 3).map(link => (
                    <div 
                      key={link.id}
                      className={`
                        w-full p-2 mb-2 text-sm rounded-md
                        ${link.enabled ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}
                      `}
                    >
                      {link.title}
                    </div>
                  ))}
                  {user.links.length > 3 && (
                    <p className="text-xs text-center text-gray-500">
                      +{user.links.length - 3} more links
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <QRCodeGenerator 
                  profileUrl={profileUrl} 
                  username={user.username}
                />
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full border-b">
                  <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                  <TabsTrigger value="links" className="flex-1">Links</TabsTrigger>
                  <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="profile" className="mt-0">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    
                    <div className="flex flex-col items-center mb-6">
                      <ProfileAvatar 
                        src={user.avatar} 
                        username={user.username}
                        size="lg"
                      />
                      <AvatarUploader 
                        currentAvatar={user.avatar}
                        onAvatarChange={handleAvatarChange}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">
                        Username
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          @
                        </span>
                        <input
                          type="text"
                          value={user.username}
                          readOnly
                          className="flex-1 focus:ring-primary focus:border-primary block min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-100"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Your profile URL: {profileUrl}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">
                        Bio
                      </label>
                      <ProfileBio 
                        bio={user.bio || ''} 
                        editable
                        onUpdate={handleBioUpdate}
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Tell visitors about yourself or your content
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="links" className="mt-0">
                    <h2 className="text-xl font-semibold mb-4">Manage Links</h2>
                    
                    <LinkCollection 
                      links={user.links}
                      editable
                      onAddLink={handleAddLink}
                      onEditLink={handleEditLink}
                      onDeleteLink={handleDeleteLink}
                      onToggleLink={handleToggleLink}
                    />
                    
                    <LinkEditor 
                      isOpen={isLinkEditorOpen}
                      onClose={() => setIsLinkEditorOpen(false)}
                      onSave={handleSaveLink}
                      link={editingLink}
                      isNew={isNewLink}
                    />
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="mt-0">
                    <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                    
                    <ProfileThemePicker 
                      currentThemeId={user.theme.id}
                      onThemeChange={handleThemeChange}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

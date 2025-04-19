
import { Link } from '@/types';
import { LinkItem } from './LinkItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface LinkCollectionProps {
  links: Link[];
  editable?: boolean;
  onAddLink?: () => void;
  onEditLink?: (id: string) => void;
  onDeleteLink?: (id: string) => void;
  onToggleLink?: (id: string, enabled: boolean) => void;
}

export function LinkCollection({
  links,
  editable = false,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onToggleLink
}: LinkCollectionProps) {
  const sortedLinks = [...links].sort((a, b) => a.order - b.order);
  
  const visibleLinks = editable 
    ? sortedLinks 
    : sortedLinks.filter(link => link.enabled);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {visibleLinks.map(link => (
        <LinkItem
          key={link.id}
          link={link}
          editable={editable}
          onEdit={onEditLink}
          onDelete={onDeleteLink}
          onToggle={onToggleLink}
        />
      ))}
      
      {editable && (
        <div className="w-full flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={onAddLink}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Link
          </Button>
        </div>
      )}
    </div>
  );
}

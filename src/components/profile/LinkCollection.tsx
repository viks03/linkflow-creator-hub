
import { useEffect, useRef } from 'react';
import { Link } from '@/types';
import { LinkItem } from './LinkItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Sortable from 'sortablejs';

interface LinkCollectionProps {
  links: Link[];
  editable?: boolean;
  onAddLink?: () => void;
  onEditLink?: (id: string) => void;
  onDeleteLink?: (id: string) => void;
  onToggleLink?: (id: string, enabled: boolean) => void;
  onPinLink?: (id: string, pinned: boolean) => void;
  onReorderLinks?: (links: Link[]) => void;
  buttonStyle?: string;
  animation?: string;
}

export function LinkCollection({
  links,
  editable = false,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onToggleLink,
  onPinLink,
  onReorderLinks,
  buttonStyle = 'rounded',
  animation = 'none'
}: LinkCollectionProps) {
  const linkListRef = useRef<HTMLDivElement>(null);
  const sortableRef = useRef<Sortable | null>(null);
  
  // Sort links by pinned status and then by order
  const sortedLinks = [...links].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return a.order - b.order;
  });
  
  const visibleLinks = editable 
    ? sortedLinks 
    : sortedLinks.filter(link => link.enabled);

  // Initialize sortable for drag and drop
  useEffect(() => {
    if (editable && linkListRef.current) {
      sortableRef.current = Sortable.create(linkListRef.current, {
        animation: 150,
        handle: '.cursor-move',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: (evt) => {
          const newLinks = [...links];
          const movedItem = newLinks.splice(evt.oldIndex as number, 1)[0];
          newLinks.splice(evt.newIndex as number, 0, movedItem);
          
          // Update order values
          const reorderedLinks = newLinks.map((link, index) => ({
            ...link,
            order: index + 1
          }));
          
          onReorderLinks?.(reorderedLinks);
        }
      });
      
      return () => {
        if (sortableRef.current) {
          sortableRef.current.destroy();
          sortableRef.current = null;
        }
      };
    }
  }, [editable, links, onReorderLinks]);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div ref={linkListRef}>
        {visibleLinks.map(link => (
          <LinkItem
            key={link.id}
            link={link}
            editable={editable}
            onEdit={onEditLink}
            onDelete={onDeleteLink}
            onToggle={onToggleLink}
            onPin={onPinLink}
            buttonStyle={buttonStyle}
            animation={animation}
          />
        ))}
      </div>
      
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

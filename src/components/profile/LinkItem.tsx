
import { useState } from 'react';
import { Link as LinkType } from '@/types';
import { cn } from '@/lib/utils';
import { Link, ExternalLink, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface LinkItemProps {
  link: LinkType;
  editable?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, enabled: boolean) => void;
}

export function LinkItem({ 
  link, 
  editable = false,
  onEdit,
  onDelete,
  onToggle
}: LinkItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    if (editable) {
      e.preventDefault();
    }
  };
  
  // Add analytics tracking (demo only)
  const trackClick = () => {
    if (!editable) {
      console.log(`Link clicked: ${link.title}`);
      // In a real app, this would send analytics data
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto mb-3 rounded-lg transition-all duration-300 link-item",
        !link.enabled && "opacity-50",
        editable && "border border-dashed border-gray-300 hover:border-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={link.enabled ? link.url : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          handleClick(e);
          trackClick();
        }}
        className={cn(
          "flex items-center px-4 py-3 rounded-lg font-medium",
          "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md",
          "text-gray-800 dark:text-white",
          "transition-all duration-200"
        )}
      >
        <Link className="w-5 h-5 mr-3" />
        <span className="flex-1">{link.title}</span>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </a>
      
      {editable && isHovered && (
        <div className="flex items-center justify-end mt-1 space-x-2 p-1">
          <button
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => onEdit?.(link.id)}
            title="Edit link"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => onDelete?.(link.id)}
            title="Delete link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <button
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => onToggle?.(link.id, !link.enabled)}
            title={link.enabled ? "Disable link" : "Enable link"}
          >
            {link.enabled ? (
              <ToggleRight className="w-4 h-4 text-green-500" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

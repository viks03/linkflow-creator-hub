
import { useState } from 'react';
import { Link as LinkType } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Link, 
  ExternalLink, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  Youtube,
  Move,
  Pin
} from 'lucide-react';
import { LINK_TYPE_CONFIG, BUTTON_STYLES } from '@/constants';

// Define the BUTTON_ANIMATIONS constant that we're using in the component
const BUTTON_ANIMATIONS = {
  'none': '',
  'pulse': 'animation-pulse',
  'bounce': 'animation-bounce',
  'glow': 'animation-glow',
  'slide': 'animation-slide'
};

interface LinkItemProps {
  link: LinkType;
  editable?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, enabled: boolean) => void;
  onPin?: (id: string, pinned: boolean) => void;
  buttonStyle?: string;
  animation?: string;
}

export function LinkItem({ 
  link, 
  editable = false,
  onEdit,
  onDelete,
  onToggle,
  onPin,
  buttonStyle = 'rounded',
  animation = 'none'
}: LinkItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    if (editable) {
      e.preventDefault();
      return;
    }
    
    // For YouTube links, toggle embed view instead of navigating
    if (link.type === 'youtube' && !expanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };
  
  // Get YouTube video ID from URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Add analytics tracking (demo only)
  const trackClick = () => {
    if (!editable) {
      console.log(`Link clicked: ${link.title} (${link.type})`);
      // In a real app, this would send analytics data
    }
  };

  // Get the button style classes
  const getButtonClasses = () => {
    const styleClass = BUTTON_STYLES[buttonStyle as keyof typeof BUTTON_STYLES] || BUTTON_STYLES.rounded;
    const animationClass = BUTTON_ANIMATIONS[animation as keyof typeof BUTTON_ANIMATIONS] || '';
    
    return cn(
      styleClass,
      animationClass,
      !link.enabled && "opacity-50",
      link.pinned && !editable && "link-pinned",
      link.type !== 'default' && !editable && `link-item-${link.type}`
    );
  };

  // Get the appropriate icon for the link type
  const LinkIcon = () => {
    if (link.type === 'youtube') {
      return <Youtube className="w-5 h-5 mr-3 text-red-500" />;
    }
    
    const linkTypeConfig = LINK_TYPE_CONFIG[link.type as keyof typeof LINK_TYPE_CONFIG] || LINK_TYPE_CONFIG.default;
    
    return <Link className="w-5 h-5 mr-3" />;
  };
  
  const showYoutubeEmbed = link.type === 'youtube' && expanded && !editable;
  const videoId = link.type === 'youtube' ? getYoutubeId(link.url) : null;

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto mb-3 transition-all duration-300 link-item",
        editable && "border border-dashed border-gray-300 hover:border-primary",
        // Add the 'group' class here to make group-hover work in child elements
        animation === 'slide' && "group"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showYoutubeEmbed && videoId && (
        <div className="youtube-embed-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      <a
        href={link.enabled ? link.url : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          handleClick(e);
          trackClick();
        }}
        className={cn(
          "flex flex-col px-4 py-3 font-medium",
          "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md",
          "text-gray-800 dark:text-white",
          "transition-all duration-200",
          getButtonClasses()
        )}
      >
        <div className="flex items-center w-full">
          <LinkIcon />
          <span className="flex-1">{link.title}</span>
          {!showYoutubeEmbed && <ExternalLink className="w-4 h-4 text-gray-400" />}
        </div>
        
        {link.subtitle && !editable && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">
            {link.subtitle}
          </p>
        )}
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
          
          <button
            className={`p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ${link.pinned ? 'text-amber-500 dark:text-amber-400' : ''}`}
            onClick={() => onPin?.(link.id, !link.pinned)}
            title={link.pinned ? "Unpin link" : "Pin link"}
          >
            <Pin className="w-4 h-4" />
          </button>
          
          <button
            className="p-1 text-gray-500 cursor-move hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Drag to reorder"
          >
            <Move className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}


import { useState, useEffect, useRef } from 'react';

interface ProfileBioProps {
  bio: string;
  editable?: boolean;
  onUpdate?: (bio: string) => void;
}

export function ProfileBio({ 
  bio, 
  editable = false,
  onUpdate 
}: ProfileBioProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(bio);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);
  
  const handleEdit = () => {
    if (!editable) return;
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setIsEditing(false);
    if (onUpdate) {
      onUpdate(content);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setContent(bio);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="mt-4 mb-6 w-full max-w-md mx-auto">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
          placeholder="Enter your bio..."
        />
        <div className="flex justify-end space-x-2 mt-2">
          <button 
            onClick={handleCancel}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-primary text-white hover:bg-primary/80 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`mt-4 mb-6 text-center max-w-md mx-auto ${editable ? 'cursor-pointer' : ''}`}
      onClick={handleEdit}
    >
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {content || (editable ? "Click to add a bio..." : "")}
      </p>
      {editable && !content && (
        <p className="text-sm text-gray-400 mt-1">Click to edit</p>
      )}
    </div>
  );
}

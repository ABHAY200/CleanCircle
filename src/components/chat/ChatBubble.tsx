import { useState } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import type { Message } from '@/types';
import { AppImage } from '@/components/common/AppImage';
import { formatRelativeTime, getInitials, cn } from '@/utils';

interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export function ChatBubble({ message, isOwn, senderName, senderAvatar }: ChatBubbleProps) {
  return (
    <div className={cn('flex gap-2', isOwn ? 'flex-row-reverse' : 'flex-row')}>
      {!isOwn && (
        senderAvatar ? (
          <AppImage src={senderAvatar} alt={senderName} className="h-8 w-8 rounded-full object-cover shrink-0" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-primary">
              {senderName ? getInitials(senderName.split(' ')[0], senderName.split(' ')[1] ?? '') : '?'}
            </span>
          </div>
        )
      )}
      <div className={cn('max-w-[70%]', isOwn ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm',
            isOwn
              ? 'bg-primary text-white rounded-br-md'
              : 'bg-gray-100 text-text rounded-bl-md'
          )}
        >
          {message.content}
        </div>
        <p className={cn('text-xs text-text-muted mt-1', isOwn ? 'text-right' : 'text-left')}>
          {formatRelativeTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

interface MessageInputProps {
  onSend: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({ onSend, placeholder = 'Type a message...', disabled }: MessageInputProps) {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim()) return;
    onSend(content.trim());
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t border-border p-4 bg-white">
      <button className="rounded-xl p-2.5 text-text-muted hover:bg-gray-100 transition-colors shrink-0">
        <ImageIcon className="h-5 w-5" />
      </button>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary max-h-32"
      />
      <button
        onClick={handleSend}
        disabled={!content.trim() || disabled}
        className="rounded-xl bg-primary p-2.5 text-white hover:bg-primary-dark transition-colors disabled:opacity-50 shrink-0"
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}

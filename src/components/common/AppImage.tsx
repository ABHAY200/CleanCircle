import { useState, type ImgHTMLAttributes } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/utils';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  showIconOnError?: boolean;
  /** Skip gray placeholder background — use for logos/icons with transparent PNGs */
  icon?: boolean;
}

export function AppImage({ className, onError, showIconOnError = false, icon = false, alt = '', ...props }: AppImageProps) {
  const bgClass = icon ? 'bg-transparent' : 'bg-gray-200';
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(bgClass, 'flex items-center justify-center', className)}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        {showIconOnError && <ImageIcon className="h-8 w-8 text-gray-400" aria-hidden />}
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={cn(bgClass, className)}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}

import { Loader2 } from 'lucide-react';
import { TEXT } from '@/constants/text';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };

export function Loader({ size = 'md', text, fullScreen }: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`${sizes[size]} animate-spin text-primary`} />
      {text && <p className="text-sm text-text-muted">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{content}</div>;
}

export function PageLoader() {
  return <Loader size="lg" text={TEXT.COMMON.LOADING} fullScreen />;
}

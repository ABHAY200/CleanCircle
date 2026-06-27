import { Link } from 'react-router-dom';
import { APP } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { IMAGES } from '@/constants/images';
import { cn } from '@/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  linkToHome?: boolean;
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
};

export function Logo({
  size = 'md',
  showText = true,
  className,
  imageClassName,
  textClassName,
  linkToHome = true,
}: LogoProps) {
  const content = (
    <>
      <img
        src={IMAGES.LOGO}
        alt={APP.NAME}
        className={cn(sizes[size], 'object-contain shrink-0 bg-transparent', imageClassName)}
      />
      {showText && (
        <span className={cn('font-bold text-lg text-text', textClassName)}>{APP.NAME}</span>
      )}
    </>
  );

  if (linkToHome) {
    return (
      <Link to={ROUTES.HOME} className={cn('flex items-center gap-2.5', className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn('flex items-center gap-2.5', className)}>{content}</div>;
}

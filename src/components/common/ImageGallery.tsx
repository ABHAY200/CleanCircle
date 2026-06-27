import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AppImage } from '@/components/common/AppImage';
import { cn } from '@/utils';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function ImageGallery({ images, alt = 'Gallery image', className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <div className={cn('space-y-3', className)}>
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-200">
          <AppImage
            src={images[activeIndex]}
            alt={alt}
            showIconOnError
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'shrink-0 rounded-lg overflow-hidden w-20 h-14 border-2 transition-colors bg-gray-200',
                  i === activeIndex ? 'border-primary' : 'border-transparent'
                )}
              >
                <AppImage src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <AppImage src={images[activeIndex]} alt={alt} showIconOnError className="max-w-full max-h-full object-contain rounded-lg bg-gray-200" />
        </div>
      )}
    </>
  );
}

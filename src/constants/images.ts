import logo from '@/assets/logo.png';

export const IMAGES = {
  LOGO: logo,
  HERO: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80',
  CLEANING_1: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80',
  CLEANING_2: 'https://images.unsplash.com/photo-1563453392210-326f2e47e3e4?w=800&q=80',
  CLEANING_3: 'https://images.unsplash.com/photo-1527515637462-cff94ee78516?w=800&q=80',
  CLEANING_4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  OFFICE: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  CAR: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80',
  AVATAR_PLACEHOLDER: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  BUSINESS_BANNER: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
  CTA: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1200&q=80',
  DEFAULT_SERVICE: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80',
  DEFAULT_CLEANER: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
} as const;

export const getServiceImage = (index: number): string => {
  const images = [
    IMAGES.CLEANING_1,
    IMAGES.CLEANING_2,
    IMAGES.CLEANING_3,
    IMAGES.CLEANING_4,
    IMAGES.OFFICE,
    IMAGES.CAR,
  ];
  return images[index % images.length];
};

export const getAvatarImage = (seed: number): string => {
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  ];
  return avatars[seed % avatars.length];
};

export const getCleanerBanner = (seed: number): string => {
  const banners = [
    IMAGES.BUSINESS_BANNER,
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=80',
  ];
  return banners[seed % banners.length];
};

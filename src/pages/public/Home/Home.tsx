import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Award, Star, HeadphonesIcon } from 'lucide-react';
import { APP } from '@/constants/app';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { IMAGES } from '@/constants/images';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { CleanerCard } from '@/components/cards/CleanerCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Button } from '@/components/buttons/Button';
import { useAppSelector } from '@/redux/hooks';
import { selectCategories, selectFeaturedServices } from '@/redux/services/servicesSlice';
import { selectFeaturedCleaners } from '@/redux/cleaner/cleanerSlice';
import { AppImage } from '@/components/common/AppImage';

const whyIcons = [Shield, Award, Star, HeadphonesIcon];
const whyItems = Object.values(TEXT.HOME.WHY_ITEMS);

const testimonials = [
  { name: 'Sarah M.', city: 'Toronto, ON', text: 'Found an amazing cleaner within minutes. The whole process was seamless and professional.', rating: 5 },
  { name: 'James L.', city: 'Vancouver, BC', text: 'CleanerCircle made it so easy to compare cleaners and book the perfect service for our office.', rating: 5 },
  { name: 'Emily R.', city: 'Calgary, AB', text: 'The quality of cleaners on this platform is outstanding. Highly recommend to anyone!', rating: 5 },
];

export function Home() {
  const categories = useAppSelector(selectCategories).slice(0, 8);
  const featuredCleaners = useAppSelector(selectFeaturedCleaners);
  const featuredServices = useAppSelector(selectFeaturedServices);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[480px] sm:min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-gray-200">
          <AppImage src={IMAGES.HERO} alt="Cleaning service" showIconOnError className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block rounded-full bg-primary/20 text-primary-light px-4 py-1.5 text-sm font-medium mb-4 backdrop-blur-sm border border-primary/30">
              {APP.COUNTRY}&apos;s #1 Cleaning Marketplace
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {TEXT.HOME.HERO_TITLE}
            </h1>
            <p className="text-lg text-gray-200 mt-4 leading-relaxed">
              {TEXT.HOME.HERO_SUBTITLE}
            </p>
            <div className="mt-8">
              <SearchBar size="lg" showLocation className="max-w-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text">{TEXT.HOME.POPULAR_CATEGORIES}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cleaners */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text">{TEXT.HOME.FEATURED_CLEANERS}</h2>
            <Link to={ROUTES.SEARCH}>
              <Button variant="outline">{TEXT.COMMON.VIEW_ALL}</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCleaners.slice(0, 4).map((cleaner) => (
              <CleanerCard key={cleaner.id} cleaner={cleaner} showFavorite />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text">Popular Services</h2>
            <Link to={ROUTES.SEARCH}>
              <Button variant="outline">{TEXT.COMMON.VIEW_ALL}</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text">{TEXT.HOME.WHY_CHOOSE_US}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <motion.div
                  key={item.TITLE}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white p-6 border border-border text-center"
                >
                  <div className="inline-flex rounded-2xl bg-primary/10 p-4 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text mb-2">{item.TITLE}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.DESC}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text">{TEXT.HOME.TESTIMONIALS}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-white p-6 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-medium text-text text-sm">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gray-200">
          <AppImage src={IMAGES.CTA} alt="CTA" showIconOnError className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{TEXT.HOME.CTA_TITLE}</h2>
          <p className="text-lg text-blue-100 mt-4">{TEXT.HOME.CTA_SUBTITLE}</p>
          <Link to={ROUTES.REGISTER} className="inline-block mt-8">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              {TEXT.HOME.CTA_BUTTON}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

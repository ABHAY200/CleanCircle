import { Link } from 'react-router-dom';
import { Share2, Globe, Mail, MessageCircle } from 'lucide-react';
import { APP } from '@/constants/app';
import { TEXT } from '@/constants/text';
import { ROUTES } from '@/constants/routes';
import { Logo } from '@/components/common/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo size="sm" textClassName="text-white" className="mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">{TEXT.FOOTER.DESCRIPTION}</p>
            <div className="flex gap-3 mt-4">
              {[Share2, Globe, Mail, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{TEXT.FOOTER.QUICK_LINKS}</h4>
            <ul className="space-y-2">
              {[TEXT.FOOTER.LINKS.ABOUT, TEXT.FOOTER.LINKS.HOW_IT_WORKS, TEXT.FOOTER.LINKS.CAREERS, TEXT.FOOTER.LINKS.BLOG].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{TEXT.FOOTER.FOR_CLEANERS}</h4>
            <ul className="space-y-2">
              {[TEXT.FOOTER.LINKS.JOIN, TEXT.FOOTER.LINKS.PRICING, TEXT.FOOTER.LINKS.RESOURCES].map((link) => (
                <li key={link}>
                  <Link to={ROUTES.REGISTER} className="text-sm text-gray-400 hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{TEXT.FOOTER.SUPPORT}</h4>
            <ul className="space-y-2">
              {[TEXT.FOOTER.LINKS.HELP, TEXT.FOOTER.LINKS.CONTACT, TEXT.FOOTER.LINKS.FAQ].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} {APP.NAME}. {TEXT.FOOTER.COPYRIGHT.split('©')[1]?.trim() ?? 'All rights reserved.'}
          </p>
          <div className="flex gap-4">
            {[TEXT.FOOTER.LINKS.TERMS, TEXT.FOOTER.LINKS.PRIVACY, TEXT.FOOTER.LINKS.COOKIES].map((link) => (
              <a key={link} href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

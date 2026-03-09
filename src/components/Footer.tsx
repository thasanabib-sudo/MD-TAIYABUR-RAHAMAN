import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Mail, Phone, MapPin, Heart, Instagram, Send, MessageCircle, Globe } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const [links, setLinks] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/links')
      .then(res => res.json())
      .then(data => setLinks(data));
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook': return <Facebook size={20} />;
      case 'instagram': return <Instagram size={20} />;
      case 'send': return <Send size={20} />;
      case 'message-circle': return <MessageCircle size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <footer className="bg-indigo-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <span className="text-3xl font-bold">TA.</span>
            <p className="text-indigo-200 text-sm leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title={link.platform}
                >
                  {getIcon(link.icon)}
                </a>
              ))}
              <a href="mailto:tahsanabib@gmail.com" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer_quick_links')}</h4>
            <ul className="space-y-4 text-sm text-indigo-200">
              <li><a href="#home" className="hover:text-white transition-colors">{t('nav_home')}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t('nav_about')}</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">{t('nav_portfolio')}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t('nav_contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer_services')}</h4>
            <ul className="space-y-4 text-sm text-indigo-200">
              <li>{t('service_graphic')}</li>
              <li>{t('service_printing')}</li>
              <li>{t('service_video')}</li>
              <li>{t('service_content')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t('footer_contact_info')}</h4>
            <ul className="space-y-4 text-sm text-indigo-200">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-indigo-400" />
                <span>{t('current_address_val')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-indigo-400" />
                <span>+880 1779-036017</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-indigo-400" />
                <span>tahsanabib@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-indigo-300">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Tahsan Abib. Made with <Heart size={14} className="text-red-400 fill-red-400" /> for the Nation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

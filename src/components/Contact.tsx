import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Phone, Facebook, Mail, Send, MessageCircle, Instagram, Globe } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const [links, setLinks] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/links')
      .then(res => res.json())
      .then(data => setLinks(data));
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook': return <Facebook size={24} />;
      case 'instagram': return <Instagram size={24} />;
      case 'send': return <Send size={24} />;
      case 'message-circle': return <MessageCircle size={24} />;
      default: return <Globe size={24} />;
    }
  };

  const getBgColor = (iconName: string) => {
    switch (iconName) {
      case 'facebook': return 'bg-blue-50 border-blue-100 text-blue-600';
      case 'instagram': return 'bg-pink-50 border-pink-100 text-pink-600';
      case 'send': return 'bg-sky-50 border-sky-100 text-sky-600';
      case 'message-circle': return 'bg-green-50 border-green-100 text-green-600';
      default: return 'bg-gray-50 border-gray-100 text-gray-600';
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case 'facebook': return 'bg-blue-600';
      case 'instagram': return 'bg-pink-600';
      case 'send': return 'bg-sky-600';
      case 'message-circle': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('nav_contact')}</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900">{t('contact_get_in_touch')}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('contact_desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-4 p-6 rounded-2xl border transition-all group hover:shadow-lg ${getBgColor(link.icon)}`}
                >
                  <div className={`p-3 text-white rounded-xl group-hover:scale-110 transition-transform ${getIconBg(link.icon)}`}>
                    {getIcon(link.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{link.platform}</h4>
                    <p className="text-sm font-medium opacity-80">
                      {link.icon === 'message-circle' ? t('contact_chat_now') : t('contact_follow_me')}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-black/5">
                <Mail className="text-indigo-600" size={20} />
                <span className="text-gray-700">tahsanabib@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-black/5">
                <Phone className="text-indigo-600" size={20} />
                <span className="text-gray-700">+880 1779-036017</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-3xl border border-black/5 shadow-sm"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_name')}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder={t('form_name_placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder={t('form_email_placeholder')}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_subject')}</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder={t('form_subject_placeholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('form_message')}</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder={t('form_message_placeholder')}
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100"
              >
                <span>{t('form_submit')}</span>
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

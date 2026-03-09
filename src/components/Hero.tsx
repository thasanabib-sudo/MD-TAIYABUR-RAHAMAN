import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Briefcase } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
              {t('hero_welcome')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
              {t('name')}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-600 font-medium mb-8">
              {t('title')}
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              {t('intro')}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="flex items-center space-x-2 px-8 py-4 bg-indigo-900 text-white rounded-xl font-semibold hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-200"
              >
                <span>{t('btn_view_portfolio')}</span>
                <Briefcase size={20} />
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-2 px-8 py-4 bg-white text-indigo-900 border-2 border-indigo-900 rounded-xl font-semibold hover:bg-indigo-50 transition-all"
              >
                <span>{t('btn_contact_me')}</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-2xl relative z-10 border-8 border-white">
              <img
                src="https://picsum.photos/seed/tahsan/800/800"
                alt="Tahsan Abib"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600 rounded-2xl -z-0 rotate-12" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full -z-0 opacity-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

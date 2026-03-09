import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('nav_portfolio')}</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {['all', 'graphic', 'printing', 'social', 'video'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-indigo-900 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t(`filter_${f}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  rotateY: 10, 
                  rotateX: -5, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-2xl transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.url || 'https://picsum.photos/seed/work/800/450'}
                    alt={item.title_en}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">
                    {item.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'en' ? item.title_en : item.title_bn}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {language === 'en' ? item.desc_en : item.desc_bn}
                  </p>
                  <button className="flex items-center space-x-2 text-indigo-600 font-bold text-sm hover:text-indigo-800 transition-colors">
                    <span>{t('view_project')}</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <div className="text-center py-12 text-gray-500 italic">
            {t('no_portfolio_items')}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;

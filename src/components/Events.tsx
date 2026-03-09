import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const Events = () => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('nav_events')}</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row gap-8 items-center bg-gray-50 rounded-3xl p-8 border border-black/5"
            >
              <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={JSON.parse(event.images)[0] || 'https://picsum.photos/seed/event/800/450'}
                  alt={event.title_en}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center space-x-4 text-sm font-semibold text-indigo-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {format(new Date(event.date), 'MMMM dd, yyyy')}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {language === 'en' ? event.title_en : event.title_bn}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en' ? event.desc_en : event.desc_bn}
                </p>
                <button className="flex items-center space-x-2 px-6 py-3 bg-indigo-900 text-white rounded-xl font-bold hover:bg-indigo-800 transition-all">
                  <span>{t('view_event_details')}</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12 text-gray-500 italic">
            {t('no_events_found')}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;

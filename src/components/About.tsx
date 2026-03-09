import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, Target } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('nav_about')}</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about_who_am_i')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('bio')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-black/5">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('about_location')}</h4>
                  <p className="text-sm text-gray-600">{t('current_address_val')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-black/5">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('about_mission')}</h4>
                  <p className="text-sm text-gray-600">{t('mission')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-indigo-900 p-10 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap size={28} />
                {t('nav_education')}
              </h3>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-indigo-400">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-400 rounded-full" />
                  <h4 className="text-xl font-bold">BSc in Computer Science and Engineering</h4>
                  <p className="text-indigo-200">Sonargaon University, Dhaka</p>
                  <p className="text-sm mt-2 opacity-70">Present</p>
                </div>
                <div className="relative pl-8 border-l-2 border-indigo-400">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-400 rounded-full" />
                  <h4 className="text-xl font-bold">HSC (Batch 2023)</h4>
                  <p className="text-indigo-200">Science Group</p>
                </div>
                <div className="relative pl-8 border-l-2 border-indigo-400">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-400 rounded-full" />
                  <h4 className="text-xl font-bold">SSC (Batch 2021)</h4>
                  <p className="text-indigo-200">Science Group</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Monitor, Palette, Printer, Code, Database, Cpu, Share2, Video } from 'lucide-react';

const Skills = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'Computer Operation', icon: <Monitor />, level: 95 },
    { name: 'Graphic Design', icon: <Palette />, level: 90 },
    { name: 'Printing Design', icon: <Printer />, level: 85 },
    { name: 'C++ Programming', icon: <Code />, level: 80 },
    { name: 'OOP', icon: <Database />, level: 75 },
    { name: 'AI Prompt Engineering', icon: <Cpu />, level: 90 },
    { name: 'Social Media Content', icon: <Share2 />, level: 85 },
    { name: 'Video Creation', icon: <Video />, level: 80 },
  ];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('nav_skills')}</h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                rotateY: 15, 
                rotateX: -10, 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="p-6 bg-gray-50 rounded-2xl border border-black/5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all group"
            >
              <div className="w-12 h-12 bg-white text-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {skill.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-3">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-indigo-600 h-2 rounded-full"
                />
              </div>
              <span className="text-xs text-gray-500 mt-2 block text-right font-medium">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

import React from 'react';
import FeatureCard from './FeatureCard';
import { featuresData } from '../../data/featuresData';
import { motion } from 'framer-motion';

export default function FeaturesSection(): JSX.Element {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 mb-8">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Powerful Features for Coaches
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Designed for football coaches at any level, from grassroots to professional, 
          Football Subs helps you focus on coaching while we handle the substitution logistics.
        </p>
      </motion.div>
    </section>
  );
}
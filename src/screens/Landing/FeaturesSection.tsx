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
    <section className="w-full max-w-7xl mx-auto px-4 py-16 mb-8 relative" id="features">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-600/10 rounded-full filter blur-[90px] -z-10"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[110px] -z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[80px] -z-10"></div>
      
      <motion.h2 
        className="text-3xl md:text-5xl font-bold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="relative inline-block">
          Powerful Features 
          <motion.span 
            className="absolute -bottom-2 left-0 w-full h-1 bg-blue-400/50 rounded-full"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </span>
        {" "}for Coaches
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center mt-16 lg:mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-blue-50 text-lg max-w-2xl mx-auto leading-relaxed">
          Designed for football coaches at any level, from grassroots to professional, 
          Football Subs helps you focus on coaching while we handle the substitution logistics.
        </p>
        
        {/* Enhanced testimonial-style element */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm p-7 rounded-xl max-w-3xl mx-auto border border-white/10 shadow-xl">
          <svg className="w-10 h-10 text-blue-300/70 mx-auto mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-lg text-blue-50 italic">
            "Football Subs has transformed how I manage my youth team. I can focus on coaching, not juggling substitutions on paper."
          </p>
          <p className="mt-4 text-blue-200 font-medium">— Youth Coach, Manchester</p>
        </div>
      </motion.div>
    </section>
  );
}
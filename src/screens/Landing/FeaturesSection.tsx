import React from 'react';
import FeatureCard from './FeatureCard';
import { featuresData } from '../../data/featuresData';

export default function FeaturesSection(): JSX.Element {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 mb-8 animate-fadeIn" style={{ animationDelay: '1s' }}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
        Powerful Features for Coaches
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
      
      <div className="text-center mt-16">
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Designed for football coaches at any level, from grassroots to professional, 
          Football Subs helps you focus on coaching while we handle the substitution logistics.
        </p>
      </div>
    </section>
  );
}
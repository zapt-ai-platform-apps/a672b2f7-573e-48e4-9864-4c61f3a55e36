import React from 'react';
import { Feature } from '../../data/featuresData';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps): JSX.Element {
  return (
    <div 
      key={feature.id}
      className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/15 group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-white/10 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors duration-300">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-indigo-200 transition-colors">
          {feature.title}
        </h3>
        <p className="text-blue-100 group-hover:text-white transition-colors">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
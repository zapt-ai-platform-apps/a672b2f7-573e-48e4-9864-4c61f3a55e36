import React from 'react';

export default function FeaturesSection(): JSX.Element {
  return (
    <section className="py-20 bg-white rounded-lg shadow-md mx-4 my-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">Feature One</h3>
            <p className="text-gray-600 mt-2">
              Experience the best performance with our cutting-edge feature.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">Feature Two</h3>
            <p className="text-gray-600 mt-2">
              Enhance your workflow with seamless integration and great usability.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">Feature Three</h3>
            <p className="text-gray-600 mt-2">
              Get the flexibility you need with customizable settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
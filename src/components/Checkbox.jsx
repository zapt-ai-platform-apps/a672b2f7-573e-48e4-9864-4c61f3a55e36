import React from 'react';

function Checkbox({ checked, onChange }) {
  return (
    <div className="relative w-6 h-6">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
      />
      <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
        {checked && (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default Checkbox;
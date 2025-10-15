
import React from 'react';
import { GenerationType } from '../types';
import { WeddingIcon, BabyIcon, LocationIcon } from './icons/OptionIcons';

interface OptionSelectorProps {
  selectedType: GenerationType | null;
  onSelectType: (type: GenerationType) => void;
}

const options = [
  { type: GenerationType.Wedding, label: 'Wedding Photo', icon: <WeddingIcon className="w-12 h-12 mb-2"/>, description: "Create a beautiful wedding photo." },
  { type: GenerationType.Baby, label: 'Future Baby', icon: <BabyIcon className="w-12 h-12 mb-2"/>, description: "Imagine your future little one." },
  { type: GenerationType.Location, label: 'Couple at Location', icon: <LocationIcon className="w-12 h-12 mb-2"/>, description: "Place yourselves in a scenic spot." },
];

const OptionSelector: React.FC<OptionSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {options.map((option) => (
        <button
          key={option.type}
          onClick={() => onSelectType(option.type)}
          className={`p-6 text-center bg-white/5 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:bg-white/10 ${
            selectedType === option.type ? 'border-pink-500 scale-105 bg-white/10' : 'border-transparent'
          }`}
        >
          <div className="flex justify-center text-purple-300">{option.icon}</div>
          <h3 className="text-lg font-semibold">{option.label}</h3>
          <p className="text-sm text-gray-300">{option.description}</p>
        </button>
      ))}
    </div>
  );
};

export default OptionSelector;


import React from 'react';
import { LOCATIONS } from '../constants';

interface LocationSelectorProps {
  selectedLocation: string | null;
  onSelectLocation: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedLocation, onSelectLocation }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {LOCATIONS.map((location) => (
        <button
          key={location}
          onClick={() => onSelectLocation(location)}
          className={`p-3 text-center text-sm font-medium rounded-lg transition-all duration-200 ${
            selectedLocation === location
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {location}
        </button>
      ))}
    </div>
  );
};

export default LocationSelector;

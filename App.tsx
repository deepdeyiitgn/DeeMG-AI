
import React, { useState, useMemo } from 'react';
import { GenerationType, ImageFile } from './types';
import { LOCATIONS } from './constants';
import { generateImage } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import OptionSelector from './components/OptionSelector';
import LocationSelector from './components/LocationSelector';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [person1Image, setPerson1Image] = useState<ImageFile | null>(null);
  const [person2Image, setPerson2Image] = useState<ImageFile | null>(null);
  const [generationType, setGenerationType] = useState<GenerationType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isReadyToGenerate = useMemo(() => {
    if (!person1Image || !person2Image || !generationType) return false;
    if (generationType === GenerationType.Location && !selectedLocation) return false;
    return true;
  }, [person1Image, person2Image, generationType, selectedLocation]);

  const handleGenerate = async () => {
    if (!isReadyToGenerate || !person1Image || !person2Image || !generationType) return;

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const result = await generateImage(
        person1Image,
        person2Image,
        generationType,
        generationType === GenerationType.Location ? selectedLocation! : undefined
      );
      setGeneratedImage(`data:image/png;base64,${result}`);
    } catch (err) {
      console.error(err);
      setError('Failed to generate image. Please check the console for details and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setPerson1Image(null);
    setPerson2Image(null);
    setGenerationType(null);
    setSelectedLocation(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            DeeMG-AI
          </h1>
          <p className="text-gray-300 mt-2 text-lg">Your AI-Powered Couple Image Generator</p>
        </header>

        <main className="space-y-12">
          {!generatedImage && !isLoading && (
             <div className="space-y-10">
                {/* Step 1: Image Upload */}
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Step 1: Upload Your Photos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUploader label="Your Photo" onImageUpload={setPerson1Image} currentImage={person1Image} />
                        <ImageUploader label="Your Partner's Photo" onImageUpload={setPerson2Image} currentImage={person2Image} />
                    </div>
                </div>

                {/* Step 2: Choose Generation Type */}
                {person1Image && person2Image && (
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Step 2: Choose Your Creation</h2>
                        <OptionSelector selectedType={generationType} onSelectType={setGenerationType} />
                    </div>
                )}

                {/* Step 3: Select Location (Conditional) */}
                {generationType === GenerationType.Location && (
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Step 3: Select a Location</h2>
                        <LocationSelector selectedLocation={selectedLocation} onSelectLocation={setSelectedLocation} />
                    </div>
                )}

                {/* Generate Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleGenerate}
                        disabled={!isReadyToGenerate || isLoading}
                        className="px-8 py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg transform hover:scale-105"
                    >
                        Generate Your Image
                    </button>
                </div>
             </div>
          )}

          <ResultDisplay
            isLoading={isLoading}
            generatedImage={generatedImage}
            error={error}
            onReset={handleReset}
          />
        </main>

        <footer className="text-center text-gray-400 mt-12 text-sm">
            <p>Powered by Google Gemini. Images are AI-generated and may not be perfect.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

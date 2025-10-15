
import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
  onReset: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-pink-500 rounded-full animate-spin"></div>
      </div>
      <h3 className="text-2xl font-semibold mt-6">Generating Your Masterpiece...</h3>
      <p className="text-gray-300 mt-2">The AI is working its magic. This can take a moment.</p>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error, onReset }) => {
  if (!isLoading && !generatedImage && !error) {
    return null;
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 min-h-[300px] flex flex-col justify-center items-center">
      {isLoading && <LoadingSpinner />}
      
      {error && !isLoading && (
        <div className="text-center text-red-400">
          <h3 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h3>
          <p>{error}</p>
          <button
            onClick={onReset}
            className="mt-6 px-6 py-2 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {generatedImage && !isLoading && (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Creation is Ready!</h2>
          <div className="max-w-xl w-full aspect-square rounded-lg shadow-2xl overflow-hidden mb-6">
            <img src={generatedImage} alt="AI generated couple" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={generatedImage}
              download="deemg-ai-creation.png"
              className="px-6 py-3 text-center font-bold text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              Download Image
            </a>
            <button
              onClick={onReset}
              className="px-6 py-3 font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-full transition-colors"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;

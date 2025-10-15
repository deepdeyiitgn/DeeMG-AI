
import React, { useRef, useState } from 'react';
import { ImageFile } from '../types';
import { UploadIcon } from './icons/SharedIcons';

interface ImageUploaderProps {
  label: string;
  onImageUpload: (file: ImageFile | null) => void;
  currentImage: ImageFile | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onImageUpload, currentImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (base64) {
        onImageUpload({ base64, mimeType: file.type });
      }
    };
    reader.onerror = () => {
      console.error('Error reading file');
      onImageUpload(null);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <label className="text-lg font-medium mb-2 text-gray-200">{label}</label>
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full aspect-square bg-white/5 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-pink-500 bg-pink-500/10' : 'border-gray-500 hover:border-purple-400'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {currentImage ? (
          <img
            src={`data:${currentImage.mimeType};base64,${currentImage.base64}`}
            alt={label}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="text-center text-gray-400 p-4">
            <UploadIcon className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Click to upload</p>
            <p className="text-sm">or drag and drop</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

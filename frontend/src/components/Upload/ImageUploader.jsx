import { useState, useCallback } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ImageUploader = ({ onImageSelect, selectedImage }) => {
  const { t } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onImageSelect(files[0]);
    }
  }, [onImageSelect]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const clearImage = () => {
    onImageSelect(null);
  };

  if (selectedImage) {
    const imageUrl = URL.createObjectURL(selectedImage);
    return (
      <div className="relative rounded-xl overflow-hidden border-2 border-agri-300 bg-agri-50">
        <img
          src={imageUrl}
          alt="Soil health card"
          className="w-full h-64 object-contain"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={clearImage}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-sm font-medium">{selectedImage.name}</p>
          <p className="text-white/70 text-xs">
            {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
        isDragOver
          ? 'border-agri-500 bg-agri-50'
          : 'border-agri-200 bg-white hover:border-agri-400 hover:bg-agri-50/50'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-3">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
          isDragOver ? 'bg-agri-100' : 'bg-agri-50'
        }`}>
          {isDragOver ? (
            <Upload className="w-7 h-7 text-agri-600" />
          ) : (
            <FileImage className="w-7 h-7 text-agri-500" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-agri-800">
            {isDragOver ? t('dragDrop') : t('uploadSoilCard')}
          </p>
          <p className="text-xs text-agri-500 mt-1">
            {t('dragDrop')}
          </p>
        </div>
        <p className="text-xs text-agri-400">
          {t('supports')}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;

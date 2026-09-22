import React, { useCallback, DragEvent } from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  image: ImageFile | null;
  setImage: (image: ImageFile | null) => void;
  title: string;
  icon: React.ReactNode;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage, title, icon }) => {

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImage({ file, preview: URL.createObjectURL(file) });
      }
    }
  }, [setImage]);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-sky-500', 'bg-sky-50');
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border-sky-500', 'bg-sky-50');
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-sky-500', 'bg-sky-50');
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  }, [handleFileChange]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div 
        className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 relative transition-all duration-300"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {image ? (
          <>
            <img src={image.preview} alt="Preview" className="w-full h-full object-contain rounded-xl p-2" />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
              X
            </button>
          </>
        ) : (
          <label htmlFor={`file-upload-${title}`} className="cursor-pointer text-center flex flex-col items-center">
            {icon}
            <span className="mt-2">اسحب الصورة إلى هنا أو انقر للرفع</span>
            <input id={`file-upload-${title}`} type="file" className="hidden" accept="image/*" onChange={onInputChange} />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

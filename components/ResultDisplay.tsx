import React from 'react';
import { DownloadIcon, ResetIcon } from './Icons';

interface ResultDisplayProps {
  originalImage: string;
  resultImage: string;
  message: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, resultImage, message, onReset }) => {
  return (
    <div className="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in">
      <p className="text-2xl font-bold text-center text-green-700 mb-6">{message}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">قبل</h3>
          <img src={originalImage} alt="Original" className="rounded-lg shadow-md w-full h-auto max-h-96 object-contain" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">بعد</h3>
          <img src={resultImage} alt="Edited" className="rounded-lg shadow-md w-full h-auto max-h-96 object-contain animate-glow" />
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <a
          href={resultImage}
          download="edited-image.png"
          className="flex items-center justify-center gap-3 px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <DownloadIcon />
          <span>تحميل الصورة</span>
        </a>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-3 px-8 py-3 bg-gray-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
        >
          <ResetIcon />
          <span>البدء من جديد</span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 1); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;

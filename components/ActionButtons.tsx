import React from 'react';
import { MagicIcon } from './Icons';

interface ActionButtonsProps {
  isLoading: boolean;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isLoading, onSubmit, isSubmitDisabled }) => {
  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={onSubmit}
        disabled={isSubmitDisabled || isLoading}
        className="flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isLoading ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>جاري المعالجة...</span>
          </>
        ) : (
          <>
            <MagicIcon />
            <span>نفذ التعديل</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;

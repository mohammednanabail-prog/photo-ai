import React from 'react';
import { MagicIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
          محرر الصور السحري
        </h1>
        <div className="text-4xl md:text-5xl text-indigo-500">
            <MagicIcon />
        </div>
      </div>
      <p className="text-gray-600 mt-2 text-lg">
        حوّل صورك بأوامر بسيطة باللغة العربية
      </p>
    </header>
  );
};

export default Header;

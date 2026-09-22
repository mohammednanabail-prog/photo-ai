import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-4 mt-8">
      <p 
        className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black"
        style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
      >
        تصميم: مُـحَـمَّـد نبيل السحيقي
      </p>
    </footer>
  );
};

export default Footer;

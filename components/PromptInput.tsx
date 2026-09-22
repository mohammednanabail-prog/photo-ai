import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="mt-6">
      <label htmlFor="prompt" className="block text-xl font-bold text-center text-gray-800 mb-3">اكتب تعليماتك هنا</label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="مثال: غير لون القميص إلى الأزرق وأضف نظارة شمسية..."
        className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 resize-none"
        rows={3}
      />
    </div>
  );
};

export default PromptInput;

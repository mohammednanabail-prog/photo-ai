import React, { useState, useCallback } from 'react';
import { ImageFile, AppState } from './types';
import { editImageWithPrompt } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ActionButtons from './components/ActionButtons';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import Header from './components/Header';
import { UploadIcon } from './components/Icons';

const App: React.FC = () => {
  const [image1, setImage1] = useState<ImageFile | null>(null);
  const [image2, setImage2] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [appState, setAppState] = useState<AppState>(AppState.Initial);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleReset = useCallback(() => {
    setImage1(null);
    setImage2(null);
    setPrompt('');
    setAppState(AppState.Initial);
    setResultImage(null);
    setResultText('');
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!image1 || !prompt) {
      setError('يرجى رفع صورة واحدة على الأقل وكتابة التعليمات.');
      return;
    }
    setAppState(AppState.Loading);
    setError(null);

    try {
      const { editedImageB64, text } = await editImageWithPrompt(prompt, image1, image2);
      if (editedImageB64) {
        setResultImage(`data:image/png;base64,${editedImageB64}`);
        setResultText(text || '✅ تم تعديل الصورة حسب طلبك');
        setAppState(AppState.Result);
      } else {
        throw new Error('لم يتمكن الذكاء الاصطناعي من إنشاء صورة. قد يكون السبب هو سياسات الأمان.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع.';
      setError(`خطأ: ${errorMessage}`);
      setAppState(AppState.Error);
    }
  }, [image1, image2, prompt]);

  const showInitialState = appState === AppState.Initial || appState === AppState.Error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 text-gray-800 flex flex-col items-center justify-between p-4 selection:bg-sky-300 selection:text-sky-900">
      <Header />
      
      <main className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-grow">
        {showInitialState && (
          <div className="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUploader image={image1} setImage={setImage1} title="الصورة الأساسية" icon={<UploadIcon />} />
              <ImageUploader image={image2} setImage={setImage2} title="الصورة الثانية (للدمج)" icon={<UploadIcon />} />
            </div>
            <PromptInput prompt={prompt} setPrompt={setPrompt} />
            {error && <p className="text-red-600 text-center my-4 font-semibold">{error}</p>}
            <ActionButtons
              // FIX: The comparison `appState === AppState.Loading` is always false in this rendering context, causing a type error.
              isLoading={false}
              onSubmit={handleSubmit}
              isSubmitDisabled={!image1 || !prompt}
            />
          </div>
        )}

        {appState === AppState.Loading && (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-500"></div>
                <p className="mt-4 text-xl font-semibold text-sky-800">جاري تنفيذ التعديلات...</p>
                <p className="text-gray-600">قد تستغرق هذه العملية بضع لحظات</p>
            </div>
        )}

        {appState === AppState.Result && image1 && resultImage && (
          <ResultDisplay
            originalImage={image1.preview}
            resultImage={resultImage}
            message={resultText}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;

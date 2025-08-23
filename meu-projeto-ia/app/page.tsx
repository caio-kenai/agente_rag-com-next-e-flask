'use client';

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; 


const themes = {
  
  default: {
    bgGradient: 'from-gray-50 to-gray-200',
    h1Color: 'text-white',
    historyTitleColor: 'text-black',
    buttonBg: 'bg-gray-600',
    buttonHover: 'hover:bg-gray-800',
    buttonActive: 'active:bg-gray-850',
    buttonRing: 'focus:ring-gray-400',
    inputBorderFocus: 'focus:border-gray-500',
    proseColor: 'prose-gray',
    textColor: 'text-gray-900',
    responseBg: 'bg-white',
    responseBorder: 'border-gray-300',
    toggleButtonBg: 'bg-gray-500',
    toggleButtonText: 'text-white',
    toggleButtonHover: 'hover:bg-gray-600',
    mainCardBg: 'bg-white',
    mainCardDarkBg: 'dark:bg-gray-700', 
    logBg: 'bg-white',
    logBorder: 'border-indigo-200',
    logEntryBg: 'bg-gray-100',
    logEntryDarkBg: 'dark:bg-gray-600',
    logEntryTextColor: 'text-white',
    logEntryBorder: 'border-gray-200',
    inputBgColor: 'bg-white dark:bg-gray-600',
    inputTextColor: 'text-gray-900 dark:text-gray-100',
    inputBorderColor: 'border-gray-300 dark:border-gray-600',
    inputPlaceholderColor: 'placeholder-gray-500 dark:placeholder-gray-400',
    buttonDisabledBg: 'bg-gray-400',
    resetButtonBg: 'bg-red-500',
    resetButtonHover: 'hover:bg-red-600',
  },
  
  playlist: {
    bgGradient: 'from-blue-300 to-blue-600',
    h1Color: 'text-white',
    historyTitleColor: 'text-blue-600',
    buttonBg: 'bg-blue-700',
    buttonHover: 'hover:bg-blue-800',
    buttonActive: 'active:bg-blue-950',
    buttonRing: 'focus:ring-blue-300',
    inputBorderFocus: 'focus:border-blue-500',
    proseColor: 'prose-blue',
    textColor: 'text-blue-600', 
    responseBg: 'bg-white',
    responseBorder: 'border-blue-200',
    toggleButtonBg: 'bg-blue-800',
    toggleButtonText: 'text-white',
    toggleButtonHover: 'hover:bg-blue-900',
    mainCardBg: 'bg-white',
    mainCardDarkBg: 'dark:bg-blue-500', 
    logBg: 'bg-blue-50',
    logBorder: 'border-blue-300',
    logEntryBg: 'bg-white',
    logEntryDarkBg: 'dark:bg-blue-500',
    logEntryTextColor: 'text-white',
    logEntryBorder: 'border-blue-400',
    inputBgColor: 'bg-blue-100 dark:bg-blue-400',
    inputTextColor: 'text-white dark:text-white',
    inputBorderColor: 'border-blue-400 dark:border-blue-600',
    inputPlaceholderColor: 'placeholder-blue-600 dark:placeholder-white',
    buttonDisabledBg: 'bg-blue-400',
    resetButtonBg: 'bg-red-600',
    resetButtonHover: 'hover:bg-red-700',
  },
  
  aires: {
    bgGradient: 'from-gray-900 to-gray-800',
    h1Color: 'text-teal-300',
    historyTitleColor: 'text-teal-400',
    buttonBg: 'bg-teal-600',
    buttonHover: 'hover:bg-teal-700',
    buttonActive: 'active:bg-teal-800',
    buttonRing: 'focus:ring-teal-500',
    inputBorderFocus: 'focus:border-teal-500',
    proseColor: 'prose-invert prose-teal',
    textColor: 'text-gray-100', 
    responseBg: 'bg-gray-800',
    responseBorder: 'border-gray-700',
    toggleButtonBg: 'bg-teal-600',
    toggleButtonText: 'text-white',
    toggleButtonHover: 'hover:bg-teal-500',
    mainCardBg: 'bg-gray-800',
    mainCardDarkBg: 'dark:bg-gray-800', 
    logBg: 'bg-gray-900',
    logBorder: 'border-gray-700',
    logEntryBg: 'bg-gray-700',
    logEntryDarkBg: 'dark:bg-gray-600',
    logEntryTextColor: 'text-gray-100',
    logEntryBorder: 'border-gray-600',
    inputBgColor: 'bg-gray-500 dark:bg-gray-700',
    inputTextColor: 'text-gray-100 dark:text-gray-100',
    inputBorderColor: 'border-gray-600 dark:border-gray-700',
    inputPlaceholderColor: 'placeholder-gray-400 dark:placeholder-gray-500',
    buttonDisabledBg: 'bg-teal-800',
    resetButtonBg: 'bg-red-700',
    resetButtonHover: 'hover:bg-red-600', 
  },
};

export default function Home() {
  const [pergunta, setPergunta] = useState<string>('');
  const [resposta, setResposta] = useState<string>(''); 
  const [carregando, setCarregando] = useState<boolean>(false);
  const [currentThemeName, setCurrentThemeName] = useState<'default' | 'playlist' | 'aires'>('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showMandatoryPopup, setShowMandatoryPopup] = useState(false);
  const [qaLog, setQaLog] = useState<{ question: string; answer: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
    };

    if (showThemeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeDropdown]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!pergunta.trim()) {
      setShowMandatoryPopup(true);
      return;
    }

    setCarregando(true);
    setResposta('Buscando resposta...'); 

    try {
      const res = await fetch('http://127.0.0.1:5000/perguntar', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pergunta }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.erro || 'Erro na requisição da API.');
      }

      const data: { resposta: string } = await res.json();
      setResposta(data.resposta);
      setQaLog(prevLog => [...prevLog, { question: pergunta, answer: data.resposta }]);
    } catch (error: any) {
      console.error('Erro ao conectar com a API:', error.message);
      const errorMessage = `Desculpe! Ocorreu um erro ao buscar a resposta: ${error.message}`;
      setResposta(errorMessage); 
      setQaLog(prevLog => [...prevLog, { question: pergunta, answer: errorMessage }]);
    } finally {
      setCarregando(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPergunta(e.target.value);
  };

  const toggleDropdown = () => {
    setShowThemeDropdown((prev) => !prev);
  };

  const handleThemeSelection = (themeKey: 'default' | 'playlist' | 'aires') => {
    setCurrentThemeName(themeKey);
    setShowThemeDropdown(false);
  };

  const handleReset = () => {
    setPergunta('');
    setResposta('');
    setQaLog([]);
    setShowThemeDropdown(false);
    setShowMandatoryPopup(false);
  };

  const selectedTheme = themes[currentThemeName];

  const resetButtonClasses = `px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${selectedTheme.resetButtonBg} text-white ${selectedTheme.resetButtonHover}`;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${selectedTheme.bgGradient} flex items-center justify-center p-6 font-sans`}>
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-6">
        
        <div className={`w-full md:w-1/3 lg:w-1/4 max-h-[90vh] overflow-y-auto ${selectedTheme.logBg} ${selectedTheme.logBorder} p-4 rounded-2xl shadow-xl animate-fade-in`}>
          <h2 className={`text-2xl font-bold mb-4 ${selectedTheme.historyTitleColor}`}>Histórico</h2>
          {qaLog.length === 0 ? (
            <p className={`${selectedTheme.textColor} text-sm opacity-70`}>Nenhuma pergunta ainda.</p>
          ) : (
            <div className="space-y-4">
              {qaLog.map((entry, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg shadow-sm border ${selectedTheme.logEntryBg} ${selectedTheme.logEntryDarkBg} ${selectedTheme.logEntryBorder}`}
                >
                  <p className={`font-semibold ${selectedTheme.logEntryTextColor}`}>Q: {entry.question}</p>
                  <div className={`text-sm ${selectedTheme.logEntryTextColor} mt-1`}>
                    <ReactMarkdown>{entry.answer}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={`w-full md:w-2/3 lg:w-3/4 ${selectedTheme.mainCardBg} ${selectedTheme.mainCardDarkBg} shadow-2xl rounded-2xl p-8 space-y-8 animate-fade-in`}>
          
          
          <div className="flex justify-end gap-2 mb-4 relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                         ${selectedTheme.toggleButtonBg} ${selectedTheme.toggleButtonText} ${selectedTheme.toggleButtonHover}`}
            >
              Style
            </button>

            {showThemeDropdown && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10"
              >
                {Object.keys(themes).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => handleThemeSelection(themeKey as 'default' | 'playlist' | 'aires')}
                    className={`block w-full text-left px-4 py-2 text-sm
                               ${currentThemeName === themeKey ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-200'}
                               hover:bg-gray-100 dark:hover:bg-gray-600`}
                  >
                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                  </button>
                ))}
              </div>
            )}
            
            
            <button
              onClick={handleReset}
              className={resetButtonClasses}
            >
              Reset
            </button>
          </div>

          <h1 className={`text-4xl font-extrabold text-center ${selectedTheme.h1Color} drop-shadow-lg`}>🤖 Assistente virtual da Playlist</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={pergunta}
              onChange={handleInputChange}
              placeholder="Como posso ajudar você hoje?"
              disabled={carregando}
              className={`w-full px-5 py-3 rounded-lg shadow-sm text-lg
                         focus:outline-none focus:ring-4 ${selectedTheme.buttonRing} ${selectedTheme.inputBorderFocus}
                         ${selectedTheme.inputBgColor} ${selectedTheme.inputTextColor} ${selectedTheme.inputBorderColor} ${selectedTheme.inputPlaceholderColor}
                         disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:text-gray-500 transition-all duration-300 ease-in-out`}
            />
            <button
              type="submit"
              disabled={carregando}
              className={`w-full ${selectedTheme.buttonBg} text-white font-bold py-3 rounded-lg shadow-md text-xl
                         ${selectedTheme.buttonHover} ${selectedTheme.buttonActive} transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-4 ${selectedTheme.buttonRing} ${carregando ? selectedTheme.buttonDisabledBg : ''} cursor-pointer`}
            >
              {carregando ? 'Enviando...' : 'Perguntar'}
            </button>
          </form>

          {resposta && ( 
            <div className={`${selectedTheme.responseBg} p-6 rounded-lg ${selectedTheme.responseBorder} shadow-inner animate-slide-in-up`}>
              <p className={`text-xl font-semibold ${selectedTheme.textColor} mb-3`}><strong>Resposta:</strong></p>
              <div className={`prose ${selectedTheme.proseColor} max-w-none ${selectedTheme.textColor} leading-relaxed`}>
                <ReactMarkdown>{resposta}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>

      
      {showMandatoryPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center space-y-4 max-w-xs w-full">
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">Por favor, digite sua pergunta.</p>
            <button
              onClick={() => setShowMandatoryPopup(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

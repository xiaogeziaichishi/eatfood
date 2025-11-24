
import React, { useState, useEffect } from 'react';
import SpinWheel from './components/SpinWheel';
import SettingsPanel from './components/SettingsPanel';
import { Dish, GameState, AIGenerationParams } from './types';
import { generateMenu } from './services/geminiService';
import { initAudio, playClickSound } from './utils/audio';
import { getRandomMenu, MASTER_MENU } from './data/chineseMenu';

const App: React.FC = () => {
  // Initialize with a random selection from the master list
  const [items, setItems] = useState<Dish[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.READY);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // Load initial data on mount
  useEffect(() => {
    handleShuffle();
  }, []);

  const handleGenerateMenu = async (params: AIGenerationParams) => {
    setGameState(GameState.GENERATING);
    setWinnerIndex(null);
    setShowResultModal(false);
    
    try {
      const newDishes = await generateMenu(params);
      if (newDishes && newDishes.length > 0) {
        setItems(newDishes);
      }
    } catch (error) {
      console.error("Failed to generate menu", error);
      alert("AI thinking failed, try again later!");
    } finally {
      setGameState(GameState.READY);
    }
  };

  const handleShuffle = () => {
    setWinnerIndex(null);
    setShowResultModal(false);
    // Pick 10 random items from the huge Chinese menu
    setItems(getRandomMenu(10)); 
    playClickSound(); // Little feedback sound
  };

  const handleSpin = () => {
    if (gameState === GameState.SPINNING || gameState === GameState.GENERATING) return;
    
    // Initialize/Resume Audio Context on user interaction
    initAudio();
    
    setGameState(GameState.SPINNING);
    setShowResultModal(false);
    setWinnerIndex(null);
  };

  const handleSpinEnd = (index: number) => {
    setWinnerIndex(index);
    setGameState(GameState.WINNER);
    setTimeout(() => {
      setShowResultModal(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center pb-20 overflow-x-hidden font-sans">
      {/* Header */}
      <header className="w-full py-6 text-center bg-white shadow-sm mb-6 rounded-b-[2.5rem]">
        <h1 className="font-display text-4xl md:text-5xl text-orange-600 drop-shadow-sm tracking-wider">
          今天吃什么？
        </h1>
        <p className="text-gray-500 mt-2 text-sm font-medium flex items-center justify-center gap-1">
           <span>🎲</span> 
           <span>收录了 {MASTER_MENU.length}+ 种中华美食</span>
           <span>🥢</span>
        </p>
      </header>

      {/* Controls & AI Input */}
      <SettingsPanel 
        onGenerate={handleGenerateMenu} 
        isLoading={gameState === GameState.GENERATING} 
      />

      {/* The Wheel */}
      <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center">
        <SpinWheel 
          items={items} 
          isSpinning={gameState === GameState.SPINNING} 
          onSpinEnd={handleSpinEnd}
          winnerIndex={winnerIndex}
        />

        {/* Action Buttons Container */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
          
          {/* Shuffle Button */}
          <button
            onClick={handleShuffle}
            disabled={gameState === GameState.SPINNING || gameState === GameState.GENERATING}
            className="px-8 py-3 rounded-full text-lg font-bold text-orange-600 bg-white border-2 border-orange-100 shadow-md hover:bg-orange-50 hover:border-orange-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            换一批 (Shuffle)
          </button>

          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={gameState === GameState.SPINNING || gameState === GameState.GENERATING}
            className={`
              relative group
              px-12 py-4 rounded-full text-2xl font-display font-bold text-white shadow-xl 
              transform transition-all active:scale-95
              ${gameState === GameState.SPINNING 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-2xl hover:-translate-y-1'
              }
            `}
          >
            {gameState === GameState.SPINNING ? '转动中...' : '开始旋转 (SPIN)'}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </div>

        {/* Current List Preview */}
        <div className="mt-10 w-full max-w-3xl px-4 text-center">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
            当前轮盘菜单 ({items.length}) / 随机抽取中
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {items.map((item, idx) => (
              <div key={item.id} className="bg-white px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-orange-50 flex items-center gap-1.5 transition-transform hover:scale-105">
                <span className="text-base">{item.emoji}</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Winner Modal Overlay */}
      {showResultModal && winnerIndex !== null && items[winnerIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowResultModal(false)}></div>
          
          <div className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl transform transition-all animate-bounce-in border-4 border-orange-100">
             {/* Confetti-ish Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[1.8rem] pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(251,146,60,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide">
                今天就吃这个！
              </div>
              
              <div className="text-7xl mb-4 filter drop-shadow-lg animate-pulse">
                {items[winnerIndex].emoji}
              </div>
              
              <h3 className="font-display text-4xl text-gray-800 mb-2 tracking-tight">
                {items[winnerIndex].name}
              </h3>
              
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                 {items[winnerIndex].description}
              </p>
              
              {items[winnerIndex].calories && (
                <div className="inline-flex items-center gap-1 bg-gray-50 px-4 py-1.5 rounded-full text-xs text-gray-500 mb-8 border border-gray-200">
                  <span>🔥</span> 热量预估: {items[winnerIndex].calories}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(items[winnerIndex].name + ' 做法 附近美食')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🔍</span> 搜索做法 / 附近外卖
                </a>
                <button 
                  onClick={() => setShowResultModal(false)}
                  className="w-full bg-white text-gray-500 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  再选一次
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }
        @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.3s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { AIGenerationParams } from '../types';

interface SettingsPanelProps {
  onGenerate: (params: AIGenerationParams) => void;
  isLoading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onGenerate, isLoading }) => {
  const [mood, setMood] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ mood, cuisine });
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-3 px-6 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all"
      >
        <span>🤖 AI 智能菜单定制 (Customize Menu)</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-2xl shadow-lg border border-orange-100 animate-fade-in-down">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              今天想吃什么口味/心情? (Mood)
            </label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="例如：辣的, 便宜的, 想要大吃一顿..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              菜系偏好 (Cuisine)
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">随机惊喜 (Random)</option>
              <option value="Chinese">中餐 (Chinese)</option>
              <option value="Japanese">日料 (Japanese)</option>
              <option value="Korean">韩餐 (Korean)</option>
              <option value="Western">西餐 (Western)</option>
              <option value="Fast Food">快餐 (Fast Food)</option>
              <option value="Healthy">轻食健康 (Healthy)</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                生成中 (Thinking)...
              </>
            ) : (
              '✨ 生成新菜单 (Generate)'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default SettingsPanel;
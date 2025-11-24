import { GoogleGenAI, Type } from "@google/genai";
import { Dish, AIGenerationParams } from "../types";

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateMenu = async (params: AIGenerationParams): Promise<Dish[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Generate a list of 8 diverse and delicious meal options based on the following preferences:
    Mood/Cravings: ${params.mood || "Anything tasty"};
    Cuisine Type: ${params.cuisine || "Mixed"};
    Dietary Restrictions: ${params.restrictions || "None"};
    
    Make the names short and catchy (max 6 Chinese characters if possible).
    Descriptions should be appetizing and short (1 sentence).
    Include an emoji for each.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              emoji: { type: Type.STRING },
              description: { type: Type.STRING },
              calories: { type: Type.STRING, description: "Estimated calories, e.g. '500 kcal'" }
            },
            required: ["name", "emoji", "description"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];

    const rawData = JSON.parse(text);
    
    // Map to our internal Dish type
    return rawData.map((item: any) => ({
      id: generateId(),
      name: item.name,
      emoji: item.emoji,
      description: item.description,
      calories: item.calories
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data in case of error
    return [
      { id: '1', name: '麻辣火锅', emoji: '🥘', description: '热辣滚烫，快乐加倍！', calories: '800 kcal' },
      { id: '2', name: '日式拉面', emoji: '🍜', description: '浓郁骨汤，暖心暖胃。', calories: '600 kcal' },
      { id: '3', name: '美式汉堡', emoji: '🍔', description: '大口吃肉，汁水四溢。', calories: '750 kcal' },
      { id: '4', name: '轻食沙拉', emoji: '🥗', description: '健康低卡，清爽解腻。', calories: '350 kcal' },
      { id: '5', name: '红烧肉饭', emoji: '🍚', description: '肥而不腻，米饭杀手。', calories: '700 kcal' },
      { id: '6', name: '意式披萨', emoji: '🍕', description: '芝士拉丝，香脆可口。', calories: '650 kcal' },
    ];
  }
};
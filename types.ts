export interface Dish {
  id: string;
  name: string;
  emoji: string;
  description: string;
  calories?: string;
}

export enum GameState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING', // AI is thinking
  READY = 'READY', // List is populated, ready to spin
  SPINNING = 'SPINNING',
  WINNER = 'WINNER'
}

export interface AIGenerationParams {
  mood?: string;
  cuisine?: string;
  restrictions?: string;
}
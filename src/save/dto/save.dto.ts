import { Save } from 'src/save.entity';

export class SaveDto {
  id: number;
  date: Date;
  data: GameState;

  static FromEntity(save: Save): SaveDto {
    return {
      ...save,
      data: JSON.parse(save.data!) as GameState,
    } as SaveDto;
  }
}

export interface PlayerState {
  name: string;
  grid: string[];
  validatedItems: Map<number, ValidatedItem>;
}

export interface GameState {
  players: PlayerState[];
  propositions: Proposition[];
}

export interface Proposition {
  text: string;
  id: string;
}

export interface ValidatedItem {
  propositionId: string;
  description: string;
  timestamp: number;
}

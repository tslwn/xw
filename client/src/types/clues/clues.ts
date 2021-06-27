export interface Clue {
  id: number;
  answer: string;
  clue?: string;
  notes?: string;
}

export type CreateClueDto = Omit<Clue, 'id'>;

export type UpdateClueDto = Partial<CreateClueDto>;

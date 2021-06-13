import type { CreateClueDto, UpdateClueDto } from '../clues/clues-interfaces';
import defaultClues from './clues-data';

export default function cluesRepository(initialClues = defaultClues) {
  let clues = initialClues;

  let seq = clues.reduce((maxId, clue) => Math.max(maxId, clue.id), 1);

  return {
    findAll() {
      return clues;
    },

    findOne(id: number) {
      return clues.find((clue) => clue.id === id);
    },

    create(createClueDto: CreateClueDto) {
      seq = seq + 1;

      return [...clues.slice(), { id: seq, ...createClueDto }];
    },

    update(id: number, updateClueDto: UpdateClueDto) {
      const updatedClue = this.findOne(id);

      if (updatedClue !== undefined) {
        clues = clues.map((clue) =>
          clue.id === id ? { ...clue, updateClueDto } : clue
        );

        return { id, updateClueDto };
      }
      return undefined;
    },

    delete(id: number) {
      const deletedClue = this.findOne(id);

      if (deletedClue !== undefined) {
        clues = clues.filter((clue) => clue.id !== id);

        return deletedClue;
      }
      return undefined;
    },
  };
}

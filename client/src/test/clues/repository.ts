import data from 'src/test/clues/data';
import type { CreateClueDto, UpdateClueDto } from 'src/types';

export default function Repository(initialData = data) {
  let clues = initialData;

  // crude implementation somewhat like Postgres generated identity column
  let seq = clues.reduce((maxId, clue) => Math.max(maxId, clue.id), 1);

  return {
    findAll() {
      return clues;
    },

    // crude implementation somewhat like Postgres full-text search
    search(searchQuery: string) {
      const normalizedSearchQuery = searchQuery.toLowerCase();

      return clues.filter(({ answer, clue, notes }) => {
        const document = `${answer.toLowerCase()} ${clue?.toLowerCase()} ${notes?.toLowerCase()}`;

        return document.includes(normalizedSearchQuery);
      });
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

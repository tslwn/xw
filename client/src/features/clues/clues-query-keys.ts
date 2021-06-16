const clues = ['clues'];

const search = (search?: string) =>
  search !== undefined ? [clues, 'search', search] : clues;

const clue = (id: number) => [...clues, id];

export const queryKeys = {
  clues,
  search,
  clue,
};

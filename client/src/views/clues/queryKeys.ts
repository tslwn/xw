const clues = ['clues'];

const search = (search?: string) =>
  search !== undefined ? [clues, 'search', search] : clues;

const clue = (id: number) => [...clues, id];

const queryKeys = {
  clues,
  search,
  clue,
};

export default queryKeys;

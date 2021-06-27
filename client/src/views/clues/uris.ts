const clues = 'clues';

const search = (search?: string) =>
  search !== undefined
    ? `${clues}?search=${encodeURIComponent(search)}`
    : clues;

const clue = (id: number) => `${clues}/${encodeURIComponent(id)}`;

const uris = {
  clues,
  search,
  clue,
};

export default uris;

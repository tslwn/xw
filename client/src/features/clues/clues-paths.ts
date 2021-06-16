const clues = '/clues';

const clue = (id?: number) =>
  id !== undefined ? `${clues}/${encodeURIComponent(id)}` : `${clues}/:id`;

const create = `${clues}/create`;

export const paths = {
  clues,
  clue,
  create,
};

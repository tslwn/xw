const clues = '/clues';

const clue = (id?: number) =>
  id !== undefined ? `${clues}/${encodeURIComponent(id)}` : `${clues}/:id`;

const create = `${clues}/create`;

const paths = {
  clues,
  clue,
  create,
};

export default paths;

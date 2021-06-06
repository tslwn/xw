const URI = 'clues';

export const uris = {
  clues: URI,
  clue: (id: number) => `${URI}/${id}`,
};

const QUERY_KEY = URI;

export const queryKeys = {
  clues: [QUERY_KEY],
  clue: (id: number) => [QUERY_KEY, id],
};

const ROUTE = `/${URI}`;

export const routes = {
  clues: ROUTE,
  clue: (id: number) => `${ROUTE}/${id}`,
};

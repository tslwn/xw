const URI = 'clues';

export const uris = {
  clues: URI,
  clue: (id: number) => `${URI}/${id}`,
  search: (search?: string) => {
    if (search === undefined || search === '') {
      return URI;
    }
    return `${URI}?search=${encodeURIComponent(search)}`;
  },
};

const QUERY_KEY = URI;

export const queryKeys = {
  clues: [QUERY_KEY],
  clue: (id: number) => [QUERY_KEY, id],
  search: (search?: string) => {
    if (search === undefined || search === '') {
      return [QUERY_KEY];
    }
    return [QUERY_KEY, 'search', search];
  },
};

const ROUTE = `/${URI}`;

export const routes = {
  clues: ROUTE,
  clue: (id: number) => `${ROUTE}/${id}`,
  new: `${ROUTE}/new`,
};

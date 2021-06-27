import { setupServer } from 'msw/node';
import { handlers as clues } from 'src/test/clues';

const server = setupServer(...clues);

export * from 'msw';
export { server };

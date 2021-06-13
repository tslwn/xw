import { setupServer } from 'msw/node';
import cluesHandlers from './clues-handlers';

const server = setupServer(...cluesHandlers);

export * from 'msw';
export { server };

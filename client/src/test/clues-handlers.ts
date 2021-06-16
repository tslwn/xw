import { rest } from 'msw';
import type {
  CreateClueDto,
  UpdateClueDto,
} from '../features/clues/clues-interfaces';
import { paths } from '../features/clues/clues-paths';
import cluesRepository from './clues-repository';

const API_URL = process.env.REACT_APP_API_URL;

const repository = cluesRepository();

const handlers = [
  rest.get(`${API_URL}${paths.clues}`, async (req, res, ctx) => {
    const searchQuery = req.url.searchParams.get('search');

    if (searchQuery === null) {
      return res(ctx.json(repository.findAll()));
    }
    return res(ctx.json(repository.search(searchQuery)));
  }),
  rest.get(`${API_URL}${paths.clue()}`, async (req, res, ctx) =>
    res(ctx.json(repository.findOne(Number(req.params.id))))
  ),
  rest.post<CreateClueDto>(`${API_URL}${paths.clues}`, async (req, res, ctx) =>
    res(ctx.json(repository.create(req.body)))
  ),
  rest.put<UpdateClueDto>(`${API_URL}${paths.clue()}`, async (req, res, ctx) =>
    res(ctx.json(repository.update(Number(req.params.id), req.body)))
  ),
  rest.delete(`${API_URL}${paths.clue()}`, async (req, res, ctx) =>
    res(ctx.json(repository.delete(Number(req.params.id))))
  ),
];

export default handlers;

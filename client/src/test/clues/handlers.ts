import { rest } from 'msw';
import Repository from 'src/test/clues/repository';
import type { CreateClueDto, UpdateClueDto } from 'src/types';
import { paths } from 'src/views/clues';

const API_URL = process.env.REACT_APP_API_URL;

const repository = Repository();

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

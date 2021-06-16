import { UseQueryOptions, useQueryClient, useQuery } from 'react-query';
import api from '../../utils/api-client';
import { Clue } from './clues-interfaces';
import { queryKeys } from './clues-query-keys';
import { uris } from './clues-uris';

export function useClues(options?: UseQueryOptions<Clue[]>) {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryFn: () => api.get<Clue[]>(uris.clues),
    queryKey: queryKeys.clues,
    onSuccess: (clues) => {
      clues.forEach((clue) => {
        queryClient.setQueryData(queryKeys.clue(clue.id), clue);
      });

      if (options?.onSuccess !== undefined) {
        options.onSuccess(clues);
      }
    },
  });
}

export function useClue(id: number, options?: UseQueryOptions<Clue>) {
  return useQuery({
    ...options,
    queryFn: () => api.get<Clue>(uris.clue(id)),
    queryKey: queryKeys.clue(id),
  });
}

export function useSearchClues(
  search?: string,
  options?: UseQueryOptions<Clue[]>
) {
  return useQuery({
    ...options,
    queryFn: () => api.get<Clue[]>(uris.search(search)),
    queryKey: queryKeys.search(search),
  });
}
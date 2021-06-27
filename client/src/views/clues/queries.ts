import { UseQueryOptions, useQueryClient, useQuery } from 'react-query';
import { apiClient } from 'src/services';
import { Clue } from 'src/types';
import { queryKeys, uris } from 'src/views/clues';

export function useClues(options?: UseQueryOptions<Clue[]>) {
  const queryClient = useQueryClient();

  return useQuery({
    ...options,
    queryFn: () => apiClient.get<Clue[]>(uris.clues),
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
    queryFn: () => apiClient.get<Clue>(uris.clue(id)),
    queryKey: queryKeys.clue(id),
  });
}

export function useSearchClues(
  search?: string,
  options?: UseQueryOptions<Clue[]>
) {
  return useQuery({
    ...options,
    queryFn: () => apiClient.get<Clue[]>(uris.search(search)),
    queryKey: queryKeys.search(search),
  });
}

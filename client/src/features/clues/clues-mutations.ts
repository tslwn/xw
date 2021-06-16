import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import api from '../../utils/api-client';
import { Clue, CreateClueDto, UpdateClueDto } from './clues-interfaces';
import { queryKeys } from './clues-query-keys';
import { uris } from './clues-uris';

export function useCreateClue(
  options?: UseMutationOptions<Clue, unknown, CreateClueDto>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (variables) => api.post(uris.clues, variables),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.clues);

      queryClient.setQueryData(queryKeys.clue(data.id), data);

      if (options?.onSuccess !== undefined) {
        options.onSuccess(data, variables, context);
      }
    },
  });
}

export function useUpdateClue(
  id: number,
  options?: UseMutationOptions<Clue, unknown, UpdateClueDto>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (variables) => api.put(uris.clue(id), variables),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.clues);

      queryClient.setQueryData(queryKeys.clue(data.id), data);

      if (options?.onSuccess !== undefined) {
        options.onSuccess(data, variables, context);
      }
    },
  });
}

export function useDeleteClue(id: number, options?: UseMutationOptions<Clue>) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (_) => api.delete(uris.clue(id)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.clues);

      if (options?.onSuccess !== undefined) {
        options.onSuccess(data, variables, context);
      }
    },
  });
}

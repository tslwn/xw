import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { apiClient } from 'src/services';
import { Clue, CreateClueDto, UpdateClueDto } from 'src/types';
import { queryKeys, uris } from 'src/views/clues';

export function useCreateClue(
  options?: UseMutationOptions<Clue, unknown, CreateClueDto>
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (variables) => apiClient.post(uris.clues, variables),
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
    mutationFn: (variables) => apiClient.put(uris.clue(id), variables),
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
    mutationFn: (_) => apiClient.delete(uris.clue(id)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(queryKeys.clues);

      if (options?.onSuccess !== undefined) {
        options.onSuccess(data, variables, context);
      }
    },
  });
}

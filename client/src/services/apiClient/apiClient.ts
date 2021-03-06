const API_URL = process.env.REACT_APP_API_URL;

const credentials: RequestCredentials = 'same-origin';

type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

interface ClientOptions<TVariables = void> {
  method?: Method;
  variables?: TVariables;
}

export async function client<TData, TError = unknown, TVariables = void>(
  endpoint: string,
  { method, variables }: ClientOptions<TVariables>
) {
  const config = variables
    ? {
        body: JSON.stringify(variables),
        credentials,
        headers: {
          'Content-Type': 'application/json',
        },
        method,
      }
    : {
        credentials,
        method,
      };

  // allow cancellation
  const controller = new AbortController();

  const signal = controller.signal;

  const promise = window.fetch(`${API_URL}/${endpoint}`, { ...config, signal });

  // @ts-expect-error https://react-query.tanstack.com/guides/query-cancellation
  promise.cancel = () => controller.abort();

  return promise.then(async (response) => {
    if (response.ok) {
      const body: TData = await response.json();
      return body;
    }

    const body: TError = await response.json();
    return Promise.reject(body);
  });
}

function method(method: Method) {
  return function <TData, TError = unknown, TVariables = void>(
    endpoint: string,
    variables?: TVariables
  ) {
    return client<TData, TError, TVariables>(endpoint, {
      variables,
      method,
    });
  };
}

const apiClient = {
  delete: method('DELETE'),
  get: method('GET'),
  patch: method('PATCH'),
  post: method('POST'),
  put: method('PUT'),
};

export default apiClient;

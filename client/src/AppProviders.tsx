import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface AppProvidersProps {
  children?: React.ReactNode;
  queryClient?: QueryClient;
}

export default function AppProviders({
  children,
  queryClient = new QueryClient(),
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

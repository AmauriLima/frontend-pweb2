import { queryClient } from "@/application/shared/clients/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <h1>Hello world</h1>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};

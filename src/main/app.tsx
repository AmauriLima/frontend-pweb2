import { queryClient } from "@/application/shared/clients/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Router } from "./routes/router";

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <Router />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};

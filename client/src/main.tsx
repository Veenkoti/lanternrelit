import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { JournalProvider } from "./context/JournalContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <JournalProvider>
        <Toaster />
        <App />
      </JournalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

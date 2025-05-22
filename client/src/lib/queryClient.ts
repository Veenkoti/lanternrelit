import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { JournalEntry } from "@/context/JournalContext";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// Journal API Functions
export const journalApi = {
  // Get all journal entries
  async getEntries(): Promise<JournalEntry[]> {
    const res = await apiRequest('GET', '/api/journal');
    return res.json();
  },
  
  // Get a single journal entry by ID
  async getEntry(id: number): Promise<JournalEntry> {
    const res = await apiRequest('GET', `/api/journal/${id}`);
    return res.json();
  },
  
  // Create a new journal entry
  async createEntry(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    const res = await apiRequest('POST', '/api/journal', entry);
    return res.json();
  },
  
  // Update an existing journal entry
  async updateEntry(id: number, entry: Partial<JournalEntry>): Promise<JournalEntry> {
    const res = await apiRequest('PUT', `/api/journal/${id}`, entry);
    return res.json();
  },
  
  // Delete a journal entry
  async deleteEntry(id: number): Promise<void> {
    await apiRequest('DELETE', `/api/journal/${id}`);
  }
};

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

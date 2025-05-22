import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { JournalProvider } from "@/context/JournalContext";

function App() {
  return (
    <JournalProvider>
      <div className="flex flex-col min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </JournalProvider>
  );
}

export default App;

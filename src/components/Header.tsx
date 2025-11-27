import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-4 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
        <div className="p-1.5 bg-foreground rounded-md">
          <Zap className="w-4 h-4 text-background fill-background" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          FreeServiceIndex
        </h1>
      </div>
    </header>
  );
}

import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <Zap className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
          FreeServiceIndex
        </h1>
      </div>
    </header>
  );
}
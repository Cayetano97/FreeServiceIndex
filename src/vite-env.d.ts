/// <reference types="vite/client" />

interface ImportMeta {
  readonly glob: (pattern: string, options?: { 
    query?: string;
    import?: 'default' | 'named';
  }) => Record<string, () => Promise<string>>;
} 
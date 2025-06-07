import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Guide {
  title: string;
  content: string;
  filename: string;
}

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  useEffect(() => {
    const loadGuides = async () => {
      try {
        // Por ahora, usaremos datos de ejemplo para probar
        const exampleGuides: Guide[] = [
          {
            title: "Guía de Ejemplo",
            content: "# Guía de Ejemplo\n\nEsta es una guía de ejemplo para probar la funcionalidad.",
            filename: "ejemplo.md"
          }
        ];
        
        setGuides(exampleGuides);
        setSelectedGuide(exampleGuides[0]);
      } catch (error) {
        console.error('Error al cargar las guías:', error);
      }
    };

    loadGuides();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <div className="bg-card p-4 rounded-lg border max-h-[calc(100vh-12rem)] flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-card-foreground">Guías</h2>
            <div className="overflow-y-auto flex-1 pr-2">
              <ul className="space-y-2">
                {guides.map((guide) => (
                  <li key={guide.filename}>
                    <button
                      onClick={() => setSelectedGuide(guide)}
                      className={`w-full text-left p-2 rounded transition-colors ${
                        selectedGuide?.filename === guide.filename
                          ? 'bg-primary text-primary-foreground'
                          : 'text-card-foreground hover:bg-muted'
                      }`}
                    >
                      {guide.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-card p-4 rounded-lg border min-h-[calc(100vh-12rem)]">
            {selectedGuide ? (
              <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground">
                <ReactMarkdown>{selectedGuide.content}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                {guides.length === 0 ? 'No hay guías disponibles' : 'Selecciona una guía para ver su contenido'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides; 
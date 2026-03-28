import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2 } from 'lucide-react';

interface Guide {
  title: string;
  content: string;
  filename: string;
}

interface ImageWithLoaderProps {
  src?: string;
  alt?: string;
}

const ImageWithLoader = ({ src, alt }: ImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="image-loader">
      {isLoading && (
        <div className="image-loader__overlay">
          <Loader2 className="image-loader__spinner" />
        </div>
      )}
      {hasError ? (
        <div className="image-loader__error">
          Error al cargar la imagen
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="image-loader__img"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      )}
    </div>
  );
};

const GuideList = ({ guides, selectedGuide, onSelectGuide }: { 
  guides: Guide[]; 
  selectedGuide: Guide | null; 
  onSelectGuide: (guide: Guide) => void;
}) => (
  <div className="guides-panel guides-panel--list">
    <h2 className="guides-title">Guías</h2>
    <div className="guides-scroll">
      <ul className="guides-list">
        {guides.map((guide) => (
          <li key={guide.filename}>
            <button
              onClick={() => onSelectGuide(guide)}
              className={`guide-button ${
                selectedGuide?.filename === guide.filename
                  ? 'is-active'
                  : ''
              }`}
            >
              {guide.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const GuideContent = ({ guide }: { guide: Guide | null }) => (
  <div className="guides-panel guides-panel--content">
    {guide ? (
      <div className="markdown">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt }) => <ImageWithLoader src={src} alt={alt} />
          }}
        >
          {guide.content}
        </ReactMarkdown>
      </div>
    ) : (
      <div className="guides-empty">
        No hay guías disponibles
      </div>
    )}
  </div>
);

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  useEffect(() => {
    const loadGuides = async () => {
      try {
        const guidesContext = import.meta.glob('/src/db/guides/*.md', { 
          query: '?raw',
          import: 'default'
        });
        const loadedGuides: Guide[] = [];

        for (const path in guidesContext) {
          const content = await guidesContext[path]() as string;
          const filename = path.split('/').pop() || '';
          const title = filename.replace('.md', '');
          
          loadedGuides.push({
            title,
            content,
            filename
          });
        }

        setGuides(loadedGuides);
        if (loadedGuides.length > 0) {
          setSelectedGuide(loadedGuides[0]);
        }
      } catch (error) {
        console.error('Error al cargar las guías:', error);
      }
    };
    loadGuides();
  }, []);

  return (
    <div className="guides">
      <div className="guides-layout">
        <div className="guides-col">
          <GuideList 
            guides={guides} 
            selectedGuide={selectedGuide} 
            onSelectGuide={setSelectedGuide} 
          />
        </div>
        <div className="guides-col guides-col--wide">
          <GuideContent guide={selectedGuide} />
        </div>
      </div>
    </div>
  );
};

export default Guides; 

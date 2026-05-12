import { useEffect } from "react";
import type { ReactNode } from "react";

interface PlatformScrollProps {
  platforms: string[];
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
  defaultPlatform?: string;
}

const PlatformButton = ({
  platform,
  isSelected,
  onClick,
}: {
  platform: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button onClick={onClick} className={`chip ${isSelected ? "is-active" : ""}`}>
    {platform}
  </button>
);

const PlatformScroll = ({
  platforms,
  selectedPlatform = "Universal",
  onSelectPlatform,
  defaultPlatform = "Universal",
}: PlatformScrollProps) => {
  useEffect(() => {
    onSelectPlatform(defaultPlatform);
  }, []);

  return (
    <div className="filter-group">
      <div className="filter-title">Plataformas</div>
      <div className="filter-chips" aria-label="Plataformas">
        <PlatformButton
          platform="Universal"
          isSelected={selectedPlatform === "Universal"}
          onClick={() => onSelectPlatform("Universal")}
        />
        {platforms.reduce<ReactNode[]>((acc, platform) => {
          if (platform !== defaultPlatform) {
            acc.push(
              <PlatformButton
                key={platform}
                platform={platform}
                isSelected={selectedPlatform === platform}
                onClick={() => onSelectPlatform(platform)}
              />,
            );
          }
          return acc;
        }, [])}
      </div>
    </div>
  );
};

export default PlatformScroll;

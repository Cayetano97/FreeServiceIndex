
import { useEffect } from "react";

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
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 text-sm rounded-md transition-all duration-200 border
      ${
        isSelected
          ? "bg-foreground text-background border-foreground font-medium"
          : "bg-transparent text-muted-foreground border-transparent hover:border-border hover:text-foreground"
      }
    `}
  >
    {platform}
  </button>
);

const PlatformScroll = ({
  platforms,
  selectedPlatform = "Todas",
  onSelectPlatform,
  defaultPlatform = "Todas",
}: PlatformScrollProps) => {
  useEffect(() => {
    onSelectPlatform(defaultPlatform);
  }, []);

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Plataformas
      </div>
      <div className="flex flex-wrap gap-2">
        <PlatformButton
          platform="Todas"
          isSelected={selectedPlatform === "Todas"}
          onClick={() => onSelectPlatform("Todas")}
        />
        {platforms.map((platform) => (
          <PlatformButton
            key={platform}
            platform={platform}
            isSelected={selectedPlatform === platform}
            onClick={() => onSelectPlatform(platform)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatformScroll;

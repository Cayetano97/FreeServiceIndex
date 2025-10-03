import { motion } from "framer-motion";
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
  <motion.button
    whileHover={{ scale: platform === "Todas" ? 1 : 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      flex items-center gap-2 px-4 py-2 rounded-full
      ${
        isSelected
          ? "bg-primary text-primary-foreground shadow-lg"
          : "bg-secondary/10 hover:bg-secondary/20"
      }
    `}
  >
    {platform === "Todas" ? (
      <span>🌐</span>
    ) : (
      <span className="whitespace-nowrap">{platform}</span>
    )}
  </motion.button>
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
    <>
      <div className="px-4 mx-auto max-w-7xl text-xs uppercase tracking-wider text-muted-foreground/80 select-none">
        Plataformas
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full overflow-x-auto py-2 scrollbar-hide"
      >
        <div className="flex space-x-4 px-4 min-w-max mx-auto max-w-7xl">
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
      </motion.div>
    </>
  );
};

export default PlatformScroll;

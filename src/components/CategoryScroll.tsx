import { motion } from "framer-motion";
import { useEffect } from "react";

interface CategoryScrollProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  defaultCategory?: string;
}

const CategoryButton = ({
  category,
  isSelected,
  onClick,
}: {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: category === "Todos" ? 1 : 1.05 }}
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
    {category === "Todos" ? (
      <span>🗂️</span>
    ) : (
      <span className="whitespace-nowrap">{category}</span>
    )}
  </motion.button>
);

const CategoryScroll = ({
  categories,
  selectedCategory = "Todos",
  onSelectCategory,
  defaultCategory = "Todos",
}: CategoryScrollProps) => {
  useEffect(() => {
    onSelectCategory(defaultCategory);
  }, []);

  return (
    <>
      <div className="px-4 mx-auto max-w-7xl text-xs uppercase tracking-wider text-muted-foreground/80 select-none">
        Categorías
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full overflow-x-auto py-3 scrollbar-hide"
      >
        <div className="flex space-x-4 px-4 min-w-max mx-auto max-w-7xl">
          <CategoryButton
            category="Todos"
            isSelected={selectedCategory === "Todos"}
            onClick={() => onSelectCategory("Todos")}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => onSelectCategory(category)}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default CategoryScroll;

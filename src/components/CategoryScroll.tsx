import { motion } from "framer-motion";
import { useEffect } from "react";

interface CategoryScrollProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  defaultCategory?: string;
}

export default function CategoryScroll({
  categories,
  selectedCategory = "Todos",
  onSelectCategory,
  defaultCategory = "Todos"
}: CategoryScrollProps) {
  useEffect(() => {
    onSelectCategory(defaultCategory);
  }, []);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full overflow-x-auto py-4 scrollbar-hide"
    >
      <div className="flex space-x-4 px-4 min-w-max mx-auto max-w-7xl">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory("Todos")}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full
            ${selectedCategory === "Todos"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary/10 hover:bg-secondary/20"
            }
          `}
        >
          <motion.span
            animate={{ rotate: selectedCategory === "Todos" ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            ☺️
          </motion.span>
          <span className="whitespace-nowrap">Todos</span>
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full
              ${selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary/10 hover:bg-secondary/20"
              }
            `}
          >
            <span className="whitespace-nowrap">{category}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

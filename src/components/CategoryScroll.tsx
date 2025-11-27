
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
    {category}
  </button>
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
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Categorías
      </div>
      <div className="flex flex-wrap gap-2">
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
    </div>
  );
};

export default CategoryScroll;

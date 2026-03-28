
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
    className={`chip ${isSelected ? "is-active" : ""}`}
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
    <div className="filter-group">
      <div className="filter-title">
        Categorías
      </div>
      <div className="filter-chips">
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

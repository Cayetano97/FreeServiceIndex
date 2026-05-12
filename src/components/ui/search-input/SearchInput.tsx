import { Search, X } from "lucide-react";
import { memo, useCallback } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput = memo(function SearchInput({
  value,
  onChange,
  placeholder = "Buscar servicios...",
  className = "",
}: SearchInputProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape" && value) {
        onChange("");
      }
    },
    [value, onChange],
  );

  return (
    <div className="filter-group">
      <div className={`search-input ${className}`}>
        <Search className="search-input__icon" aria-hidden="true" />
        <input
          type="text"
          className="search-input__field"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label={placeholder}
        />
        {value && (
          <button
            type="button"
            className="search-input__clear"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            <X className="search-input__clear-icon" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
});

export default SearchInput;

import { useEffect, useRef } from "react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <label htmlFor="Search">
        <h3>MovieSearch</h3>
        <div className="input">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search here"
          />
        </div>
      </label>
    </div>
  );
}

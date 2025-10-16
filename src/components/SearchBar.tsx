interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="search here"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
    </div>
  );
}

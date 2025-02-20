
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchSuggestion {
  id: string;
  name: string;
  team: string;
}

const mockSuggestions: SearchSuggestion[] = [
  { id: "1", name: "Erling Haaland", team: "Manchester City" },
  { id: "2", name: "Kylian Mbappé", team: "Paris Saint-Germain" },
  { id: "3", name: "Jude Bellingham", team: "Real Madrid" },
];

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(s => 
        s.name.toLowerCase().includes(value.toLowerCase()) ||
        s.team.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search players..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-400 transition-colors"
        />
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto z-50">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex flex-col"
              onClick={() => {
                setQuery(suggestion.name);
                setSuggestions([]);
              }}
            >
              <span className="font-medium">{suggestion.name}</span>
              <span className="text-sm text-gray-500">{suggestion.team}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

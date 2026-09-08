import { Search } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  defaultValue?: string;
  size?: 'lg' | 'md';
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  defaultValue = '',
  size = 'md',
  placeholder = 'Cerrajero, restaurante, mecánico...',
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSearch) {
      onSearch(value);
    } else {
      navigate(`/buscar?q=${encodeURIComponent(value.trim())}`);
    }
  }

  const isLarge = size === 'lg';

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-center gap-2 rounded-full border border-ink-200 bg-white shadow-sm focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100 ${
        isLarge ? 'p-2' : 'p-1.5'
      }`}
    >
      <label htmlFor="search-input" className="sr-only">
        Buscar comercios, servicios o profesionales
      </label>
      <Search
        className={`shrink-0 text-ink-400 ${isLarge ? 'ml-3 size-6' : 'ml-2 size-5'}`}
        aria-hidden="true"
      />
      <input
        id="search-input"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent text-ink-900 outline-none placeholder:text-ink-400 ${
          isLarge ? 'py-2 text-base sm:text-lg' : 'py-1.5 text-sm'
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-brand-600 font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-brand-800 ${
          isLarge ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
        }`}
      >
        Buscar
      </button>
    </form>
  );
}

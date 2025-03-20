import { SearchIcon } from 'lucide-react'

export function SearchInput() {
  return (
    <label
      className="bg-secondary relative flex w-full items-center justify-start rounded-full px-3 py-2"
      htmlFor="search"
    >
      <SearchIcon />
      <input
        id="search"
        type="text"
        placeholder="Search..."
        className="border-secondary absolute top-0 left-0 h-full w-full rounded-full border-2 pl-12 transition-colors focus:outline-none"
      />
    </label>
  )
}

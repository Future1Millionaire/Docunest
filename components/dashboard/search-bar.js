import { SearchIcon } from "@/components/dashboard/icons";

export function SearchBar({ value, onChange }) {
  return (
    <label className="relative block w-full lg:max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        aria-label="Search documents"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search documents..."
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
      />
    </label>
  );
}

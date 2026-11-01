import {
  FileIcon,
  FolderIcon,
  StarIcon,
  StorageIcon,
} from "@/components/dashboard/icons";

const categoryIcons = {
  "All documents": FolderIcon,
  Academics: FileIcon,
  Personal: StarIcon,
  Finance: StorageIcon,
  Projects: FolderIcon,
};

export function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
  compact = false,
}) {
  return (
    <nav
      aria-label="Document categories"
      className={compact ? "flex gap-2 overflow-x-auto pb-2" : "space-y-1"}
    >
      {categories.map((category) => {
        const Icon = categoryIcons[category.name];
        const active = activeCategory === category.name;

        return (
          <button
            key={category.name}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(category.name)}
            className={`text-sm ${
              compact
                ? "shrink-0 rounded-full px-4 py-2"
                : "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left"
            } ${
              active
                ? compact
                  ? "bg-violet-100 font-semibold text-violet-700"
                  : "bg-violet-50 font-semibold text-violet-700"
                : compact
                  ? "bg-white text-slate-600 ring-1 ring-slate-200"
                  : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {!compact && <Icon className="size-[18px]" />}
            <span className={compact ? "" : "flex-1"}>{category.name}</span>
            <span className={compact ? "ml-1" : "text-xs"}>
              {category.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

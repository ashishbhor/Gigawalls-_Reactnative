import { CategoryType } from "../types";
import { CATEGORIES, getCategoryIcon } from "../constants";

interface Props {
  activeCategory: CategoryType;
  onSelect: (cat: CategoryType) => void;
}

export default function CategoryTabs({ activeCategory, onSelect }: Props) {
  return (
    <div className="px-4 py-2 flex gap-2 overflow-x-auto">
      {CATEGORIES.map((cat) => {
        const Icon = getCategoryIcon(cat);
        const active = cat === activeCategory;

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all
              ${  
              active
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Icon size={16} />
            {cat}
            </button>
        );
      })}
    </div>
  );
}

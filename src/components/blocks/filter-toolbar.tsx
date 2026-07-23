import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export type FilterOption = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

export function FilterToolbar({
  action,
  searchLabel = "Search",
  searchPlaceholder = "Search",
  filters,
}: {
  action?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  filters: FilterOption[];
}) {
  return (
    <form
      action={action}
      method="get"
      className="flex flex-col gap-3 rounded-pk border border-line bg-elevated p-3 md:flex-row"
    >
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">{searchLabel}</span>
        <MagnifyingGlass
          size={16}
          weight="bold"
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
        />
        <input
          type="search"
          name="q"
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-pk-sm border border-strong bg-bg pl-10 pr-3.5 text-sm placeholder:text-faint"
        />
      </label>
      {filters.slice(0, 3).map((filter) => (
        <label key={filter.name} className="min-w-40">
          <span className="sr-only">{filter.label}</span>
          <select
            name={filter.name}
            defaultValue=""
            className="h-11 w-full rounded-pk-sm border border-strong bg-bg px-3.5 text-sm"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <button
        type="submit"
        className="h-11 rounded-pk-sm bg-accent px-5 text-sm font-medium text-accent-fg"
      >
        Apply
      </button>
    </form>
  );
}

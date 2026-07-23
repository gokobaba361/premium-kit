import type { PropsTable } from "@/registry/props";

/**
 * Renders one props table per exported component.
 *
 * Generated from the component signature, so it is either correct or visibly
 * incomplete. Types that the parser did not expand are listed underneath rather
 * than silently dropped.
 */
export function PropsTables({
  tables,
  language = "en",
}: {
  tables: PropsTable[];
  language?: "en" | "tr";
}) {
  if (tables.length === 0) return null;
  const tr = language === "tr";

  return (
    <div className="flex flex-col gap-10">
      {tables.map((table) => (
        <div key={table.component} className="flex flex-col gap-4">
          <h3 className="font-mono text-[0.9375rem]">{table.component}</h3>

          {table.props.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-strong">
                    <th scope="col" className="pb-3 pr-4 text-sm font-medium text-muted">
                      {tr ? "Özellik" : "Prop"}
                    </th>
                    <th scope="col" className="pb-3 pr-4 text-sm font-medium text-muted">
                      {tr ? "Tip" : "Type"}
                    </th>
                    <th scope="col" className="pb-3 pr-4 text-sm font-medium text-muted">
                      {tr ? "Varsayılan" : "Default"}
                    </th>
                    <th scope="col" className="pb-3 text-sm font-medium text-muted">
                      {tr ? "Notlar" : "Notes"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table.props.map((prop) => (
                    <tr key={prop.name} className="border-b border-line align-top last:border-0">
                      <td className="py-3.5 pr-4">
                        <span className="font-mono text-[0.8125rem]">{prop.name}</span>
                        {prop.required ? (
                          <span className="ml-2 text-xs text-accent">
                            {tr ? "zorunlu" : "required"}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-3.5 pr-4">
                        <code className="font-mono text-[0.8125rem] text-muted">{prop.type}</code>
                      </td>
                      <td className="py-3.5 pr-4">
                        {prop.defaultValue ? (
                          <code className="font-mono text-[0.8125rem] text-muted">
                            {prop.defaultValue}
                          </code>
                        ) : (
                          <span className="text-sm text-faint">{tr ? "yok" : "none"}</span>
                        )}
                      </td>
                      <td className="py-3.5 text-[0.875rem] leading-relaxed text-muted">
                        {prop.description ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {table.inherits.length > 0 ? (
            <p className="text-sm text-muted">
              {tr ? "Ayrıca şu tipleri kabul eder" : "Also accepts"}{" "}
              {table.inherits.map((type, i) => (
                <span key={type}>
                  {i > 0 ? ", " : ""}
                  <code className="font-mono text-[0.8125rem]">{type}</code>
                </span>
              ))}
              .{" "}
              {tr
                ? "Bu tipler burada genişletilmeden doğrudan kaynaktan okunur."
                : "Those are read from the source rather than expanded here."}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

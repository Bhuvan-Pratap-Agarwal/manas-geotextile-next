import type { Datasheet } from "@/lib/products";

export function DatasheetTable({ sheet }: { sheet: Datasheet }) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h3 className="h3 text-navy">{sheet.title}</h3>
          <p className="mt-1 text-[14px] text-muted">{sheet.note}</p>
        </div>
        <a href={sheet.download} className="shrink-0 text-[15px] font-semibold text-accent-ink hover:text-navy" download>
          Download PDF
        </a>
      </div>
      <div className="mt-4 overflow-x-auto rounded-[4px] border border-line" tabIndex={0} role="region" aria-label={`${sheet.title} datasheet`}>
        <table className="w-full min-w-[880px] border-collapse text-[14px]">
          <thead>
            <tr className="bg-navy text-white">
              <th scope="col" className="sticky left-0 z-10 bg-navy px-4 py-3 text-left font-semibold">Property</th>
              <th scope="col" className="px-3 py-3 text-left font-semibold">Unit</th>
              {sheet.grades.map((g) => (
                <th key={g} scope="col" className="spec px-3 py-3 text-right font-medium">{g}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheet.rows.map((r, i) => (
              <tr key={r.property} className={i % 2 ? "bg-paper-2" : "bg-white"}>
                <th scope="row" className={`sticky left-0 z-10 px-4 py-2.5 text-left font-medium text-ink ${i % 2 ? "bg-paper-2" : "bg-white"}`}>
                  {r.property}
                  {r.method && <span className="block text-[12px] font-normal text-muted">{r.method}</span>}
                </th>
                <td className="px-3 py-2.5 text-muted">{r.unit}</td>
                {r.values.map((v, j) => (
                  <td key={j} className="spec px-3 py-2.5 text-right text-ink">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[13px] text-muted">Column headings are grams per square metre (GSM). Scroll sideways on a phone.</p>
    </div>
  );
}

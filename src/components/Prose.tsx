import type { Block } from "@/lib/content-types";
import { slugify } from "@/lib/content-types";

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-geo">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return <h2 key={i} id={slugify(b.text)}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <div key={i} className="table-wrap">
                <table>
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead>
                    <tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r.join("|")}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return <aside key={i}>{b.text}</aside>;
        }
      })}
    </div>
  );
}

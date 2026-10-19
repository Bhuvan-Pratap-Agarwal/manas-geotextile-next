import Image from "next/image";
import { clients } from "@/lib/clients";

export function ClientLogos({ limit, className }: { limit?: number; className?: string }) {
  const list = limit ? clients.slice(0, limit) : clients;
  return (
    <ul className={className ?? "grid grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-4 lg:grid-cols-6"}>
      {list.map((c) => (
        <li key={c.file} className="flex items-center justify-center bg-white px-4 py-5">
          <Image
            src={`/images/clients/${c.file}.jpg`}
            alt={c.name}
            width={250}
            height={100}
            className="h-12 w-auto object-contain opacity-85 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
          />
        </li>
      ))}
    </ul>
  );
}

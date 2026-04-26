"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/shop?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="py-4 flex items-center gap-4">
      <div>Filter by</div>
      <input
        type="text"
        placeholder="Search Medicine"
        onChange={handleChange}
        className="border px-2 py-1"
      />
    </div>
  );
}

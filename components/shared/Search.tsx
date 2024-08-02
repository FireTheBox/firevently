"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { LucideSearch } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const Search = ({
  placeholder = "Pesquisar título...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="h-14 w-full lg:w-[300px] flex items-center rounded-md bg-secondary px-4 py-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1 border border-input">
      <LucideSearch size={24} />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
      />
    </div>
  );
};

export default Search;

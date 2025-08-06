"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  // Initialize state with current URL parameter
  const [searchQuery, setSearchQuery] = useState(query);

  // Handle search with debouncing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, searchParams, pathname, router]);

  return (
    <div className="mr-6">
      <div className="relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="input border-[1px] border-gray-300 px-5 py-3 rounded-xl w-56 transition-all outline-none focus:border-blue-500"
        />
        <svg
          className="size-6 absolute top-3 right-3 text-gray-500 pointer-events-none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;

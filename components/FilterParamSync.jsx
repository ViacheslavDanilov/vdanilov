"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { notifyFilterParamChange } from "@/lib/useFilterParam";

function SearchParamsListener() {
  const filter = useSearchParams().get("filter");

  useEffect(() => {
    notifyFilterParamChange();
  }, [filter]);

  return null;
}

// Keeps useFilterParam in step with links that change ?filter= through the router
export default function FilterParamSync() {
  return (
    <Suspense fallback={null}>
      <SearchParamsListener />
    </Suspense>
  );
}

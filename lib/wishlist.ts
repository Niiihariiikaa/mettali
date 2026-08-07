import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mettali-wishlist";

function readWishlist(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

/** Tracks whether a product is wishlisted, persisted to localStorage. */
export function useWishlist(name: string) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(readWishlist().has(name));
  }, [name]);

  const toggle = useCallback(() => {
    const set = readWishlist();
    if (set.has(name)) set.delete(name);
    else set.add(name);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
    setWishlisted(set.has(name));
  }, [name]);

  return { wishlisted, toggle };
}

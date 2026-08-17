import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mettali-wishlist";
const CHANGE_EVENT = "mettali-wishlist-change";

function readWishlist(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeWishlist(set: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  // Same-tab components (header badge, wishlist page, other heart buttons)
  // don't see the native "storage" event, so broadcast our own.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Tracks whether a product is wishlisted, persisted to localStorage. */
export function useWishlist(name: string) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const sync = () => setWishlisted(readWishlist().has(name));
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [name]);

  const toggle = useCallback(() => {
    const set = readWishlist();
    if (set.has(name)) set.delete(name);
    else set.add(name);
    writeWishlist(set);
  }, [name]);

  return { wishlisted, toggle };
}

/** All wishlisted product names, kept in sync across components/tabs. */
export function useWishlistNames() {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setNames(Array.from(readWishlist()));
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const remove = useCallback((name: string) => {
    const set = readWishlist();
    set.delete(name);
    writeWishlist(set);
  }, []);

  return { names, remove };
}

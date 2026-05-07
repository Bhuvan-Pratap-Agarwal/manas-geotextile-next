"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type NavigationContextValue = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpenState] = useState(false);

  const setMenuOpen = useCallback((open: boolean) => {
    setMenuOpenState(open);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpenState((o) => !o);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.setAttribute("data-nav-menu", "open");
    } else {
      document.documentElement.removeAttribute("data-nav-menu");
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, toggleMenu }),
    [menuOpen, setMenuOpen, toggleMenu],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return ctx;
}

export function useNavigationOptional(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  return (
    ctx ?? {
      menuOpen: false,
      setMenuOpen: () => {},
      toggleMenu: () => {},
    }
  );
}

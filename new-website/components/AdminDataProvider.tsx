"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  defaultState,
  STORAGE_KEY,
  type Category,
  type HomepageContent,
  type Product,
  type StoreSettings,
  type StoreState,
} from "@/lib/store-data";

export type StoreContextValue = {
  state: StoreState;
  updateProducts: (products: Product[]) => void;
  updateCategories: (categories: Category[]) => void;
  updateHomepage: (homepage: HomepageContent) => void;
  updateSettings: (settings: StoreSettings) => void;
  setState: (nextState: StoreState) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(defaultState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setState(defaultState);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Partial<StoreState>;
      setState({
        products: parsed.products ?? defaultState.products,
        categories: parsed.categories ?? defaultState.categories,
        homepage: parsed.homepage ?? defaultState.homepage,
        settings: parsed.settings ?? defaultState.settings,
      });
    } catch {
      setState(defaultState);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const updateProducts = (products: Product[]) => {
    setState((current) => ({ ...current, products }));
  };

  const updateCategories = (categories: Category[]) => {
    setState((current) => ({ ...current, categories }));
  };

  const updateHomepage = (homepage: HomepageContent) => {
    setState((current) => ({ ...current, homepage }));
  };

  const updateSettings = (settings: StoreSettings) => {
    setState((current) => ({ ...current, settings }));
  };

  const value = useMemo(
    () => ({
      state,
      setState,
      updateProducts,
      updateCategories,
      updateHomepage,
      updateSettings,
    }),
    [state],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStoreData() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreData must be used inside AdminDataProvider");
  }

  return context;
}

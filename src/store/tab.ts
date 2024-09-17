import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Theme } from "../types";
import createSelectors from "./createSelectors";

interface UseTabStore {
  filter: string | null;
  themes: Theme[] | null;
  getFilter: () => void;
  setFilter: (filter: string) => void;
  setTheme: (mockedTheme: Theme[]) => void;
  setCurrentThemeQuestions: () => Theme | undefined;
}

const useTabStore = create<UseTabStore>()(
  devtools(
    (set, get) => ({
      filter: null,
      themes: null,

      getFilter: () => get().filter,
      getTheme: () => get().themes,

      setFilter: (filter: string) => {
        set({ filter }, false, "setFilter");
      },

      setTheme: (mockedTheme: Theme[]) => {
        set({ themes: mockedTheme }, false, "setTheme");
      },

      setCurrentThemeQuestions: () => {
        const themes = get().themes;
        const filter = get().filter;
        const questions = themes?.find((theme) => theme.name === filter)
        return questions;
      },
    }),
    { name: "TabStore" }
  )
);

const useTab = createSelectors(useTabStore);

export default useTab;

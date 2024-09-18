import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Topic } from "../types";
import createSelectors from "./create-selectors";

interface useFilterStore {
  filter: string | null;
  topics: Topic[] | null;
  setFilter: (filter: string) => void;
  setTopics: (topics: Topic[]) => void;
  setCurrentTopicsQuestions: () => Topic | undefined;
}

const useFilterStore = create<useFilterStore>()(
  devtools(
    (set, get) => ({
      filter: null,
      topics: null,

      setFilter: (filter: string) => {
        set({ filter }, false, "setFilter");
      },

      setTopics: (mockedTopics: Topic[]) => {
        set({ topics: mockedTopics }, false, "setTopics");
      },

      setCurrentTopicsQuestions: () => {
        const topics = get().topics;
        const filter = get().filter;
        const questions = topics?.find((topic) => topic.name === filter);
        return questions;
      },
    }),
    { name: "TabStore" }
  )
);

const useFilter = createSelectors(useFilterStore);

export default useFilter;

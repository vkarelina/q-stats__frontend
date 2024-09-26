import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Topic } from "../types";
import createSelectors from "./create-selectors";
import { topics } from "../mock-data";

interface UseTopicStore {
  filter: Topic | null;
  topics: Topic[] | null;

  fetchTopics: () => void;
  setFilter: (filter: Topic) => void;
}

const useTopicStore = create<UseTopicStore>()(
  devtools(
    (set) => ({
      filter: null,
      topics: null,

      fetchTopics: () => {
        set({ topics }, false, "setTopics");
      },

      setFilter: (filter: Topic) => {
        set({ filter }, false, "setFilter");
      },
    }),
    { name: "TopicStore" }
  )
);

const useTopic = createSelectors(useTopicStore);

export default useTopic;

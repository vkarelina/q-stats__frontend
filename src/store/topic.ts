import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Topic } from "../types";
import createSelectors from "./create-selectors";
import { fetchTopics } from "../api";

interface UseTopicStore {
  topic: Topic | null;
  topics: Topic[] | null;

  fetchTopics: () => void;
  fetchTopic: (topic: Topic) => void;
}

const useTopicStore = create<UseTopicStore>()(
  devtools(
    (set) => ({
      topic: null,
      topics: null,

      fetchTopics: () => {
        const topics = fetchTopics();
        set({ topics }, false, "fetchTopics");
      },

      fetchTopic: (topic: Topic) => {
        set({ topic }, false, "fetchTopic");
      },
    }),
    { name: "TopicStore" }
  )
);

const useTopic = createSelectors(useTopicStore);

export default useTopic;

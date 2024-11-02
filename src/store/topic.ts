import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { fetchTopic, fetchTopics } from '../api';
import { Topic } from '../types';
import createSelectors from './create-selectors';

interface UseTopicStore {
  topics: Topic[];
  topic: Topic | null;

  fetchTopics: () => void;
  fetchTopic: (id: number) => void;
}

const useTopicStore = create<UseTopicStore>()(
  devtools(
    (set, get) => ({
      topics: [],
      topic: null,

      fetchTopics: async () => {
        const topics = await fetchTopics();
        set({ topics }, false, 'fetchTopics');
      },

      fetchTopic: async (id: number) => {
        const topicId = get().topic?.id;

        if (topicId !== id) {
          const topic = await fetchTopic(id);
          set({ topic }, false, 'fetchTopic');
        } else {
          set({ topic: null }, false, 'fetchTopic');
        }
      },
    }),
    { name: 'TopicStore' },
  ),
);

const useTopic = createSelectors(useTopicStore);

export default useTopic;

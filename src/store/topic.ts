import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Topic } from '../types';
import createSelectors from './create-selectors';
import { fetchTopic, fetchTopics } from '../api/topic';

interface UseTopicStore {
  topics: Topic[];
  topic: Topic | null;

  fetchTopics: () => void;
  fetchTopic: (id: number) => void;
}

const useTopicStore = create<UseTopicStore>()(
  devtools(
    (set) => ({
      topics: [],
      topic: null,

      fetchTopics: async () => {
        const topics = await fetchTopics();
        set({ topics }, false, 'fetchTopics');
      },

      fetchTopic: async (id) => {
        const topic = await fetchTopic(id);
        set({ topic }, false, 'fetchTopic');
      },
    }),
    { name: 'TopicStore' },
  ),
);

const useTopic = createSelectors(useTopicStore);

export default useTopic;

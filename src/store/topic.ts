import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Topic } from '../types';
import createSelectors from './create-selectors';
import { fetchTopics } from '../api';

interface UseTopicStore {
  topic: Topic | null;
  topics: Topic[];

  fetchTopics: () => void;
  fetchCurrentTopic: (topic: Topic) => void;
  fetchClearCurrentTopic: () => void;
}

const useTopicStore = create<UseTopicStore>()(
  devtools(
    (set) => ({
      topic: null,
      topics: [],

      fetchTopics: () => {
        const topics = fetchTopics();
        set({ topics }, false, 'fetchTopics');
      },

      fetchCurrentTopic: (topic: Topic) => {
        set({ topic }, false, 'fetchCurrentTopic');
      },

      fetchClearCurrentTopic: () => {
        set({ topic: null }, false, 'fetchClearCurrentTopic');
      }
    }),
    { name: 'TopicStore' },
  ),
);

const useTopic = createSelectors(useTopicStore);

export default useTopic;

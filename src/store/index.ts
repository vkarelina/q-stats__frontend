import { create } from "zustand";

import useUserStore from "./user";
import useTabStore from "./tab";

interface RootStore {
  userStore: typeof useUserStore;
  tabStore: typeof useTabStore;
}

const useRootStore = create<RootStore>(() => ({
  userStore: useUserStore,
  tabStore: useTabStore,
}));

export default useRootStore;

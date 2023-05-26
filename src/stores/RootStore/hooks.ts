import { useRootStore } from './context';

export const useAuthStore = () => useRootStore().authStore;

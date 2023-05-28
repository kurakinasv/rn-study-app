import { useRootStore } from './context';

export const useAuthStore = () => useRootStore().authStore;
export const useNotesStore = () => useRootStore().notesStore;
export const useMemoStore = () => useRootStore().memoStore;

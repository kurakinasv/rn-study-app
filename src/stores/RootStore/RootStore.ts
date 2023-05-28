import AuthStore from '@stores/AuthStore';
import MemoStore from '@stores/MemoStore';
import NotesStore from '@stores/NotesStore';

class RootStore {
  authStore = new AuthStore(this);
  notesStore = new NotesStore(this);
  memoStore = new MemoStore(this);
}

export default RootStore;

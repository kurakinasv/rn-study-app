import AuthStore from '@stores/AuthStore';
import NotesStore from '@stores/NotesStore';

class RootStore {
  authStore = new AuthStore(this);
  notesStore = new NotesStore(this);
}

export default RootStore;

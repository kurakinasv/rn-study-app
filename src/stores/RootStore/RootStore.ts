import AuthStore from '@stores/AuthStore';
import MemoStore from '@stores/MemoStore';
import NotesStore from '@stores/NotesStore';
import NotificationService from '@stores/NotificationService';

class RootStore {
  authStore = new AuthStore(this);
  notesStore = new NotesStore(this);
  memoStore = new MemoStore(this);
  notificationStore = new NotificationService(this);
}

export default RootStore;

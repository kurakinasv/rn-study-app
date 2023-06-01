import AuthStore from '@stores/AuthStore';
import GroupsStore from '@stores/GroupsStore';
import MemoStore from '@stores/MemoStore';
import NotesStore from '@stores/NotesStore';
import NotificationService from '@stores/NotificationService';

class RootStore {
  authStore = new AuthStore(this);
  notesStore = new NotesStore(this);
  memoStore = new MemoStore(this);
  notificationStore = new NotificationService(this);
  groupsStore = new GroupsStore(this);
}

export default RootStore;

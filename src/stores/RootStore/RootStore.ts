import AuthStore from '@stores/AuthStore';

class RootStore {
  authStore = new AuthStore(this);
}

export default RootStore;

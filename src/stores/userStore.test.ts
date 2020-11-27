import { RootStore, UserStore } from '.';
import { UserStoreError } from '../errors';

describe('question store', () => {
    let store: UserStore;

    beforeEach(() => {
        const rootStore = new RootStore();
        store = rootStore.userStore;
    });

    it('should hold ref to root store', () => {
        expect(store).toHaveProperty('rootStore');
        expect(store.rootStore).toBeDefined();
        expect(store.rootStore).toBeInstanceOf(RootStore);
    });

    it('should set ERROR', () => {
        expect(store.ERROR).toBe(UserStoreError);
    });
});

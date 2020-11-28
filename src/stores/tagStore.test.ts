import { RootStore, TagStore } from '.';
import { TagStoreError } from '../errors';

describe('tag store', () => {
    let store: TagStore;

    beforeEach(() => {
        const rootStore = new RootStore();
        store = rootStore.tagStore;
    });

    it('should hold ref to root store', () => {
        expect(store).toHaveProperty('rootStore');
        expect(store.rootStore).toBeDefined();
        expect(store.rootStore).toBeInstanceOf(RootStore);
    });

    it('should set ERROR', () => {
        expect(store.ERROR).toBe(TagStoreError);
    });
});

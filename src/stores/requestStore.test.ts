import { RootStore, RequestStore } from '.';
import { RequestStoreError } from '../errors';

describe('request store', () => {
    let store: RequestStore;

    beforeEach(() => {
        const rootStore = new RootStore();
        store = rootStore.requestStore;
    });

    it('should hold ref to root store', () => {
        expect(store).toHaveProperty('rootStore');
        expect(store.rootStore).toBeDefined();
        expect(store.rootStore).toBeInstanceOf(RootStore);
    });

    it('should set ERROR', () => {
        expect(store.ERROR).toBe(RequestStoreError);
    });
});

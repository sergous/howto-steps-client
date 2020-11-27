import { RootStore, StepStore } from '.';
import { StepStoreError } from '../errors';

describe('step store', () => {
    let store: StepStore;

    beforeEach(() => {
        const rootStore = new RootStore();
        store = rootStore.stepStore;
    });

    it('should hold ref to root store', () => {
        expect(store).toHaveProperty('rootStore');
        expect(store.rootStore).toBeDefined();
        expect(store.rootStore).toBeInstanceOf(RootStore);
    });

    it('should set ERROR', () => {
        expect(store.ERROR).toBe(StepStoreError);
    });
});

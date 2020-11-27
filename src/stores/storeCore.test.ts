import { StoreCore, RootStore } from '.';
import { StoreCoreError } from '../errors';

describe('StoreCore', () => {
    let storeCore: StoreCore;
    beforeEach(() => {
        const rootStore = new RootStore();
        storeCore = new StoreCore(rootStore);
    });

    it('should set ERROR', () => {
        expect(storeCore.ERROR).toBe(StoreCoreError);
    });
});

import { StoreCore, RootStore } from '.';
import { createSolutionApiMock } from '../api';
import { StoreCoreError } from '../errors';

describe('StoreCore', () => {
    let storeCore: StoreCore;
    beforeEach(() => {
        const rootStore = new RootStore();
        storeCore = new StoreCore(rootStore, createSolutionApiMock());
    });

    it('should set ERROR', () => {
        expect(storeCore.ERROR).toBe(StoreCoreError);
    });
});

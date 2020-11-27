import { StoreCore, RootStore } from '.';
import { createSpyObj } from '../utils';
import { StoreCoreError } from '../errors';
import { ApiModel, ParseObject } from '../models';

describe('StoreCore', () => {
    let store: StoreCore;
    const apiMock = createSpyObj('ApiMockSpy', [
        'saveOne',
        'updateOneAttr',
        'deleteOne',
        'deleteListItem',
        'findAll',
    ]);

    beforeEach(() => {
        const rootStore = new RootStore();
        store = new StoreCore(rootStore, <ApiModel>(<unknown>apiMock));
        apiMock.deleteOne.mockReturnValue(Promise.resolve);
    });

    it('should hold ref to root store', () => {
        expect(store).toHaveProperty('rootStore');
        expect(store.rootStore).toBeDefined();
        expect(store.rootStore).toBeInstanceOf(RootStore);
    });

    it('should save an item', async () => {
        const item = new ParseObject();
        await store.saveOne(item);
        expect(apiMock.saveOne).toHaveBeenCalled();
        expect(store.items).toContain(item);
    });

    it('should update an item', () => {
        const item = new ParseObject();
        const query = 'When is the best place?';
        store.updateOneAttr(item, 'query', query);
        expect(apiMock.updateOneAttr).toHaveBeenCalled();
    });

    // TODO: test update item field value in store

    it('should delete an item', async () => {
        const item = new ParseObject();
        await store.deleteOne(item);
        expect(apiMock.deleteOne).toHaveBeenCalled();
        expect(apiMock.deleteListItem).toHaveBeenCalled();
    });

    it('should set ERROR', () => {
        expect(store.ERROR).toBe(StoreCoreError);
    });
});

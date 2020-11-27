import { RootStore, SolutionStore } from '.';
import { SolutionModel, QuestionModel } from '../models';
import { SolutionStoreError } from '../errors';
import { createSpyObj } from '../utils';
import { SolutionApi } from '../api';

describe('solution store', () => {
    let store: SolutionStore;
    const apiMock = createSpyObj('SolutionApiSpy', [
        'createOne',
        'updateOneAttr',
        'deleteOne',
        'deleteListItem',
        'findAll',
    ]);

    beforeEach(() => {
        store = new SolutionStore(new RootStore(), <SolutionApi>(
            (<unknown>apiMock)
        ));
    });

    it('should set ERROR', () => {
        expect(store.ERROR).toBe(SolutionStoreError);
    });

    it('should hold ref to root store', () => {
        expect(store).toHaveProperty('rootStore');
        expect(store.rootStore).toBeDefined();
        expect(store.rootStore).toBeInstanceOf(RootStore);
    });

    it('should create a solution', () => {
        const question = new QuestionModel();
        store.createOne(question);
        expect(apiMock.createOne).toHaveBeenCalled();
    });

    it('should update a question', () => {
        const solution = new SolutionModel();
        const question = new QuestionModel();
        store.updateOneAttr(solution, 'question', question);
        expect(apiMock.updateOneAttr).toHaveBeenCalled();
    });

    it('should delete a question', async () => {
        const solution = new SolutionModel();
        await store.deleteOne(solution);
        expect(apiMock.deleteOne).toHaveBeenCalled();
        expect(apiMock.deleteListItem).toHaveBeenCalled();
    });
});

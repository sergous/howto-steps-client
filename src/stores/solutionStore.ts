import { StoreCore, RootStore } from '.';
import { SolutionModel, QuestionModel, ParseObject } from '../models';
import { SolutionStoreError } from '../errors';
import { observable, computed, action, runInAction } from 'mobx';
import { SolutionApi } from '../api';

export class SolutionStore extends StoreCore {
    ERROR = SolutionStoreError;

    constructor(rootStore: RootStore, api: SolutionApi) {
        super(rootStore, api);
    }

    @observable solutionQuery = '';

    set solutions(solutions: SolutionModel[]) {
        this.items = solutions;
    }

    get solutions(): SolutionModel[] {
        return <SolutionModel[]>this.items;
    }

    @action
    async createOne(question: QuestionModel): Promise<ParseObject> {
        const solution = new SolutionModel();
        super.updateOneAttr(solution, 'question', question);
        return await super.saveOne(solution);
    }

    @action
    readonly search = (query: string) => {
        this.solutionQuery = query;
    };

    @computed
    get foundSolutions() {
        return this.solutionsWithQuestion.filter(
            (s: SolutionModel) =>
                s.attributes.question.attributes!.query === this.solutionQuery
        );
    }

    @computed
    get solutionsWithQuestion() {
        return this.solutions.filter(
            (s: SolutionModel) => !!s.attributes.question
        );
    }

    @action
    async createFromQuery() {
        const question = await this.rootStore.questionStore.createOne(
            this.solutionQuery
        );
        runInAction(() => {
            super.saveOne(question);
        });
    }
}

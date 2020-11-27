import { StoreCore, RootStore } from '.';
import { SolutionModel, QuestionModel } from '../models';
import { SolutionStoreError } from '../errors';
import { observable, computed, action, runInAction } from 'mobx';
import { SolutionApi } from '../api';

export class SolutionStore extends StoreCore {
    ERROR = SolutionStoreError;

    constructor(rootStore: RootStore, private api: SolutionApi) {
        super(rootStore);
    }

    @observable solutionQuery = '';

    set solutions(solutions: SolutionModel[]) {
        this.items = solutions;
    }

    get solutions(): SolutionModel[] {
        return <SolutionModel[]>this.items;
    }

    @action
    async createOne(question: QuestionModel): Promise<SolutionModel> {
        const solution = await this.api.createOne(question);
        runInAction(() => {
            this.solutions.push(solution);
        });
        return solution;
    }

    @action
    updateOneAttr(solution: SolutionModel, name: string, value: any) {
        this.api.updateOneAttr(solution, name, value);
    }

    @action
    async deleteOne(solution: SolutionModel) {
        await this.api.deleteOne(solution);
        runInAction(() => {
            this.api.deleteListItem(this.solutions, solution);
        });
    }

    @action
    async fetchAll() {
        const solutions = await this.api.findAll();
        runInAction(() => {
            this.solutions = solutions;
        });
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
            this.createOne(question);
        });
    }
}

import { StoreCore } from '.';
import { SolutionModel, QuestionModel, ParseObject } from '../models';
import { SolutionStoreError } from '../errors';
import { observable, computed, action, runInAction } from 'mobx';

export class SolutionStore extends StoreCore {
    ERROR = SolutionStoreError;
    items: SolutionModel[] = [];

    @observable solutionQuery = '';

    set solutions(solutions: SolutionModel[]) {
        this.items = solutions;
    }

    get solutions(): SolutionModel[] {
        return this.items as SolutionModel[];
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

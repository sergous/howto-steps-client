import { StoreCore } from '.';
import { SolutionModel, QuestionModel, ParseObject } from '../models';
import { SolutionStoreError } from '../errors';
import { observable, computed, action, runInAction } from 'mobx';

export class SolutionStore extends StoreCore {
    ERROR = SolutionStoreError;

    @observable solutionQuery = '';

    set solutions(solutions: SolutionModel[]) {
        this.items = solutions;
    }

    @observable
    get solutions(): SolutionModel[] {
        return this.items as SolutionModel[];
    }

    @action
    async createOne(question: QuestionModel): Promise<ParseObject> {
        const solution = new SolutionModel();
        this.updateOneAttr(solution, 'question', question);
        return await this.saveOne(solution);
    }

    @action
    async search(query: string) {
        this.solutionQuery = query;
        this.items = await this.api.findAll();
    }

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
            this.saveOne(question);
        });
    }
}

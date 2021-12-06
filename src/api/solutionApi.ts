import Parse from 'parse';
import { ParseMobx } from 'parse-mobx';
import { action } from 'mobx';
import { QuestionModel, SolutionModel } from '../models';

const SOLUTION = 'Solution';
const Solution = Parse.Object.extend(SOLUTION);

export class SolutionApi {
    constructor(
        private solution = new Solution(),
        private query = new Parse.Query(SOLUTION),
        private parseMobx: any = ParseMobx
    ) {}

    @action
    async createOne(question: QuestionModel) {
        await this.solution.set('question', question).save();
        return this.parseMobx.toParseMobx(this.solution);
    }

    @action
    async updateOneAttr(solution: SolutionModel, name: string, value: any) {
        return await solution.set(name, value).save();
    }

    @action
    async deleteOne(solution: SolutionModel) {
        return await solution.destroy();
    }

    @action
    async deleteListItem(solutions: SolutionModel[], solution: SolutionModel) {
        await this.parseMobx.deleteListItem(solutions, solution);
    }

    @action
    async findAll() {
        return this.findByQuery('');
    }

    @action
    async findByQuery(query: string) {
        const solutions = await this.query.find(query);
        return this.parseMobx.toParseMobx(solutions);
    }
}

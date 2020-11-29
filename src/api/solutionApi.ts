import { action } from 'mobx';
import { QuestionModel, ApiModel, solutionQuery, Solution } from '../models';
import { ParseMobx } from '.';

export class SolutionApi extends ApiModel {
    constructor(
        private solution = new Solution(),
        query = solutionQuery,
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(question: QuestionModel): Promise<typeof Solution> {
        await this.solution.set('question', question).save();
        return this.parseMobx.toParseMobx(this.solution);
    }
}

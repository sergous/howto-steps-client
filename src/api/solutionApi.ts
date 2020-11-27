import { action } from 'mobx';
import { QuestionModel, ApiModel } from '../models';
import { Parse, ParseMobx } from '.';

const SOLUTION = 'Solution';
const Solution = Parse.Object.extend(SOLUTION);

export class SolutionApi extends ApiModel {
    constructor(
        private solution = new Solution(),
        query = new Parse.Query(SOLUTION),
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

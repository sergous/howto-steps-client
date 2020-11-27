import { action } from 'mobx';
import { ApiModel } from '../models';
import { Parse, ParseMobx } from '.';

const QUESTION = 'Question';
const Question = Parse.Object.extend(QUESTION);

export class QuestionApi extends ApiModel {
    constructor(
        private question = new Question(),
        query = new Parse.Query(QUESTION),
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(query: string): Promise<typeof Question> {
        await this.question.set('query', query).save();
        return this.parseMobx.toParseMobx(this.question);
    }
}

import { action } from 'mobx';
import { ApiModel, Question, questionQuery } from '../models';
import { ParseMobx } from '.';

export class QuestionApi extends ApiModel {
    constructor(
        private question = new Question(),
        query = questionQuery,
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

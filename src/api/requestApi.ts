import { action } from 'mobx';
import { ApiModel, QuestionModel } from '../models';
import { Parse, ParseMobx } from '.';

const QUESTION_REQUEST = 'QuestionRequest';
const QuestionRequest = Parse.Object.extend(QUESTION_REQUEST);

export class QuestionRequestApi extends ApiModel {
    constructor(
        private request = new QuestionRequest(),
        query = new Parse.Query(QUESTION_REQUEST),
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(question: QuestionModel): Promise<typeof QuestionRequest> {
        await this.request.set('question', question).save();
        return this.parseMobx.toParseMobx(this.request);
    }
}

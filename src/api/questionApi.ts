import Parse from 'parse';
import { ParseMobx } from 'parse-mobx';
import { action } from 'mobx';
import { QuestionModel } from '../models';

const QUESTION = 'Question';
const Question = Parse.Object.extend(QUESTION);

export class QuestionApi {
    constructor(
      private question = new Question(),
      private query = new Parse.Query(QUESTION),
      public parseMobx: any = ParseMobx) {
    }

    @action
    async createOne(query: string) {
        await this.question.set('query', query).save()
        return this.parseMobx.toParseMobx(this.question);
    }

    @action
    async updateOneAttr(question: QuestionModel, name: string, value: any) {
        return await question.set(name, value).save();
    }

    @action
    async deleteOne(question: QuestionModel) {
        return await question.destroy();
    }

    @action
    async deleteListItem(questions: QuestionModel[], question: QuestionModel) {
        await this.parseMobx.deleteListItem(questions, question);
    }

    @action
    async findAll() {
        const questions = await this.query.find();
        return this.parseMobx.toParseMobx(questions);
    }
}

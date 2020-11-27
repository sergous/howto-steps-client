import { action } from 'mobx';
import { ApiModel } from '../models';
import { Parse, ParseMobx } from '.';

const ANSWER = 'Answer';
const Answer = Parse.Object.extend(ANSWER);

export class AnswerApi extends ApiModel {
    constructor(
        private answer = new Answer(),
        query = new Parse.Query(ANSWER),
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(name: string): Promise<typeof Answer> {
        await this.answer.set('name', name).save();
        return this.parseMobx.toParseMobx(this.answer);
    }
}

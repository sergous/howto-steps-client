import { action } from 'mobx';
import { ApiModel } from '../models';
import { Parse, ParseMobx } from '.';

const STEP = 'Step';
const Step = Parse.Object.extend(STEP);

export class StepApi extends ApiModel {
    constructor(
        private step = new Step(),
        query = new Parse.Query(STEP),
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(name: string): Promise<typeof Step> {
        await this.step.set('name', name).save();
        return this.parseMobx.toParseMobx(this.step);
    }
}

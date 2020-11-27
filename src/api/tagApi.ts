import { action } from 'mobx';
import { ApiModel } from '../models';
import { Parse, ParseMobx } from '.';

const TAG = 'Tag';
const Tag = Parse.Object.extend(TAG);

export class TagApi extends ApiModel {
    constructor(
        private tag = new Tag(),
        query = new Parse.Query(TAG),
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(name: string): Promise<typeof Tag> {
        await this.tag.set('name', name).save();
        return this.parseMobx.toParseMobx(this.tag);
    }
}

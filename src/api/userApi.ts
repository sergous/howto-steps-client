import { action } from 'mobx';
import { ApiModel } from '../models';
import { Parse, ParseMobx } from '.';

const USER = 'User';
const User = Parse.Object.extend(USER);

export class UserApi extends ApiModel {
    constructor(
        private user = new User(),
        query = new Parse.Query(USER),
        parseMobx: any = ParseMobx
    ) {
        super(query, parseMobx);
    }

    @action
    async createOne(name: string): Promise<typeof User> {
        await this.user.set('name', name).save();
        return this.parseMobx.toParseMobx(this.user);
    }
}

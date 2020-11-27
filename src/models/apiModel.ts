import { action } from 'mobx';
import { ParseObject } from '.';

export class ApiModel {
    constructor(protected query: any, protected parseMobx: any) {}

    @action
    updateOneAttr(item: ParseObject, name: string, value: any) {
        return item.set(name, value);
    }

    @action
    async saveOne(item: ParseObject): Promise<ParseObject> {
        return await item.save();
    }

    @action
    async deleteOne(item: ParseObject) {
        return await item.destroy();
    }

    @action
    async deleteListItem(items: ParseObject[], item: ParseObject) {
        await this.parseMobx.deleteListItem(items, item);
    }

    @action
    async findAll() {
        const items = await this.query.find();
        return this.parseMobx.toParseMobx(items);
    }
}

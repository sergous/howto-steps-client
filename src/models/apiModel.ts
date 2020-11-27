import { action } from 'mobx';
import { ParseObject } from '.';

export class ApiModel {
    constructor(protected query: any, protected parseMobx: any) {}

    @action
    async createOne(data: any): Promise<any> {}

    @action
    async updateOneAttr(solution: ParseObject, name: string, value: any) {
        return await solution.set(name, value).save();
    }

    @action
    async deleteOne(solution: ParseObject) {
        return await solution.destroy();
    }

    @action
    async deleteListItem(solutions: ParseObject[], solution: ParseObject) {
        await this.parseMobx.deleteListItem(solutions, solution);
    }

    @action
    async findAll() {
        const solutions = await this.query.find();
        return this.parseMobx.toParseMobx(solutions);
    }
}

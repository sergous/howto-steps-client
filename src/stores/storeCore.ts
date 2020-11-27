import { ApiModel, ParseObject } from '../models';
import { action, runInAction } from 'mobx';

import { StoreCoreError } from '../errors';
import { RootStore } from '.';

// TODO: Implement method placeholders
export class StoreCore {
    ERROR = StoreCoreError;
    rootStore: RootStore;
    api: ApiModel;
    items: ParseObject[] = [];

    constructor(rootStore: RootStore, api: ApiModel) {
        this.rootStore = rootStore;
        this.api = api;
    }

    @action
    async saveOne(item: ParseObject) {
        await this.api.saveOne(item);
        runInAction(() => {
            this.items.push(item);
        });
        return item;
    }

    create(item: ParseObject) {}
    remove(item: ParseObject) {}

    @action
    updateOneAttr(item: ParseObject, name: string, value: any) {
        this.api.updateOneAttr(item, name, value);
        // TODO: update item in store
    }

    @action
    async deleteOne(item: ParseObject) {
        await this.api.deleteOne(item);
        runInAction(() => {
            this.api.deleteListItem(this.items, item);
            // TODO: delete item from store
        });
    }

    @action
    async fetchAll() {
        const questions = await this.api.findAll();
        runInAction(() => {
            this.items = questions;
        });
    }
}

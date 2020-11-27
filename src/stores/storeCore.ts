import { ParseObject } from '../models';
import { action } from 'mobx';

import { StoreCoreError } from '../errors';
import { RootStore } from '.';

// TODO: Implement method placeholders
export class StoreCore {
    ERROR = StoreCoreError;
    rootStore: RootStore;
    items: ParseObject[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    create(item: ParseObject) {}

    remove(item: ParseObject) {}

    @action
    updateOneAttr(item: ParseObject, name: string, value: any) {}

    @action
    async deleteOne(item: ParseObject) {}

    @action
    async fetchAll() {}
}

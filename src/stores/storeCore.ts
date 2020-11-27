import { ApiModel, ItemModel, ItemsModel, ParseObject } from '../models';
import { action, runInAction } from 'mobx';

import { StoreCoreError } from '../errors';
import { RootStore } from '.';

export class StoreCore {
    ERROR = StoreCoreError;
    rootStore: RootStore;
    items: ParseObject[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    set questions(questions: ParseObject[]) {
        this.items = questions;
    }

    get questions(): ParseObject[] {
        return <ParseObject[]>this.items;
    }

    // TODO: Remove method placeholders after ItemModel removal
    create(item: ItemModel) {}
    remove(item: ItemModel) {}

    @action
    updateOneAttr(question: ParseObject, name: string, value: any) {}

    @action
    async deleteOne(question: ParseObject) {}

    @action
    async fetchAll() {}
}

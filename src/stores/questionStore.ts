import { ParseObject } from '../models';
import { StoreCore, RootStore } from '.';
import { QuestionModel } from '../models';
import { QuestionStoreError } from '../errors';
import { action } from 'mobx';
import { QuestionApi } from '../api';

export class QuestionStore extends StoreCore {
    ERROR = QuestionStoreError;

    constructor(rootStore: RootStore, api: QuestionApi) {
        super(rootStore, api);
    }

    set questions(questions: QuestionModel[]) {
        this.items = questions;
    }

    get questions(): QuestionModel[] {
        return <QuestionModel[]>this.items;
    }

    @action
    async createOne(query: string): Promise<ParseObject> {
        const question = new QuestionModel();
        super.updateOneAttr(question, 'query', query);
        return await super.saveOne(<ParseObject>question);
    }
}

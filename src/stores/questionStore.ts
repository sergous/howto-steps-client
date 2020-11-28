import { ParseObject } from '../models';
import { StoreCore } from '.';
import { QuestionModel } from '../models';
import { QuestionStoreError } from '../errors';
import { action } from 'mobx';

export class QuestionStore extends StoreCore {
    ERROR = QuestionStoreError;

    set questions(questions: QuestionModel[]) {
        this.items = questions;
    }

    get questions(): QuestionModel[] {
        return this.items as QuestionModel[];
    }

    @action
    async createOne(query: string): Promise<ParseObject> {
        const question = new QuestionModel();
        super.updateOneAttr(question, 'query', query);
        return await super.saveOne(question as ParseObject);
    }
}

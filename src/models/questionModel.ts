import { observable } from 'mobx';
import { QuestionModelError } from '../errors';
import { Parse } from '.';

class QuestionAttributes {
    @observable query: string = '';
}

export class QuestionModel extends Parse.Object {
    @observable get attributes(): QuestionAttributes {
        return super.attributes;
    }

    static ERROR = QuestionModelError;
}

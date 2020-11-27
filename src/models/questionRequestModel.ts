import { Parse, QuestionModel, TagModel } from '.';
import { observable } from 'mobx';
import { RequestModelError } from '../errors';

class QuestionRequestAttributes {
    @observable question: QuestionModel = new QuestionModel();
    @observable tags: TagModel[] = [];
}

export class QuestionRequestModel extends Parse.Object {
    @observable get attributes(): QuestionRequestAttributes {
        return super.attributes;
    }

    ERROR = RequestModelError;
}

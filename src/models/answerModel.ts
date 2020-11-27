import { Parse, TagModel, StepModel } from '.';
import { observable } from 'mobx';
import { AnswerModelError } from '../errors';

class AnswerAttributes {
    @observable steps: StepModel[] = [];
    @observable tags: TagModel[] = [];
}

export class AnswerModel extends Parse.Object {
    @observable get attributes(): AnswerAttributes {
        return super.attributes;
    }

    ERROR = AnswerModelError;
}

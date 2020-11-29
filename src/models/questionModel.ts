import { observable } from 'mobx';
import { QuestionModelError } from '../errors';
import { Parse } from '.';

const QUESTION = 'Question';
export const Question = Parse.Object.extend(QUESTION);
export const questionQuery = new Parse.Query(QUESTION);

export class QuestionAttributes {
    @observable query: string = '';
}

export class QuestionModel extends Question {
    @observable get attributes(): QuestionAttributes {
        return super.attributes;
    }

    static ERROR = QuestionModelError;
}

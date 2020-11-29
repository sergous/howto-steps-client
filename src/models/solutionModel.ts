import { QuestionModel, AnswerModel, StatusModel, Parse } from '.';
import { observable } from 'mobx';
import { SolutionModelError } from '../errors';

const SOLUTION = 'Solution';
export const Solution = Parse.Object.extend(SOLUTION);
export const solutionQuery = new Parse.Query(SOLUTION);

export class SolutionAttributes {
    @observable question = new QuestionModel();
    @observable status = new StatusModel();
    @observable answers: AnswerModel[] = [];
}

export class SolutionModel extends Parse.Object {
    @observable get attributes(): SolutionAttributes {
        return super.attributes;
    }

    static ERROR = SolutionModelError;
}

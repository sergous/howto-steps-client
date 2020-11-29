import Parse from 'parse';
import { QuestionModel, AnswerModel, StatusModel } from '.';
import { observable } from 'mobx';
import { SolutionModelError } from '../errors';

class SolutionAttributes {
    @observable question = new QuestionModel();
    @observable status = new StatusModel();
    @observable answers: AnswerModel[] = [];
}

export class SolutionModel extends Parse.Object {
    static ERROR = SolutionModelError;

    @observable attributes = new SolutionAttributes();
}

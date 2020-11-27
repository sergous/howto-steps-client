import { Parse, SolutionModel } from '.';
import { observable } from 'mobx';
import { StepModelError } from '../errors';

export class StepModelAttributes {
    @observable name: string = '';
    @observable description: string = '';
    @observable solutions: SolutionModel[] = [];
}

export class StepModel extends Parse.Object {
    get attributes(): StepModelAttributes {
        return super.attributes;
    }

    ERROR = StepModelError;
}

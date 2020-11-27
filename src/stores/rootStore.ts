import {
    UiStore,
    QuestionStore,
    SolutionStore,
    AnswerStore,
    StepStore,
    TagStore,
    RequestStore,
} from '.';
import { UserStore } from './userStore';
import {
    AnswerApi,
    QuestionApi,
    SolutionApi,
    StepApi,
    TagApi,
    UserApi,
} from '../api';

export class RootStore {
    uiStore: UiStore;
    questionStore: QuestionStore;
    solutionStore: SolutionStore;
    answerStore: AnswerStore;
    stepStore: StepStore;
    userStore: UserStore;
    tagStore: TagStore;
    requestStore: RequestStore;

    constructor() {
        this.uiStore = new UiStore(this);
        this.questionStore = new QuestionStore(this, new QuestionApi());
        this.solutionStore = new SolutionStore(this, new SolutionApi());
        this.answerStore = new AnswerStore(this, new AnswerApi());
        this.stepStore = new StepStore(this, new StepApi());
        this.userStore = new UserStore(this, new UserApi());
        this.tagStore = new TagStore(this, new TagApi());
        this.requestStore = new RequestStore(this, new QuestionApi());
    }
}

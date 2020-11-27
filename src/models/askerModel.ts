import { RoleUserModel, QuestionModel, ItemsModel } from '.';
import { SolutionModel } from './solutionModel';

export class AskerModel extends RoleUserModel {
    questions = new ItemsModel();
    solutions = new ItemsModel();
    role_ = AskerModel.ROLE.Asker;

    askQuestion(question: QuestionModel) {
        this.questions.add(question);
    }

    acceptSolution(solution: SolutionModel) {
        const question = solution.attributes.question;
        this.questions.remove(question);
        this.solutions.add(solution);
    }
}

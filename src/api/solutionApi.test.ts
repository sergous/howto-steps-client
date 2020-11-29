import { createSolutionApiMock, createParseQuestionMock } from '.';

describe('SolutionApi', () => {
    let api: any;

    beforeEach(() => {
        api = createSolutionApiMock();
    });

    it('should create solution', async () => {
        const question = createParseQuestionMock();

        await api.createOne(question);

        expect(api.solution.set).toHaveBeenCalled();
        expect(api.parseMobx.toParseMobx).toHaveBeenCalled();
    });

    it("should update one solution's attribute", () => {
        const question = createParseQuestionMock();

        api.updateOneAttr(api.solution, 'question', question);

        expect(api.solution.set).toHaveBeenCalled();
    });

    it('should delete one solution', () => {
        api.deleteOne(api.solution);

        expect(api.solution.destroy).toHaveBeenCalled();
    });

    it('should delete solutions list item', () => {
        api.deleteListItem([api.solutions], api.solution);

        expect(api.parseMobx.deleteListItem).toHaveBeenCalled();
    });

    it('should find all solutions', async () => {
        await api.findAll();

        expect(api.query.find).toHaveBeenCalled();
        expect(api.parseMobx.toParseMobx).toHaveBeenCalled();
    });
});

import { createParseQueryMock, createParseMobxMock } from '.';
import { SolutionApi } from '.';

export const createParseSolutionMock = () => ({
    set: jest.fn().mockReturnValue({
        save: jest.fn().mockReturnValue(Promise.resolve),
    }),
    destroy: jest.fn().mockReturnValue(Promise.resolve),
});

export const createSolutionApiMock = () => {
    const api = new SolutionApi(
        createParseSolutionMock(),
        createParseQueryMock(),
        createParseMobxMock()
    );
    return api;
};

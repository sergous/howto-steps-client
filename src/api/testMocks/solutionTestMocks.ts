import {
    createParseQueryMock,
    createParseMobxMock,
    createParseObjectMock,
} from '.';
import { SolutionApi } from '..';
import { ApiModel } from '../../models';

export const createSolutionApiMock = (): ApiModel => {
    const api = new SolutionApi(
        createParseObjectMock(),
        createParseQueryMock(),
        createParseMobxMock()
    );
    return api;
};

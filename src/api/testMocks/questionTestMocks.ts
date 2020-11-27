import {
    createParseQueryMock,
    createParseMobxMock,
    createParseObjectMock,
} from '.';
import { QuestionApi } from '..';
import { ApiModel } from '../../models';

export const createQuestionApiMock = (): ApiModel => {
    const api = new QuestionApi(
        createParseObjectMock(),
        createParseQueryMock(),
        createParseMobxMock()
    );
    return api;
};

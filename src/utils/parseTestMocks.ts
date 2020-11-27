import { createSpyObj } from '.';

export const createParseMock = () => ({
    Query: jest.fn(),
    Object: {
        extend: jest.fn(),
    },
});

export const createParseMobxMock = () =>
    createSpyObj('parseMobxSpy', ['toParseMobx', 'deleteListItem']);

export const createParseQueryMock = () =>
    createSpyObj('parseQuerySpy', ['find']);

export const createParseObjectMock = () => ({
    set: jest.fn().mockReturnValue({
        save: jest.fn().mockReturnValue(Promise.resolve),
    }),
    destroy: jest.fn().mockReturnValue(Promise.resolve),
});

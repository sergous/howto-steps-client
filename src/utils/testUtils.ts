export const createSpyObj = (
    baseName: string,
    methodNames: string[]
): { [key: string]: jest.Mock<any> } => {
    let obj: any = { baseName };

    for (let i = 0; i < methodNames.length; i++) {
        obj[methodNames[i]] = jest.fn();
    }

    return obj;
};

import * as fs from "fs";
import { checkExists } from "./test";
describe("foo", () => {
    let existsMock;
    beforeAll(() => {
        existsMock = jest.spyOn(fs, "existsSync");
        existsMock.mockReturnValue(true);
    });
    it("should do some fs mocks", () => {
        expect(checkExists("anything")).toBeTrue();
    });
});
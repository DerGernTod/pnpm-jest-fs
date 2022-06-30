import { existsSync } from "fs";

export function checkExists(path: string) {
    return existsSync(path);
}
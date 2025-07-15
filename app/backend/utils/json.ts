import { readFileSync } from "fs";

export const loadJsonFile = (path: string) => {
    const data = readFileSync(path, "utf-8");
    return JSON.parse(data);
};

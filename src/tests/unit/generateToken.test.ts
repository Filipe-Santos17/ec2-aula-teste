import { generateToken } from "../../utils/generateToken";
import { describe, expect, test } from "vitest";

describe("Generate Token", () => {
    test("should return a token", () => {
        const token = generateToken("aaa")
        expect(typeof token).toBe("string")
    })
})
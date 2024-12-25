import { generateAleatoryHash } from "../../utils/generateAleatoryHash";
import { describe, expect, test } from "vitest";

describe("Generate Aleatory Hash test", () => {
    test("should return a hash with 6 digits", () => {
        expect(generateAleatoryHash().toFixed().length).toBe(6)
    })

    test("should return a hash number", () => {
        expect(typeof generateAleatoryHash()).toBe("number")
    })

    test("should not return the same hash number", () => {
        const hashOne = generateAleatoryHash()
        const hashTwo = generateAleatoryHash()
        expect(hashOne !== hashTwo).toBe(true)
    })
})
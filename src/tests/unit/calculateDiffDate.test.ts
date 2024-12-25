import calculateDiffDate  from "../../utils/calculateDiffDate";
import { describe, expect, test } from "vitest";

describe("Generate Aleatory Hash test", () => {
    test("should return a number", () => {
        expect(typeof calculateDiffDate(new Date(), new Date())).toBe("number")
    })

    // test("should return undefined if not send two Dates", () => {
    //     expect(typeof calculateDiffDate(new Date(), "")).toBe("undefined")
    //     expect(typeof calculateDiffDate(85867574834, new Date())).toBe("undefined")
    // })
})
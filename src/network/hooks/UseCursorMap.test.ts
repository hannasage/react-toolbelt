import { act, renderHook } from "@testing-library/react-hooks";
import useCursorManager from "./UseCursorManager";

describe("useCursorMap", () => {
    test("Hook renders with default values", () => {
        const { result } = renderHook(() => useCursorManager());

        expect(result.current.cursors).toEqual(
            new Map<number, string>([[0, ""]])
        );
        expect(result.current.currentIndex).toBe(0);
        expect(result.current.hasPrev).toBe(false);
        expect(result.current.hasNext).toBe(false);
    });

    test("addNextCursor successfully appends map with cursor", () => {
        const { result } = renderHook(() => useCursorManager());

        act(() => {
            result.current.addNextCursor("test");
        });

        expect(result.current.cursors).toEqual(new Map([
            [0, ""],
            [1, "test"]
        ]));
    })

    test("Simulate receiving new cursors w/ duplicates", () => {
        const { result } = renderHook(() => useCursorManager());
        const response = ["123", "456", "789"]
        const responseTwo = ["456", "789", "000"]

        /* After first response, add cursors */
        act(() => {
            response.forEach((c: string) => {
                result.current.addNextCursor(c)
            })
        })

        expect(result.current.cursors).toEqual(new Map<number, string>([
            [0, ""],
            [1, "123"],
            [2, "456"],
            [3, "789"]
        ]))
        expect(result.current.hasNext).toBe(true)
        expect(result.current.hasPrev).toBe(false)

        /* Paging to the next page would mean you'd get two duplicate cursors and
         * one NEW cursor in this array; this should only add the new cursor. */
        act(() => {
            responseTwo.forEach((c: string) => {
                result.current.addNextCursor(c)
            })
        })

        expect(result.current.cursors).toEqual(new Map<number, string>([
            [0, ""],
            [1, "123"],
            [2, "456"],
            [3, "789"],
            [4, "000"]
        ]))
        expect(result.current.hasNext).toBe(true)
        expect(result.current.hasPrev).toBe(false)
    })
});

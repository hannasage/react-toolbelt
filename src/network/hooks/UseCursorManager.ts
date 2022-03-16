import { useCallback, useState } from "react";

const useCursorManager = () => {
    const [cursors, setCursors] = useState<Map<number, string>>(
        new Map<number, string>([[0, ""]])
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [hasPrev, setHasPrev] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState<boolean>(false);

    const cursorExists = useCallback(
        (c: string) => {
            return Array.from(cursors.values()).includes(c);
        },
        [cursors]
    );

    const addCursor = (index: number, val: string) => {
        if (!cursorExists(val)) {
            setCursors(cursors.set(index, val))
        }
        setHasNext(cursors.get(currentIndex + 1) !== undefined)
        setHasPrev(cursors.get(currentIndex - 1) !== undefined)
    }

    const addNextCursor = (val: string) => {
        addCursor(cursors.size, val)
    }

    return { cursors, currentIndex, hasPrev, hasNext, addNextCursor, setCurrentIndex };
};

export default useCursorManager;

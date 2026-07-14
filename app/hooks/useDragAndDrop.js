"use client";

import { useState, useCallback } from "react";

/**
 * Reusable drag-and-drop handlers for file upload zones.
 * @param {(fileOrFiles: File | File[]) => void} onFileDrop
 * @param {{ accept?: string, multiple?: boolean }} [options]
 */
export function useDragAndDrop(onFileDrop, options = {}) {
    const { accept, multiple = false } = options;
    const [isDragging, setIsDragging] = useState(false);

    const isAccepted = useCallback(
        (file) => {
            if (!accept) return true;
            const types = accept.split(",").map((t) => t.trim());
            return types.some(
                (t) =>
                    file.type === t ||
                    (t.endsWith("/*") && file.type.startsWith(t.replace("/*", "/")))
            );
        },
        [accept]
    );

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    }, []);

    const onDrop = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const list = Array.from(e.dataTransfer?.files || []).filter(isAccepted);
            if (!list.length) return;
            if (multiple) onFileDrop(list);
            else onFileDrop(list[0]);
        },
        [onFileDrop, isAccepted, multiple]
    );

    return {
        isDragging,
        dragProps: { onDragOver, onDragLeave, onDrop },
    };
}

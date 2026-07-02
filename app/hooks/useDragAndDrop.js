"use client";

import { useState, useCallback } from "react";

/**
 * Reusable drag-and-drop handlers for file upload zones.
 * @param {(file: File) => void} onFileDrop
 * @param {{ accept?: string }} [options]
 */
export function useDragAndDrop(onFileDrop, options = {}) {
    const { accept } = options;
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
            const file = e.dataTransfer?.files?.[0];
            if (file && isAccepted(file)) {
                onFileDrop(file);
            }
        },
        [onFileDrop, isAccepted]
    );

    return {
        isDragging,
        dragProps: { onDragOver, onDragLeave, onDrop },
    };
}

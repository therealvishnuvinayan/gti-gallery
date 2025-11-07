"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import type { PackType } from "@/lib/data";

type Props = {
    packs: PackType[];
    onSelect: (pack: PackType) => void;
    className?: string;
};

export default function FilterDropdown({ packs, onSelect, className }: Props) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    // close on escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const select = (p: PackType) => {
        setOpen(false);
        onSelect(p);
        btnRef.current?.focus();
    };

    return (
        <div ref={rootRef} className={`relative ${className ?? ""}`}>
            {/* TRIGGER – ALWAYS BLACK ICON */}
            <button
                ref={btnRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((v) => !v);
                }}
                className="p-1 hover:opacity-70 transition"
                style={{
                    background: "transparent",
                    border: "none",
                }}
                aria-label="Filter"
            >
                <Filter className="w-6 h-6" color="black" strokeWidth={2.2} />
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
            absolute right-0 mt-2 w-44
            bg-white
            border border-gray-200
            shadow-xl rounded-xl p-2 z-[9999]
          "
                >
                    {packs.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => select(p)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

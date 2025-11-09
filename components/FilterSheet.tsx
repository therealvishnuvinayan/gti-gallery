"use client";

import { PackType } from "@/lib/data";
import { X } from "lucide-react";

export default function FilterSheet({
    packs,
    onPick,
    onClose,
}: {
    packs: PackType[];
    onPick: (pack: PackType) => void;
    onClose: () => void;
}) {
    return (
        <div
            className="
        fixed inset-0 z-[100] bg-white dark:bg-[var(--panel)]
        overflow-y-auto
      "
            role="dialog"
            aria-modal="true"
        >
            <div className="container-pro py-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Filter by packaging</h2>
                <button className="btn btn-ghost" onClick={onClose} aria-label="Close">
                    <X className="w-5 h-5" />
                    <span className="hidden sm:inline">Close</span>
                </button>
            </div>

            <div className="container-pro pb-12">
                <div className="packs-grid">
                    {packs.map((p) => (
                        <button
                            key={p.id}
                            className="pack-tile"
                            onClick={() => onPick(p)}
                            aria-label={`Open ${p.name}`}
                        >
                            <span className="pack-tile__label">{p.name.toUpperCase()}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useMemo, useState } from "react";

type Segment = {
  id: string;
  start: number;
  end: number;
  kind: "keep" | "cut";
};

export default function TimelineBar() {
  const [duration] = useState(62);
  const [playhead, setPlayhead] = useState(0);

  const segments: Segment[] = useMemo(
    () => [
      { id: "s1", start: 0, end: 12, kind: "keep" },
      { id: "s2", start: 12, end: 18, kind: "cut" },
      { id: "s3", start: 18, end: 62, kind: "keep" },
    ],
    [],
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Timeline</div>
        <div className="text-xs text-zinc-500">Click a segment to seek</div>
      </div>

      <div className="relative h-10 w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="absolute inset-0 flex">
          {segments.map((seg) => {
            const leftPct = (seg.start / duration) * 100;
            const widthPct = ((seg.end - seg.start) / duration) * 100;
            const base =
              seg.kind === "keep" ? "bg-zinc-700/60" : "bg-red-500/35";
            return (
              <button
                key={seg.id}
                className={`h-full ${base} hover:opacity-90`}
                style={{ width: `${widthPct}%`, marginLeft: `${leftPct}%` }}
                onClick={() => setPlayhead(seg.start)}
                title={`${seg.kind.toUpperCase()} ${seg.start}s–${seg.end}s`}
                aria-label={`Segment ${seg.kind} from ${seg.start} to ${seg.end} seconds`}
              />
            );
          })}
        </div>

        <div
          className="absolute top-0 h-full w-0.5 bg-white"
          style={{ left: `${(playhead / duration) * 100}%` }}
          aria-hidden
        />
      </div>

      <div className="mt-2 text-xs text-zinc-500">Playhead: {playhead}s</div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `00:${mm}:${ss}`;
}

export default function VideoPane() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(62);
  const timecode = useMemo(() => formatTime(currentTime), [currentTime]);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-zinc-200">Preview</div>
        <div className="text-xs text-zinc-400" aria-label="Current timecode">
          {timecode} / {formatTime(duration)}
        </div>
      </div>

      <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        {/* Placeholder until upload + real player in Milestone 2 */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-semibold text-zinc-200">No video yet</div>
            <div className="mt-1 text-xs text-zinc-500">
              Upload in Milestone 2.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900"
          onClick={() => setCurrentTime((t) => Math.max(0, t - 5))}
        >
          -5s
        </button>
        <button
          className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-white"
          onClick={() => setCurrentTime((t) => Math.min(duration, t + 1))}
        >
          Play
        </button>
        <button
          className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900"
          onClick={() => setCurrentTime((t) => Math.min(duration, t + 5))}
        >
          +5s
        </button>

        <div className="ml-auto text-xs text-zinc-500">Preview: idle</div>
      </div>
    </div>
  );
}

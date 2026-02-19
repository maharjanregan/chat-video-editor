"use client";

import { useMemo, useState } from "react";
import PlanCard, { ProposedPlan } from "@/components/PlanCard";

type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; plan?: ProposedPlan };

const examples = [
  "Trim the first 3 seconds",
  "Cut out all silent parts",
  "Add captions in English",
  "Add title card: ‘Episode 4’ for 2 seconds",
  "Export 1080p MP4",
];

export default function ChatPane() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "m1",
      role: "assistant",
      text: "Upload a video, then tell me what you want. I’ll propose an edit plan before applying it.",
    },
  ]);

  const help = useMemo(() => examples.join(" • "), []);

  function onSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };

    // Milestone 1: mock response (real planner arrives in Milestone 4)
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: "Proposed edits (preview): I’ll translate this into operations you can apply.",
      plan: {
        title: "Proposed edits",
        operations: [
          {
            type: "TRIM",
            range: "00:00–00:03",
            summary: "Remove the first 3 seconds.",
          },
        ],
        diffSummary:
          "Timeline will start at 00:03. No other ranges changed (preview).",
      },
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-zinc-800/70 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-100">Chat</div>
          <div className="text-xs text-zinc-500">Mock model (v1)</div>
        </div>
        <div className="mt-1 text-xs text-zinc-500">{help}</div>
      </div>

      <div className="flex-1 space-y-3 overflow-auto p-3">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[92%] rounded-2xl bg-zinc-100 px-3 py-2 text-sm text-zinc-950"
                  : "max-w-[92%] rounded-2xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100"
              }
            >
              <div className="whitespace-pre-wrap">{m.text}</div>
              {m.role === "assistant" && m.plan ? (
                <div className="mt-2">
                  <PlanCard
                    plan={m.plan}
                    onApply={() => {
                      // Milestone 5 will actually apply operations.
                      alert("Apply will execute in Milestone 5+");
                    }}
                    onRevise={() => {
                      alert("Revise flow will be implemented in Milestone 4+");
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800/70 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Describe an edit…"
            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            aria-label="Chat input"
          />
          <button
            onClick={onSend}
            className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-zinc-500">
          Assistant will propose a plan first. Nothing applies until you click Apply.
        </div>
      </div>
    </div>
  );
}

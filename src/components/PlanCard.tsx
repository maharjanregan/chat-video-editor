export type ProposedPlan = {
  title: string;
  operations: Array<{ type: string; range?: string; summary: string }>;
  diffSummary: string;
};

export default function PlanCard({
  plan,
  onApply,
  onRevise,
}: {
  plan: ProposedPlan;
  onApply: () => void;
  onRevise: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
      <div className="text-sm font-semibold text-zinc-100">{plan.title}</div>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-200">
        {plan.operations.map((op, idx) => (
          <li key={idx}>
            <span className="font-medium">{op.type}</span>
            {op.range ? <span className="text-zinc-400"> — {op.range}</span> : null}
            <div className="text-zinc-300">{op.summary}</div>
          </li>
        ))}
      </ul>

      <div className="mt-2 rounded-lg bg-zinc-900/40 p-2 text-xs text-zinc-300">
        <div className="font-medium text-zinc-200">Diff summary</div>
        <div className="mt-1">{plan.diffSummary}</div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onApply}
          className="flex-1 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
        >
          Apply
        </button>
        <button
          onClick={onRevise}
          className="flex-1 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
        >
          Revise
        </button>
      </div>
    </div>
  );
}

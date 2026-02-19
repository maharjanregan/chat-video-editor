import ChatPane from "@/components/ChatPane";
import TimelineBar from "@/components/TimelineBar";
import VideoPane from "@/components/VideoPane";

export default function EditorShell() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-zinc-800" aria-hidden />
            <div>
              <div className="text-sm font-semibold leading-4">chatVideoEditor</div>
              <div className="text-xs text-zinc-400">Chat controls the timeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900">
              Undo
            </button>
            <button className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900">
              Redo
            </button>
            <button className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-950 hover:bg-white">
              Export
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <VideoPane />
            <div className="border-t border-zinc-800/70 p-3">
              <TimelineBar />
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4">
          <div className="h-[calc(100vh-7.5rem)] rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <ChatPane />
          </div>
        </aside>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-6 text-xs text-zinc-500">
        Tip: try “Trim the first 3 seconds” or “Add a title card for 2 seconds”.
      </footer>
    </div>
  );
}

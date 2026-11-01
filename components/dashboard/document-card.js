import { CloseIcon, FileIcon } from "@/components/dashboard/icons";

export function DocumentCard({ document, onRemove }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${document.accent}`}
      >
        <FileIcon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
          {document.title}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {document.category} <span className="mx-1">·</span> {document.type}{" "}
          <span className="mx-1">·</span> {document.size}
        </p>
      </div>
      {document.url ? (
        <a
          href={document.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"
        >
          Open
        </a>
      ) : (
        <span className="hidden shrink-0 text-xs text-slate-400 sm:inline">
          {document.updatedAt}
        </span>
      )}
      <button
        type="button"
        aria-label={`Remove ${document.title}`}
        onClick={() => onRemove(document.id)}
        className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
      >
        <CloseIcon className="size-5" />
      </button>
    </article>
  );
}

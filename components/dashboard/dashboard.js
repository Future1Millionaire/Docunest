"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BellIcon,
  CloseIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  StorageIcon,
} from "@/components/dashboard/icons";
import { getCategories } from "@/components/dashboard/data";
import { useDocuments } from "@/components/dashboard/document-context";
import { CategoryFilter } from "@/components/dashboard/category-filter";
import { DocumentCard } from "@/components/dashboard/document-card";
import { SearchBar } from "@/components/dashboard/search-bar";

const typeByExtension = {
  pdf: "PDF",
  docx: "DOCX",
  pptx: "PPTX",
  xlsx: "XLSX",
};

export function Dashboard() {
  const { documents, addDocument, removeDocument } = useDocuments();
  const [activeCategory, setActiveCategory] = useState("All documents");
  const [activeType, setActiveType] = useState("All types");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Academics");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const categories = getCategories(documents);

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesCategory =
        activeCategory === "All documents" ||
        document.category === activeCategory;
      const matchesType =
        activeType === "All types" || document.type === activeType;
      const matchesSearch =
        !query ||
        `${document.title} ${document.category} ${document.type}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [activeCategory, activeType, documents, searchQuery]);

  function handleFileChange(event) {
    const file = event.target.files?.[0] ?? null;
    setUploadFile(file);
    setUploadError("");
    if (file && !uploadTitle.trim()) {
      setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    }
  }

  function handleUpload(event) {
    event.preventDefault();

    const extension = uploadFile?.name.split(".").pop()?.toLowerCase();
    const type = extension ? typeByExtension[extension] : undefined;

    if (!uploadTitle.trim() || !uploadFile || !type) {
      setUploadError(
        !uploadTitle.trim()
          ? "Enter a document name."
          : !uploadFile
            ? "Choose a file to upload."
            : "Please choose a PDF, DOCX, PPTX, or XLSX file.",
      );
      return;
    }

    addDocument({
      title: uploadTitle.trim(),
      category: uploadCategory,
      type,
      file: uploadFile,
    });
    setUploadTitle("");
    setUploadFile(null);
    setUploadCategory("Academics");
    setUploadError("");
    setShowUploadForm(false);
    event.currentTarget.reset();
  }

  function closeUploadForm() {
    setShowUploadForm(false);
    setUploadTitle("");
    setUploadFile(null);
    setUploadError("");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-7 lg:flex">
        <Link href="/" className="mb-10 flex items-center gap-3 px-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-violet-600 text-white">
            <FolderIcon className="size-5" />
          </span>
          <span className="text-xl font-bold tracking-tight">
            Docu<span className="text-violet-600">Nest</span>
          </span>
        </Link>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Library
        </p>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="mt-auto rounded-2xl bg-violet-50 p-4">
          <p className="text-sm font-semibold text-slate-800">
            Keep it organized
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Your important student documents, all in one place.
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold">
              <span className="flex size-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                <FolderIcon className="size-[18px]" />
              </span>
              Docu<span className="-ml-2 text-violet-600">Nest</span>
            </Link>
            <BellIcon className="size-5 text-slate-500" />
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="hidden items-center gap-3 lg:flex">
            <span className="flex size-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              RS
            </span>
            <div>
              <p className="text-sm font-semibold">Rahul Sharma</p>
              <p className="text-xs text-slate-500">Student account</p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
          <section className="flex flex-col gap-5 rounded-3xl bg-gradient-to-r from-violet-800 to-indigo-600 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-medium text-violet-200">
                Your student workspace
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Good to see you, Rahul
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-violet-100">
                Keep your class notes, project files, and important documents
                together.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowUploadForm((visible) => !visible)}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-violet-800 transition hover:bg-violet-50"
            >
              <span aria-hidden="true" className="text-lg leading-none">+</span>
              Upload document
            </button>
          </section>

          {showUploadForm && (
            <form
              onSubmit={handleUpload}
              className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900">Add a document</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose a name, category, and PDF, DOCX, PPTX, or XLSX file.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close upload form"
                  onClick={closeUploadForm}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Document name
                  <input
                    required
                    value={uploadTitle}
                    onChange={(event) => {
                      setUploadTitle(event.target.value);
                      setUploadError("");
                    }}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    placeholder="e.g. Biology notes"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Category
                  <select
                    value={uploadCategory}
                    onChange={(event) => setUploadCategory(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 font-normal outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  >
                    {categories
                      .filter((category) => category.name !== "All documents")
                      .map((category) => (
                        <option key={category.name}>{category.name}</option>
                      ))}
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  File
                  <input
                    required
                    type="file"
                    accept=".pdf,.docx,.pptx,.xlsx"
                    onChange={handleFileChange}
                    className="mt-2 block w-full rounded-xl border border-slate-200 p-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:font-semibold file:text-violet-700"
                  />
                </label>
              </div>
              {uploadError && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                  {uploadError}
                </p>
              )}
              <div className="mt-5 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={closeUploadForm}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
                >
                  Add document
                </button>
              </div>
            </form>
          )}

          <section
            aria-label="Library overview"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {[
              { label: "Documents", value: documents.length, Icon: FileIcon, color: "text-violet-600" },
              { label: "Categories", value: categories.length - 1, Icon: HomeIcon, color: "text-blue-600" },
              { label: "Study space", value: "Your files, organized", Icon: StorageIcon, color: "text-emerald-600", className: "sm:col-span-2 xl:col-span-1" },
            ].map(({ label, value, Icon, color, className = "" }) => (
              <div
                key={label}
                className={`rounded-2xl border border-slate-200 bg-white p-5 ${className}`}
              >
                <div className="flex items-center gap-3 text-slate-500">
                  <Icon className={`size-5 ${color}`} />
                  <span className="text-sm">{label}</span>
                </div>
                <p className="mt-3 text-2xl font-bold">{value}</p>
              </div>
            ))}
          </section>

          <section className="mt-9">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-violet-700">
                  Your library
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  {activeCategory}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recently added documents, organized for easy browsing.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                {filteredDocuments.length}{" "}
                {filteredDocuments.length === 1 ? "file" : "files"}
              </span>
            </div>

            <div className="mt-5 lg:hidden">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
                compact
              />
            </div>

            <label className="mt-4 flex w-fit items-center gap-3 text-sm text-slate-600">
              File type
              <select
                aria-label="Filter by file type"
                value={activeType}
                onChange={(event) => setActiveType(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              >
                {["All types", ...Object.values(typeByExtension)].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <div className="mt-5 space-y-3">
              {filteredDocuments.length ? (
                filteredDocuments.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onRemove={removeDocument}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                  <p className="font-semibold text-slate-800">
                    No documents found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another search or choose a different category.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All documents");
                      setActiveType("All types");
                    }}
                    className="mt-4 text-sm font-semibold text-violet-700 hover:text-violet-900"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

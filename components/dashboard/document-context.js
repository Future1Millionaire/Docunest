"use client";

import { createContext, useContext, useState } from "react";
import { initialDocuments } from "./data";

const DocumentContext = createContext(null);

const accentByType = {
  PDF: "bg-rose-100 text-rose-700",
  DOCX: "bg-blue-100 text-blue-700",
  PPTX: "bg-amber-100 text-amber-700",
  XLSX: "bg-emerald-100 text-emerald-700",
};

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState(initialDocuments);

  function addDocument(document) {
    const { file, ...details } = document;
    const newDocument = {
      ...details,
      id: crypto.randomUUID(),
      size:
        file.size >= 1024 * 1024
          ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`,
      updatedAt: "Just now",
      accent: accentByType[document.type],
      url: URL.createObjectURL(file),
    };

    setDocuments((currentDocuments) => [newDocument, ...currentDocuments]);
  }

  function removeDocument(id) {
    const document = documents.find((item) => item.id === id);

    if (document?.url) URL.revokeObjectURL(document.url);
    setDocuments((currentDocuments) =>
      currentDocuments.filter((item) => item.id !== id),
    );
  }

  return (
    <DocumentContext.Provider value={{ documents, addDocument, removeDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);

  if (!context) {
    throw new Error("useDocuments must be used inside DocumentProvider.");
  }

  return context;
}

const categoryNames = [
  "All documents",
  "Academics",
  "Personal",
  "Finance",
  "Projects",
];

export const initialDocuments = [
  { id: 1, title: "Computer Networks Notes", category: "Academics", type: "PDF", size: "2.4 MB", updatedAt: "Today, 10:42 AM", accent: "bg-blue-100 text-blue-700" },
  { id: 2, title: "Semester 5 Fee Receipt", category: "Finance", type: "PDF", size: "834 KB", updatedAt: "Yesterday, 4:18 PM", accent: "bg-emerald-100 text-emerald-700" },
  { id: 3, title: "DocuNest Project Plan", category: "Projects", type: "DOCX", size: "1.2 MB", updatedAt: "Oct 27, 2026", accent: "bg-amber-100 text-amber-700" },
  { id: 4, title: "Data Structures Presentation", category: "Academics", type: "PPTX", size: "5.8 MB", updatedAt: "Oct 24, 2026", accent: "bg-violet-100 text-violet-700" },
  { id: 5, title: "Resume - Rahul Sharma", category: "Personal", type: "PDF", size: "324 KB", updatedAt: "Oct 20, 2026", accent: "bg-rose-100 text-rose-700" },
  { id: 6, title: "Monthly Study Planner", category: "Personal", type: "XLSX", size: "607 KB", updatedAt: "Oct 18, 2026", accent: "bg-cyan-100 text-cyan-700" },
];

export function getCategories(documents) {
  return categoryNames.map((name) => ({
    name,
    count: name === "All documents" ? documents.length : documents.filter((document) => document.category === name).length,
  }));
}

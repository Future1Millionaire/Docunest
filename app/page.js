import { DocumentProvider } from "@/components/dashboard/document-context";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  return (
    <DocumentProvider>
      <Dashboard />
    </DocumentProvider>
  );
}

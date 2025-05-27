import { use } from "react";
import FolderMetaFile from "./components/FolderMetaFile";

interface FolderPageProps {
  params: Promise<{ folderId: string }>;
}

/**
 * Dummy component to display dynamic content based on the folderId parameter.
 */
const FolderPage = ({ params }: FolderPageProps) => {
  const { folderId } = use(params);

  return (
    <div className="text-slate-900">
      <FolderMetaFile />
    </div>
  );
};

export default FolderPage;

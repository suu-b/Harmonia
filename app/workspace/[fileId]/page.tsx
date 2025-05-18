import View from "../components/text-editor/View";
import { use } from "react";

interface FilePageProps {
  params: Promise<{ fileId: string }>;
}

/**
 * Dummy component to display dynamic content based on the fileId parameter.
 * TODO: Replace with a text editor to display the file content.
 */
const FilePage = ({ params }: FilePageProps) => {
  const { fileId } = use(params);

  return (
    <div className="text-slate-900">
      <View />
    </div>
  );
};

export default FilePage;

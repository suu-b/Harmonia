import TreeView from "./TreeView";
import { MoonLoader } from "react-spinners";

interface WorkspaceTreeProps {
  data: FinalDataTreeStructure[];
}

/**
 * Tree View: Contains a hirearchal tree structure of the user workspace
 */
const WorkspaceTree: React.FC<WorkspaceTreeProps> = ({ data }) => {
  return (
    <div className="flex h-full overflow-auto pt-8 tree justify-self-start items-start">
      <TreeView data={data} />
    </div>
  );
};

export default WorkspaceTree;

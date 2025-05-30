import { useDispatch } from "react-redux";
import { setWorkspaceData } from "@/app/workspaceDataSlice";
import { useEffect } from "react";

import TreeView from "./TreeView";

import { FinalDataTreeStructure } from "@/types/workspace-data";

interface WorkspaceTreeProps {
  data: FinalDataTreeStructure[];
}

/**
 * Tree View: Contains a hirearchal tree structure of the user workspace
 */
const WorkspaceTree: React.FC<WorkspaceTreeProps> = ({ data }) => {
  /**
   * Flattens a tree structure into a list of nodes.
   * @param tree - The tree structure to flatten
   * @returns A flat array of all nodes in the tree
   */
  const flattenTree = (
    tree: FinalDataTreeStructure[]
  ): FinalDataTreeStructure[] => {
    const flatList: FinalDataTreeStructure[] = [];

    const traverse = (node: FinalDataTreeStructure) => {
      console.log("node", node);
      flatList.push(node);
      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    tree.forEach(traverse);
    return flatList;
  };

  const dispatch = useDispatch();
  const flattenedData = flattenTree(data);

  useEffect(() => {
    dispatch(setWorkspaceData(flattenedData));
  }, [data, dispatch]);

  return (
    <div className="flex h-full overflow-auto pt-8 tree justify-self-start items-start">
      <TreeView data={data} />
    </div>
  );
};

export default WorkspaceTree;

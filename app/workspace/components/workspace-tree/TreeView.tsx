import TreeNode from "./TreeNode";

interface TreeViewProps {
  data: FinalDataTreeStructure[];
}

/**
 * Iterates on the data to create a view for each folder.
 */
const TreeView = ({ data }: TreeViewProps) => {
  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;

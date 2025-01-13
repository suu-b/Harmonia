import TreeNode from "./TreeNode";

interface TreeViewProps {
    data: FinalDataTreeStructure[]
}

const TreeView = ({ data }: TreeViewProps) => {
    return (
        <div>
            {data.map(node => <TreeNode key={node.id} node={node} />)}
        </div>
    )
}

export default TreeView
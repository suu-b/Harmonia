import { useState } from "react";
import Link from "next/link";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";

interface TreeNodeProps {
  node: FinalDataTreeStructure;
}

/**
 * For each item, recursively creates a view.
 */
const TreeNode = ({ node }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-5">
      <div className="flex">
        {hasChildren && (
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center cursor-pointer"
          >
            {isExpanded ? (
              <BiSolidDownArrow size={10} />
            ) : (
              <BiSolidRightArrow size={10} />
            )}
          </div>
        )}
        <Link
          href={
            node.mimetype === "application/vnd.google-apps.folder"
              ? `/workspace/folder/${node.id}`
              : `/workspace/file/${node.id}`
          }
        >
          <div className="ml-1">{node.name}</div>
        </Link>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;

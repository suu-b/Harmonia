/**
 * Fallback component to handle case where the workspace is empty.
 */
const WorkspaceEmpty: React.FC = () => {
  return (
    <div className="text-slate-600 text-sm flex justify-center items-center flex-col">
      <h3 className="text-center">Your workspace is empty!</h3>
    </div>
  );
};

export default WorkspaceEmpty;

import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import Link from "next/link";

import { createFolder } from "@/lib/googleDrive";

interface NoWorkspaceProps {
  accessToken: string | null;
}

/**
 * Fallback component to handle case where the workspace is not remote workspace. Provides a button for the user to create on remote.
 */
const NoWorkspace: React.FC<NoWorkspaceProps> = ({ accessToken }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleWorkspaceCreation = async () => {
    setIsLoading(true);
    if (accessToken) {
      await createFolder(accessToken, "harmonia-workspace").then(
        async (response) => {
          //TODO: Inserting a toast here
          console.log("Workspace created.");
        }
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="text-slate-600 text-sm flex justify-center items-center flex-col">
      <h3 className="text-center">
        No Workspace found. Lets make one 🤩! Follow the steps{" "}
        <Link
          href="/help/no-workpace"
          target="_blank"
          className="underline cursor-pointer"
        >
          here
        </Link>
      </h3>
      {isLoading ? (
        <MoonLoader size={25} className="m-1.5" />
      ) : (
        <button
          className="bg-slate-600 p-2 rounded mt-3 hover:shadow"
          onClick={handleWorkspaceCreation}
        >
          <MdOutlineCreateNewFolder size={15} color="white" />
        </button>
      )}
    </div>
  );
};

export default NoWorkspace;

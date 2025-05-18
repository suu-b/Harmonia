"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { BarLoader } from "react-spinners";

import setCookie from "@/lib/cookies/setCookie";

import { importFolder } from "@/lib/googleDrive";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImportWorkSpaceModalProps {
  accessToken: string;
}

/**
 * Component to import a workspace from Google Drive.
 * It fetches the workspace folder and sets it in cookies.
 * Displays a loading spinner while importing and a success message once done.
 */
const ImportWorkspaceModal: React.FC<ImportWorkSpaceModalProps> = ({
  accessToken,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [importDone, isImportDone] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      importWorkspace();
    }
  }, [isOpen]);

  const importWorkspace = async () => {
    importFolder(accessToken, "harmonia-workspace").then((response) => {
      console.log(response);
      if (response) {
        const workspace_id = response[0].id;
        setCookie({
          cookieName: "workspace_id",
          cookieVal: workspace_id,
          expiryDays: 5,
        });
        isImportDone(true);
      }
    });
  };

  return (
    <section
      id="import-workspace"
      className="flex flex-col justify-center h-screen bg-white items-center w-full p-8"
    >
      <Image
        src="/importing-snoopy.png"
        alt="import-banner"
        width={200}
        height={200}
      />
      <h3 className="text-4xl font-bold text-slate-800 my-1">
        Let's import your workspace
      </h3>
      <p className="text-sm text-slate-400 mb-5 text-center ">
        Harmonia would try to fetch the workspace from your drive. It can either
        be first time or a whole merging process to up-to-date the application
        with the latest changes in the workspace.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        Trigger Import
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Importing Workspace</DialogTitle>
            <Image
              src="/importing-snoopy.png"
              alt="Importing workspace"
              width={200}
              height={200}
              className="mx-auto my-4"
            />
            {importDone ? (
              <DialogDescription>
                <h3 className="text-slate-700 font-bold text-base text-center mt-5">
                  Import Successful
                </h3>
                <p className="text-slate-500 text-sm my-2 text-center">
                  Your workspace has been set up and is available in the
                  workspace section. Click anywhere outside the dialog to
                  continue. Happy writing!
                </p>
                <div className="flex justify-center mt-5">
                  <FaRegCheckCircle color="black" size={40} />
                </div>
              </DialogDescription>
            ) : (
              <DialogDescription>
                <h3 className="text-slate-700 font-bold text-base text-center mt-5">
                  Importing Workspace...
                </h3>
                <p className="text-slate-500 text-sm my-2 text-center">
                  This process cannot be undone. Please do not close the screen
                  or dismiss this dialog.
                </p>
                <div className="flex justify-center mt-4">
                  <BarLoader width={200} height={5} />
                </div>
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ImportWorkspaceModal;

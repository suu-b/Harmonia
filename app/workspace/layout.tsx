"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { LuImport } from "react-icons/lu";
import { IoSettings, IoSearchSharp } from "react-icons/io5";
import { SiFiles } from "react-icons/si";
import { FaSync, FaTrash } from "react-icons/fa";

import NoWorkspace from "./components/fallbacks/NoWorkspace";
import WorkspaceTree from "./components/workspace-tree/WorkspaceTree";
import WorkspaceEmpty from "./components/fallbacks/EmptyWorkspace";
import { Button } from "@/components/ui/button";
import returnWorkspaceDataInRequiredFormat from "@/lib/formatWorkspace";
import getCookie from "@/lib/cookies/getCookie";
import { MoonLoader } from "react-spinners";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchFolderById } from "@/lib/googleDrive";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

/**
 * WorkspaceLayout component that serves as a layout for the workspace section of the application.
 * It includes a sidebar with navigation links and a main content area.
 * The sidebar contains links to different sections of the workspace, such as Quick Find, Settings, and Import Workspace.
 * The main content area displays the children passed to the component.
 * The sidebar can be resized by dragging the divider between the sidebar and the main content area.
 * The component also fetches the user's workspace data from Google Drive and displays it in the sidebar.
 * The sidebar width is adjustable, and the component handles the resizing logic.
 * @param param0
 * @returns
 */
const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [data, setData] = useState<FinalDataTreeStructure[] | null>(null);
  const [sideBarWidth, setSideBarWidth] = useState(15);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    setAccessToken(getCookie("accessToken"));
    setWorkspaceId(getCookie("workspace_id"));
  }, []);

  useEffect(() => {
    const handleGetWorkspace = async (
      accessToken: string,
      workspaceId: string
    ) => {
      fetchFolderById(accessToken, workspaceId).then(async (response) => {
        const formattedResponse: FinalDataTreeStructure[] =
          await returnWorkspaceDataInRequiredFormat(response.files);
        console.log("Formatted response: ", formattedResponse);
        setData(formattedResponse);
      });
    };

    if (workspaceId && accessToken)
      handleGetWorkspace(accessToken, workspaceId);
  }, [workspaceId, accessToken]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => setIsResizing(true);

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth >= 15) setSideBarWidth(newWidth);
    }
  };

  const handleMouseUp = () => setIsResizing(false);

  return (
    <div className="bg-slate-100 flex h-screen w-screen">
      <aside
        className="bg-white border-r h-full p-4 grid-background"
        style={{ width: `${sideBarWidth}vw` }}
      >
        <ScrollArea className="h-full">
          <div className="mb-6 font-bold text-xl text-slate-700">Harmonia</div>

          <div className="space-y-1">
            <Link href="/workspace/quick-find">
              <Button variant="ghost" className="w-full justify-start">
                <IoSearchSharp className="mr-2 h-4 w-4" />
                Quick Find
              </Button>
            </Link>

            <Link href="/workspace/settings">
              <Button variant="ghost" className="w-full justify-start">
                <IoSettings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
          <div className="space-y-1">
            <Link href="/workspace">
              <Button variant="ghost" className="w-full justify-start">
                <SiFiles className="mr-2 h-4 w-4" />
                Workspace
              </Button>
            </Link>

            <div
              id="workspace-container"
              className="border bg-white rounded flex flex-col justify-center items-center text-[13px] font-thin text-slate-500 h-[40vh]"
            >
              {workspaceId ? (
                data ? (
                  data.length > 0 ? (
                    <div className="w-full h-full flex items-start">
                      <WorkspaceTree data={data} />
                    </div>
                  ) : (
                    <WorkspaceEmpty />
                  )
                ) : (
                  <MoonLoader size={20} />
                )
              ) : (
                <div className="flex flex-col justify-center items-center w-full h-full">
                  {accessToken ? (
                    <NoWorkspace accessToken={accessToken} />
                  ) : (
                    <MoonLoader size={20} />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Link href="/workspace/import-workspace">
              <Button variant="ghost" className="w-full justify-start">
                <LuImport className="mr-2 h-4 w-4" />
                Import Workspace
              </Button>
            </Link>
            <Link href="/workspace/sync">
              <Button variant="ghost" className="w-full justify-start">
                <FaSync className="mr-2 h-4 w-4" />
                Trigger Sync
              </Button>
            </Link>
            <Link href="/workspace/trash">
              <Button variant="ghost" className="w-full justify-start">
                <FaTrash className="mr-2 h-4 w-4" />
                Trash
              </Button>
            </Link>
          </div>
        </ScrollArea>
      </aside>

      <div
        className="bg-slate-300 cursor-col-resize w-3"
        title="Hold and drag to resize the side bar"
        onMouseDown={handleMouseDown}
      />
      <ScrollArea
        className="h-screen"
        style={{ width: `${100 - sideBarWidth}vw` }}
      >
        <div className="p-4">{children}</div>
      </ScrollArea>
    </div>
  );
};

export default WorkspaceLayout;

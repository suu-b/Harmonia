"use client";

import { useSelector } from "react-redux";
import { Search, Pen, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RootState } from "@/app/store";
import { FinalDataTreeStructure } from "@/types/workspace-data";
import getCookie from "@/lib/cookies/getCookie";
import { updateFileMetadata } from "@/lib/googleDrive";

interface FolderPageProps {
  folderId: string;
}

/**
 * The FolderMetaFile component displays the metadata of a specific folder in the user's workspace.
 * It allows users to view and update the folder's name and description.
 * It also provides a search functionality to filter the contents of the folder.
 * @returns
 */
const FolderMetaFile: React.FC<FolderPageProps> = ({ folderId }) => {
  const [folder, setFolder] = useState<FinalDataTreeStructure | null>(null);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState(
    "No Description Available"
  );
  const [isMetaDataUpdating, setIsMetaDataUpdating] = useState(false);
  const [showPen, setShowPen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);

  const workspaceData = useSelector(
    (state: RootState) => state.workspaceData.workspaceData
  );

  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const foundFolder = workspaceData.find(
      (item: FinalDataTreeStructure) =>
        item.id === folderId &&
        item.mimeType === "application/vnd.google-apps.folder"
    );
    setFolder(foundFolder || null);
  }, [workspaceData, folderId]);

  useEffect(() => {
    if (!isMetaDataUpdating) {
      setFolderName(folder?.name || "");
      setFolderDescription(folder?.description || "No Description Available");
    }
  }, [folder]);

  const handleSearch = () => {
    setSearchedQuery(searchQuery.trim());
    console.log("Searching for:", searchQuery, "Global:", globalSearch);
  };

  const handleMetaDataUpdate = () => {
    setIsMetaDataUpdating(true);
    setShowPen(false);
  };

  const handleMetaDataUpdateRequest = () => {
    const trimmedName = folderName.trim();
    const trimmedDescription = folderDescription.trim();

    const newName =
      trimmedName === "" || trimmedName === folder?.name ? null : trimmedName;

    const newDescription =
      trimmedDescription === "" ||
      trimmedDescription === folder?.description ||
      trimmedDescription === "No Description Available"
        ? null
        : trimmedDescription;

    if (!newName && !newDescription) {
      setIsMetaDataUpdating(false);
      setShowPen(true);
      return;
    }

    if (accessToken) {
      updateFileMetadata(accessToken, folderId, newName, newDescription)
        .then((response) => {
          setIsMetaDataUpdating(false);
          setFolderName(response.name);
          setFolderDescription(
            response.description ||
              folder?.description ||
              "No Description Available"
          );
        })
        .catch((error) => {
          setIsMetaDataUpdating(false);
          console.error("Error updating metadata:", error);
        })
        .finally(() => {
          setShowPen(true);
        });
    }
  };

  const filteredItems = useMemo(() => {
    return (
      folder?.children?.filter((item) =>
        item.name.toLowerCase().includes(searchedQuery.toLowerCase())
      ) || []
    );
  }, [searchedQuery, folder?.children]);

  if (!folder) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-xl">Folder not found: {folderId}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 min-h-screen bg-gray-50">
      <div className="mb-6">
        {showPen && (
          <Pen className="m-2 cursor-pointer" onClick={handleMetaDataUpdate} />
        )}
        {isMetaDataUpdating ? (
          <>
            <Input
              className="text-slate-800 mb-1"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <Input
              className="text-slate-800 mb-1"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none bg-slate-800 hover:bg-slate-900"
              onClick={handleMetaDataUpdateRequest}
            >
              <Check className="h-5 w-5 text-white" />
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-slate-800 mb-1">
              {folderName}
            </h1>
            <p className="text-gray-600">{folderDescription}</p>
          </>
        )}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(folder.createdTime).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(folder.modifiedTime).toLocaleString()}
          </p>
        </div>
      </div>
      <hr className="my-5" />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contents</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 w-full">
        <div className="flex flex-1 items-center border border-gray-300 rounded-md overflow-hidden bg-white">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 outline-none border-none"
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none bg-slate-800 hover:bg-slate-900"
            onClick={handleSearch}
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Global Search</span>
          <Switch
            checked={globalSearch}
            onCheckedChange={setGlobalSearch}
            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 overflow-auto h-[60vh]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer transition hover:shadow-lg hover:border-blue-400"
            >
              <Link
                href={
                  item.mimeType === "application/vnd.google-apps.folder"
                    ? `/workspace/folder/${item.id}`
                    : `/workspace/file/${item.id}`
                }
              >
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      Type:{" "}
                      {item.mimeType === "application/vnd.google-apps.folder"
                        ? "folder"
                        : "document"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    <p>
                      Created: {new Date(item.createdTime).toLocaleString()}
                    </p>
                    <p>
                      Last Modified:{" "}
                      {new Date(item.modifiedTime).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default FolderMetaFile;

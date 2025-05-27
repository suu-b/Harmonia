"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";

const FolderMetaFile = () => {
  const someMetaData = {
    title: "Folder Metadata",
    description: "This is a placeholder for folder metadata.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    listOfItems: [
      {
        id: "1",
        name: "Document1",
        type: "document",
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Directory1",
        type: "folder",
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Document2",
        type: "document",
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      },
      {
        id: "4",
        name: "Directory2",
        type: "folder",
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      },
      {
        id: "5",
        name: "Document3",
        type: "document",
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      },
    ],
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);

  const handleSearch = () => {
    setSearchedQuery(searchQuery);
    console.log("Searching for:", searchQuery, "Global:", globalSearch);
  };

  const filteredItems = someMetaData.listOfItems.filter((item) =>
    item.name.toLowerCase().includes(searchedQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col p-6 min-h-screen bg-gray-50">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-800 mb-1">
          {someMetaData.title}
        </h1>
        <p className="text-gray-600">{someMetaData.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(someMetaData.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(someMetaData.updatedAt).toLocaleString()}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer transition hover:shadow-lg hover:border-blue-400"
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    Type: {item.type}
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
                  <p>
                    Last Modified:{" "}
                    {new Date(item.lastModified).toLocaleString()}
                  </p>
                </div>
              </CardContent>
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

"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { BeatLoader } from "react-spinners";

import { GoogleDriveDocument } from "@/types/google-drive-document";

interface Props {
  resultDocuments: GoogleDriveDocument[] | null;
}

/**
 * Component to display a list of documents based on the search query.
 * It shows a loading spinner while fetching data and displays a message if no results are found.
 */
const DocumentList: React.FC<Props> = ({ resultDocuments }: Props) => {
  return resultDocuments ? (
    <ol className="space-y-2">
      <h4 className="text-sm font-semibold text-slate-700 p-1">Documents</h4>
      <Separator className="mb-3" />
      {resultDocuments && resultDocuments.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">
          No results found.
        </p>
      )}
      {resultDocuments &&
        resultDocuments.map((doc) => (
          <div key={doc.id}>
            <li className="text-sm text-slate-800 hover:bg-slate-100 p-2 rounded cursor-pointer">
              {doc.name}
            </li>
            <Separator />
          </div>
        ))}
    </ol>
  ) : (
    <div className="flex justify-center items-center h-full">
      <BeatLoader color="#1E293B" size={12} />
    </div>
  );
};

export default DocumentList;

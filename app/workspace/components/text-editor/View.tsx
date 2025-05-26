"use client";

import React from "react";
import ToolBar from "./ToolBar";
import Worksheet from "./Worksheet";
import { useMemo } from "react";
import { createMyEditor } from "harmonia-text-editor";

/**
 * View Component for the Text Editor
 * It contains the toolbar and the worksheet.
 */
const View: React.FC = () => {
  const editor = useMemo(() => createMyEditor(), []);
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Write from here..." }],
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-4 justify-start items-center">
      <p className="text-sm text-slate-600 text-left w-full my-3">
        Home &gt; Components &gt;{" "}
        <span className="text-slate-900">Breadcrumb</span>
      </p>
      <section className="sticky top-0 z-50 shadow">
        <ToolBar editor={editor} />
      </section>
      <hr className="my-5" />
      <Worksheet editor={editor} initialValue={initialValue} />
    </div>
  );
};

export default View;

"use client";

import { Editor } from "slate";
import { useDispatch } from "react-redux";
import { setText } from "@/app/editorSlice";
import {
  HarmoniaTextEditor,
  renderLeaf,
  renderBlock,
} from "harmonia-text-editor";

interface WorksheetProps {
  editor: Editor;
  initialValue: any[];
}

/**
 * Worksheet component for the text editor.
 * It contains the Harmonia Text Editor component and handles text changes.
 */
const Worksheet: React.FC<WorksheetProps> = ({ editor, initialValue }) => {
  const dispatch = useDispatch();

  const handleTextChange = (content: string) => dispatch(setText(content));

  return (
    <div className="w-full max-w-[1000px] aspect-[210/297] bg-white border-transparent shadow rounded-lg p-4">
      <HarmoniaTextEditor
        editor={editor}
        initialValue={initialValue}
        handleTextChange={handleTextChange}
        renderBlock={renderBlock}
        renderLeaf={renderLeaf}
      />
    </div>
  );
};

export default Worksheet;

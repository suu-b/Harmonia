"use client";

import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Square,
  Code,
  Save,
  CalendarSync,
  BookMarked,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  toggleAlignments,
  toggleBlocks,
  toggleLists,
  toggleMarks,
} from "harmonia-text-editor";
import { Editor } from "slate";

interface ToolBarProps {
  editor: Editor;
}
interface BlockToggleFns {
  insert: (editor: Editor) => void;
  toggle: () => void;
}

/**
 * ToolBar component for the text editor.
 * It contains various formatting options like bold, italic, underline, etc.
 * It also contains options for block types like headings and paragraphs.
 */
const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  const [alignment, setAlignment] = useState<string | null>(null);
  const [listType, setListType] = useState<string | null>(null);
  const [blockType, setBlockType] = useState<string | null>(null);

  const handleBlockChange = (value: string) => {
    setBlockType(value);

    const blockMap: Record<string, BlockToggleFns> = {
      heading1: {
        insert: toggleBlocks.insertHeading1,
        toggle: () => toggleBlocks.toggleHeading1(editor),
      },
      heading2: {
        insert: toggleBlocks.insertHeading2,
        toggle: () => toggleBlocks.toggleHeading2(editor),
      },
      heading3: {
        insert: toggleBlocks.insertHeading3,
        toggle: () => toggleBlocks.toggleHeading3(editor),
      },
      paragraph: {
        insert: toggleBlocks.insertParagraph,
        toggle: () => toggleBlocks.toggleParagraph(editor),
      },
    };

    const block: BlockToggleFns = blockMap[value];
    if (!block) return;

    if (!editor.selection) {
      block.insert(editor);
    } else {
      block.toggle();
    }
  };

  const alignmentOptions = [
    { icon: AlignLeft, value: "left" },
    { icon: AlignCenter, value: "center" },
    { icon: AlignRight, value: "right" },
    { icon: AlignJustify, value: "justify" },
  ];

  return (
    <div className="harmonia-editor sticky border-transparent top-0 z-50 w-full flex items-center justify-center flex-wrap bg-white p-3 rounded border-b border-slate-200">
      <Separator orientation="vertical" className="mx-2 h-8" />

      <Select value={blockType || ""} onValueChange={handleBlockChange}>
        <SelectTrigger className="w-[300px] h-8 border border-slate-300 shadow hover:bg-slate-100">
          <SelectValue placeholder="Block Type" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-slate-300 shadow">
          <SelectItem value="heading1">Heading 1</SelectItem>
          <SelectItem value="heading2">Heading 2</SelectItem>
          <SelectItem value="heading3">Heading 3</SelectItem>
          <SelectItem value="paragraph">Paragraph</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-2 h-8" />

      {[
        { icon: Bold, key: "bold" },
        { icon: Italic, key: "italic" },
        { icon: Underline, key: "underline" },
        { icon: Highlighter, key: "highlight" },
      ].map(({ icon: Icon, key }) => (
        <Toggle
          key={key}
          onPressedChange={() => toggleMarks.toggleMark(editor, key)}
          className="h-8 w-8 hover:bg-slate-100"
        >
          <Icon size={20} />
        </Toggle>
      ))}

      <Separator orientation="vertical" className="mx-1 h-8" />

      <ToggleGroup
        type="single"
        onValueChange={(value) => {
          if (value) toggleAlignments.toggleAlignment(editor, value);
        }}
        className="flex gap-1"
      >
        {alignmentOptions.map(({ icon: Icon, value }) => (
          <ToggleGroupItem
            key={value}
            value={value}
            className="h-8 w-8 hover:bg-slate-100"
          >
            <Icon size={20} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Separator orientation="vertical" className="mx-1 h-8" />

      <Toggle
        onPressedChange={() => toggleBlocks.toggleCodeBlock(editor)}
        className="h-8 w-8 hover:bg-slate-100"
      >
        <Code size={20} />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-8" />
      <ToggleGroup
        type="single"
        value={listType ?? undefined}
        onValueChange={(value) => {
          if (value === listType) {
            setListType(null);
            toggleLists.toggleList(editor, value);
          } else {
            setListType(value);
            toggleLists.toggleList(editor, value);
          }
        }}
        className="flex gap-1"
      >
        {[
          { icon: List, value: "bulleted-list" },
          { icon: ListOrdered, value: "numbered-list" },
        ].map(({ icon: Icon, value }) => (
          <ToggleGroupItem
            key={value}
            value={value}
            className="h-8 w-8 hover:bg-slate-100"
          >
            <Icon size={20} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Separator orientation="vertical" className="mx-1 h-8" />

      <Toggle
        onPressedChange={() => toggleBlocks.toggleBorders(editor)}
        className="h-8 w-8 hover:bg-slate-100"
      >
        <Square size={20} />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-8" />

      {[Save, CalendarSync, BookMarked].map((Icon, i) => (
        <Toggle key={i} className="h-8 w-8 hover:bg-slate-100">
          <Icon size={20} />
        </Toggle>
      ))}

      <Separator orientation="vertical" className="mx-2 h-8" />

      <Input
        placeholder="Search in file 🔍..."
        className="w-[400px] h-8 border border-slate-300 shadow"
      />

      <Separator orientation="vertical" className="mx-2 h-8" />
    </div>
  );
};

export default ToolBar;

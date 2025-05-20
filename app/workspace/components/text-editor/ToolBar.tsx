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

const ToolBar: React.FC = () => {
  const [alignment, setAlignment] = useState<string | null>(null);
  const [listType, setListType] = useState<string | null>(null);
  const [blockType, setBlockType] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50 w-full flex items-center justify-center flex-wrap bg-white p-3 rounded border-b border-slate-200">
      <Separator orientation="vertical" className="mx-2 h-8" />

      <Select value={blockType || ""} onValueChange={setBlockType}>
        <SelectTrigger className="w-[300px] h-8">
          <SelectValue placeholder="Block Type" />
        </SelectTrigger>
        <SelectContent>
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
        <Toggle key={key} className="h-8 w-8 data-[state=on]:text-slate-800">
          <Icon size={20} />
        </Toggle>
      ))}

      <Separator orientation="vertical" className="mx-1 h-8" />

      {[
        { icon: AlignLeft, value: "left" },
        { icon: AlignCenter, value: "center" },
        { icon: AlignRight, value: "right" },
        { icon: AlignJustify, value: "justify" },
      ].map(({ icon: Icon, value }) => (
        <Toggle
          key={value}
          pressed={alignment === value}
          onPressedChange={() =>
            setAlignment((prev) => (prev === value ? null : value))
          }
          className={`h-8 w-8 ${alignment === value ? "text-slate-800" : ""}`}
        >
          <Icon size={20} />
        </Toggle>
      ))}

      <Separator orientation="vertical" className="mx-1 h-8" />

      <Toggle className="h-8 w-8 data-[state=on]:text-slate-800">
        <Code size={20} />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-8" />

      {[
        { icon: List, value: "bullet" },
        { icon: ListOrdered, value: "ordered" },
      ].map(({ icon: Icon, value }) => (
        <Toggle
          key={value}
          pressed={listType === value}
          onPressedChange={() =>
            setListType((prev) => (prev === value ? null : value))
          }
          className={`h-8 w-8 ${listType === value ? "text-slate-800" : ""}`}
        >
          <Icon size={20} />
        </Toggle>
      ))}

      <Separator orientation="vertical" className="mx-1 h-8" />

      <Toggle className="h-8 w-8 data-[state=on]:text-slate-800">
        <Square size={20} />
      </Toggle>

      <Separator orientation="vertical" className="mx-1 h-8" />

      {[Save, CalendarSync, BookMarked].map((Icon, i) => (
        <Toggle key={i} className="h-8 w-8 data-[state=on]:text-slate-800">
          <Icon size={20} />
        </Toggle>
      ))}

      <Separator orientation="vertical" className="mx-2 h-8" />

      <Input placeholder="Search in file 🔍..." className="w-[400px] h-8" />

      <Separator orientation="vertical" className="mx-2 h-8" />
    </div>
  );
};

export default ToolBar;

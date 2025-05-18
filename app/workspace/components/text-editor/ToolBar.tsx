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
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";

const ToolBar: React.FC = () => {
  return (
    <div className="w-full flex items-center flex-wrap bg-white p-2 border-b border-slate-200">
      <Select>
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
      <Separator orientation="vertical" className="mx-1 h-8" />
      <Toggle className="h-8 w-8">
        <Bold size={16} />
      </Toggle>
      <Toggle className="h-8 w-8">
        <Italic size={16} />
      </Toggle>
      <Toggle className="h-8 w-8">
        <Underline size={16} />
      </Toggle>
      <Toggle className="h-8 w-8">
        <Highlighter size={16} />
      </Toggle>
      <Separator orientation="vertical" className="mx-1 h-8" />
      <Toggle className="h-8 w-8">
        <AlignLeft size={16} />
      </Toggle>
      <Toggle className="h-8 w-8">
        <AlignCenter size={16} />
      </Toggle>
      <Toggle className="h-8 w-8">
        <AlignRight size={16} />
      </Toggle>
      <Toggle className="h-8 w-8">
        <AlignJustify size={16} />
      </Toggle>
    </div>
  );
};

export default ToolBar;

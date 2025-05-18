import React from "react";
import ToolBar from "./ToolBar";
import Worksheet from "./Worksheet";

const View: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 justify-start items-center">
      <ToolBar />
      <hr className="my-5" />
      <Worksheet />
    </div>
  );
};

export default View;

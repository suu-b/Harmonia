import React from "react";
import ToolBar from "./ToolBar";
import Worksheet from "./Worksheet";

const View: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 justify-start items-center">
      <p className="text-sm text-slate-600 text-left w-full my-3">
        Home &gt; Components &gt;{" "}
        <span className="text-slate-900">Breadcrumb</span>
      </p>
      <section className="sticky top-0 z-50 shadow">
        <ToolBar />
      </section>
      <hr className="my-5" />
      <Worksheet />
    </div>
  );
};

export default View;

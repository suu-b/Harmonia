'use client'

import data from '@/data/workspace-data.json'
import { ReactNode, useEffect, useState } from "react"
import { LuImport } from "react-icons/lu"
import { IoSettings, IoSearchSharp } from "react-icons/io5"
import { SiFiles } from "react-icons/si"
import { CiSquarePlus } from "react-icons/ci";
import { FaSync, FaTrash } from "react-icons/fa"
import TreeView from '@/components/TreeView'

interface WorkspaceLayoutProps {
    children: ReactNode
}

const WorkspaceLayout = ({ children, }: WorkspaceLayoutProps) => {
    const [sideBarWidth, setSideBarWidth] = useState(18)
    const [isResizing, setIsResizing] = useState(false)

    const handleMouseDown = () => setIsResizing(true)
    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) {
            const newWidth = (e.clientX / window.innerWidth) * 100
            if (newWidth >= 10 && newWidth <= 40) setSideBarWidth(newWidth)
        }
    }
    const handleMouseUp = () => setIsResizing(false)

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing])

    return (
        <div className="bg-slate-100 flex h-screen w-screen">
            <aside
                id="side-bar"
                className="flex flex-col justify-center grid-background p-8 gap-8"
                style={{ width: `${sideBarWidth}vw` }}
            >
                <ul className="text-slate-600 font-bold text-sm text-left">
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <IoSearchSharp size={18} />
                        <span className="ml-1 hover:cursor-pointer">Quick Find</span>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <IoSettings size={18} />
                        <span className="ml-1 hover:cursor-pointer">Settings</span>
                    </li>
                    <li className="my-8 flex flex-col">
                        <div className="flex items-center">
                            <LuImport size={18} />
                            <span className="ml-1">Workspace</span>
                        </div>
                        <div id="workspace-container" className="border bg-white my-3 rounded flex flex-col text-[13px] font-thin text-slate-500 items-center h-[40vh]">
                            {/* <CiSquarePlus size={26} className="hover:cursor-pointer" /> */}
                            <div className='w-full overflow-auto p-3 tree'><TreeView data={data} /></div>
                        </div>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <SiFiles size={18} />
                        <span className="ml-1 hover:cursor-pointer">Import Workspace</span>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <FaSync size={18} />
                        <span className="ml-1 hover:cursor-pointer">Trigger Sync</span>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <FaTrash size={18} />
                        <span className="ml-1 hover:cursor-pointer">Trash</span>
                    </li>
                </ul>
            </aside>
            <div className="bg-slate-300 cursor-col-resize w-3" title="Hold and drag to resize the side bar" onMouseDown={handleMouseDown} />
            <main id="main-section">
                {children}
            </main>
        </div>
    )
}

export default WorkspaceLayout
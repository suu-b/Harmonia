'use client'

import { ReactNode, useEffect, useState } from "react"
import { LuImport } from "react-icons/lu"
import { IoSettings, IoSearchSharp } from "react-icons/io5"
import { SiFiles } from "react-icons/si"
import { FaSync, FaTrash, FaArrowsAltH} from "react-icons/fa"

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
                    <li className="mt-3 flex items-center">
                        <IoSearchSharp size={18} />
                        <span className="ml-1 hover:cursor-pointer">Quick Find</span>
                    </li>
                    <li className="mt-3 flex items-center">
                        <IoSettings size={18} />
                        <span className="ml-1">Settings</span>
                    </li>
                    <li className="my-8 flex flex-col">
                        <div className="flex items-center">
                            <LuImport size={18} />
                            <span className="ml-1">Workspace</span>
                        </div>
                        <div id="workspace-container" className="border bg-white my-3 rounded flex text-sm font-thin text-slave-500 items-center justify-center h-[40vh]">No Data to show</div>
                    </li>
                    <li className="mt-3 flex items-center">
                        <SiFiles size={18} />
                        <span className="ml-1">Import Workspace</span>
                    </li>
                    <li className="mt-3 flex items-center">
                        <FaSync size={18} />
                        <span className="ml-1">Trigger Sync</span>
                    </li>
                    <li className="mt-3 flex items-center">
                        <FaTrash size={18} />
                        <span className="ml-1">Trash</span>
                    </li>
                </ul>
            </aside>
            <div
                className="bg-slate-300 cursor-col-resize w-3" title="Hold and drag to resize the side bar"
                onMouseDown={handleMouseDown} >
                <FaArrowsAltH color="gray" />
            </div>
            <main id="main-section">
                {children}
            </main>
        </div>
    )
}

export default WorkspaceLayout
'use client'

import data from '@/data/workspace-data.json'
import Link from 'next/link'
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
    const [sideBarWidth, setSideBarWidth] = useState(25)
    const [isResizing, setIsResizing] = useState(false)

    const handleMouseDown = () => setIsResizing(true)
    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) {
            const newWidth = (e.clientX / window.innerWidth) * 100
            if (newWidth >= 25) setSideBarWidth(newWidth)
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
                className="flex flex-col justify-center grid-background p-8 pr-3 gap-8"
                style={{ width: `${sideBarWidth}vw` }}
            >
                <ul className="text-slate-600 font-bold text-sm text-left">
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <IoSearchSharp size={18} />
                        <Link href="/workspace/quick-find"><span className="ml-1 hover:cursor-pointer">Quick Find</span></Link>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <IoSettings size={18} />
                        <Link href="/workspace/settings"><span className="ml-1 hover:cursor-pointer">Settings</span></Link>
                    </li>
                    <li className="my-8 flex flex-col">
                        <div className="flex items-center">
                            <SiFiles size={18} />
                            <Link href="/workspace"><span className="ml-1 hover:cursor-pointer">Workspace</span></Link>
                        </div>
                        <div id="workspace-container" className="border bg-white my-3 rounded flex flex-col text-[13px] font-thin text-slate-500 items-center h-[40vh]">
                            {data && data.length > 0 ? <div className='w-full overflow-auto p-3 tree'><TreeView data={data} /> </div> : <div className='w-fit h-fit m-auto flex items-center justify-center flex-col'>< CiSquarePlus size={26} className="hover:cursor-pointer" /> <p>No projects found</p></div>}
                        </div>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <LuImport size={18} />
                        <Link href="/workspace/import-workspace"><span className="ml-1 hover:cursor-pointer">Import Workspace</span></Link>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <FaSync size={18} />
                        <Link href="/workspace/sync"><span className="ml-1 hover:cursor-pointer">Trigger Sync</span></Link>
                    </li>
                    <li className="mt-3 flex items-center hover:text-slate-800">
                        <FaTrash size={18} />
                        <Link href="/workspace/trash"><span className="ml-1 hover:cursor-pointer">Trash</span></Link>
                    </li>
                </ul>
            </aside>
            <div className="bg-slate-300 cursor-col-resize w-3" title="Hold and drag to resize the side bar" onMouseDown={handleMouseDown} />
            <main id="main-section" style={{ width: `${100 - sideBarWidth}vw` }}>
                {children}
            </main>
        </div>
    )
}

export default WorkspaceLayout
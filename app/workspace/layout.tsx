'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from "react"
import { LuImport } from "react-icons/lu"
import { IoSettings, IoSearchSharp } from "react-icons/io5"
import { SiFiles } from "react-icons/si"
import { FaSync, FaTrash } from "react-icons/fa"
import formatWorkspaceUtils from '@/utils/formatWorkspaceUtils'
import axios from 'axios'
import NoWorkspace from '@/components/workspace/fallbacks/NoWorkspace'
import getCookie from '@/utils/getCookie'
import WorkspaceTree from '@/components/workspace/workspace-tree/WorkspaceTree'
import WorkspaceEmpty from '@/components/workspace/fallbacks/EmptyWorkspace'
import { MoonLoader } from 'react-spinners'

interface WorkspaceLayoutProps {
    children: ReactNode
}

const WorkspaceLayout = ({ children, }: WorkspaceLayoutProps) => {
    const [workspaceId, setWorkspaceId] = useState<string | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [data, setData] = useState<FinalDataTreeStructure[] | null>(null)

    useEffect(() => {
        setAccessToken(getCookie("accessToken"))
        setWorkspaceId(getCookie("workspace_id"))
    }, [])

    useEffect(() => {
        const handleGetWorkspace = async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/google-drive/get-folder`, {
                    accessToken: accessToken, folderID: workspaceId
                })
                const formattedResponse: FinalDataTreeStructure[] = await formatWorkspaceUtils(response.data.files)
                setData(formattedResponse)
            }
            catch (e) {
                console.error("ERROR: Fetching user docs:" + e)
            }
        }
        if (workspaceId) handleGetWorkspace()
    }, [workspaceId, accessToken])

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
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
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
                        <div id="workspace-container" className="border bg-white my-3 rounded flex flex-col justify-center items-center text-[13px] font-thin text-slate-500 h-[40vh]">
                            {workspaceId ? (
                                data ? (
                                    data.length > 0 ? (
                                        <div className="w-full h-full flex items-start">
                                            <WorkspaceTree data={data} />
                                        </div>
                                    ) : (
                                        <WorkspaceEmpty />
                                    )

                                ) : (
                                    <MoonLoader size={20} />
                                )
                            ) : (
                                <div className="flex flex-col justify-center items-center w-full h-full">
                                    <NoWorkspace accessToken={accessToken} />
                                </div>
                            )}

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
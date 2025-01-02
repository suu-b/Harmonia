import Image from "next/image"

const WorkspacePage: React.FC = () => {
    return (
        <div className="h-screen shadow-lg bg-white p-24 ">
            <section id="workspace-snoopy">
                <Image
                    src="/workspace-snoopy.png"
                    alt="home-banner"
                    width={250}
                    height={250}
                />
            </section>
            <h1 className="font-black text-slate-900 text-6xl">Hello <span className="text-blue-300">Shubham</span>!</h1>
            <p className="text-slate-600 text-base text-left w-[60%] mt-1">Your workspace is ready. Find your repositories listed in your workspace. You can always create new projects. For manual sync with google drive find the link in bottom-left. <br/><br/>
            <span className="font-semibold">Cheers!</span></p>
        </div>
    )
}

export default WorkspacePage
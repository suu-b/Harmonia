import Image from "next/image"
import { FaGoogle } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <main className="grid-background bg-slate-100 h-[100vh] flex justify-center items-center flex-col">
      <section id="banner" className="flex justify-center items-center">
        <Image
          src="/home-banner.jpg"
          alt="home-banner"
          width={1250}
          height={250}
          className="rounded-lg shadow-lg border"
        />
      </section>
      <section id="heading" className="mt-8 flex flex-col items-center justify-center">
        <h1 className="font-black text-slate-900 text-7xl">HARMONIA</h1>
        <p className="text-slate-600 text-base w-[85%] text-center mt-1">Organize, sync and access your notes effortlessly with our web-app, seamlessly integrated with Google Drive for ultimate convenience</p>
        <h2 className="text-lg text-slate-700 font-extrabold my-3">Research. Create. Note. Sync</h2>
        <button id="continue-with-google" className="bg-blue-400 hover:bg-blue-500 px-5 py-2 rounded text-white flex justify-between items-center">Continue with Google<FaGoogle size={18} className="ml-1"/></button>
      </section>

    </main>
  )
}

export default Home
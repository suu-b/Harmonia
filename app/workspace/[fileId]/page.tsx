import { use } from 'react'

interface FilePageProps {
  params: Promise<{ fileId: string }> 
}

const FilePage = ({ params }: FilePageProps) => {
  const { fileId } = use(params)

  return (
    <div className='text-slate-900'>
      <h1>Dynamic File Page</h1>
      <p>This is the content for file: {fileId}</p>
    </div>
  )
}

export default FilePage

import { use } from 'react';

interface FilePageProps {
  params: Promise<{ fileId: string }>; // Note that params is now a Promise
}

const FilePage = ({ params }: FilePageProps) => {
  // Unwrap the params using `use()`
  const { fileId } = use(params);

  return (
    <div className='text-slate-900'>
      <h1>Dynamic File Page</h1>
      <p>This is the content for file: {fileId}</p>
    </div>
  );
};

export default FilePage;

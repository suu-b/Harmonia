'use client';

import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const [loading, setIsLoading] = useState<Boolean>(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // signIn('google', { callbackUrl: '/user-auth' });
  };

  return (
    <main>
      <section id="banner" className="flex justify-center items-center">
        <Image
          src="/home-banner.jpg"
          alt="home-banner"
          width={1250}
          height={250}
          className="rounded-lg shadow-lg border"
        />
      </section>
      <section
        id="heading"
        className="mt-8 flex flex-col items-center justify-center"
      >
        <h1 className="font-black text-slate-900 text-7xl">HARMONIA</h1>
        <p className="text-slate-600 text-base w-[85%] text-center mt-1">
          Organize, sync and access your notes effortlessly with our web-app,
          seamlessly integrated with Google Drive for ultimate convenience
        </p>
        <h2 className="text-lg text-slate-700 font-extrabold my-3">
          Research. Create. Note. Sync
        </h2>
        <div className="h-24">
          {loading ? (
            <MoonLoader className="my-2" size={25} />
          ) : (
            <Button
              onClick={handleGoogleSignIn}
              variant="default"
              size="lg"
              className="gap-2 hover:cursor-pointer"
            >
              Continue with Google
              <FaGoogle size={18} />
            </Button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;

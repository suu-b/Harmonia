"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

import setCookie from "@/lib/cookies/setCookie";

/**
 * * UserAuthPage component
 * * This component is used to display the user authentication page.
 * * It shows a welcome message and a loading spinner while the user is being authenticated.
 */
const UserAuthPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  /**
   * Once the user is authenticated and the access Token is generated, the access token is set in the cookie and the user is redirected to the workspace page with an intentional delay of 3 seconds.
   * The delay is used to show the loading spinner and the welcome message to the user.
   */
  useEffect(() => {
    if (session?.user) {
      if (session?.accessToken) {
        setCookie({
          cookieName: "accessToken",
          cookieVal: session.accessToken,
          expiryDays: 0.04,
        });
      }

      setTimeout(() => {
        router.push("workspace");
      }, 3000);
    }
  }, [session?.user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <div className="grid-background bg-gray-100 flex flex-col justify-center items-center min-h-screen p-6">
        {status === "authenticated" ? (
          <Card className="w-fulltext-center p-10">
            <CardContent className="flex flex-col justify-center items-center">
              <CardHeader className="text-lg tracking-wider text-center text-slate-800">
                HARMONIA
              </CardHeader>
              <CardTitle className="text-4xl font-bold my-3">
                Welcome,{" "}
                <span className="text-blue-300">{session.user?.name}</span>
              </CardTitle>
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="Profile Image"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              )}
              <p className="font-semibold text-slate-600 mt-5 mb-2">
                Harmonia is setting up your workspace...
              </p>
              <BeatLoader color="#1E293B" size={15} />
            </CardContent>
          </Card>
        ) : status === "loading" ? (
          <Card className="w-full max-w-md text-center p-10">
            <CardContent className="flex flex-col justify-center items-center">
              <CardDescription className="text-xl font-bold my-3">
                Loading...
              </CardDescription>
              <BeatLoader color="#1E293B" size={15} />
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-md text-center p-10">
            <CardContent className="flex flex-col justify-center items-center">
              <CardDescription>
                We don't think you've signed in yet.
              </CardDescription>
              <CardDescription>Please Log in and try again.</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default UserAuthPage;

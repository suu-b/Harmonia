"use client";

import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "./store";

/**
 * RootLayout component
 * It wraps the entire application with a layout that includes a background, font, and session provider.
 * The background is a grid pattern.
 * The session provider is used to manage the authentication state of the user by next-auth.
 * AnimatePresence is used to animate the children components when they are mounted or unmounted.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Harmonia</title>
        <meta name="description" content="Research. Create. Note. Sync" />
      </head>
      <body>
        <main className="grid-background bg-slate-100 h-[100vh] flex justify-center items-center flex-col">
          <Provider store={store}>
            <AnimatePresence mode="wait" initial={false}>
              <SessionProvider>{children}</SessionProvider>
            </AnimatePresence>
          </Provider>
        </main>
      </body>
    </html>
  );
}

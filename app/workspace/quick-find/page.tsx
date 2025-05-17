"use client";

import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { GoogleDriveDocument } from "@/types/google-drive-document";
import { fetchUserDocumentsFromGDrive } from "@/lib/googleDrive";
import DocumentList from "./components/DocumentList";

const QuickFindPage: React.FC = () => {
  const { data: session } = useSession();
  const [userDocuments, setUserDocuments] = useState<
    GoogleDriveDocument[] | null
  >(null);
  const [results, setResults] = useState<GoogleDriveDocument[] | null>(null);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (session?.accessToken) {
      fetchUserDocumentsFromGDrive(session.accessToken).then((data) => {
        setUserDocuments(data.files);
        setResults(data.files);
      });
    }
  }, [session?.accessToken]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value.toLowerCase();
    setQuery(searchItem);
  };

  const handleSearch = () => {
    if (userDocuments) {
      const filtered = userDocuments.filter((item: GoogleDriveDocument) =>
        item.name.toLowerCase().includes(query)
      );
      setResults(filtered);
    }
  };

  return (
    <section
      id="quickfind"
      className="flex flex-col items-center justify-center h-screen w-full p-8 bg-white"
    >
      <Image
        src="/detective-snoopy.png"
        alt="quick-find-banner"
        width={200}
        height={200}
      />
      <h3 className="text-4xl font-bold text-slate-800 my-2 text-center">
        Find your drive documents here
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xl text-center">
        You could search for documents from Google Drive here. You can even
        import them into your workspace. No need to visit Drive—access
        everything relevant here. Amazing, isn't it?
      </p>

      <div className="flex w-full max-w-2xl items-center space-x-2 mb-10">
        <Input
          placeholder="Search for your documents here 🔍..."
          onChange={handleQueryChange}
          className="text-sm"
        />
        <Button variant="default" size="icon" onClick={handleSearch}>
          <CiSearch className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="w-full max-w-3xl h-[40vh] px-2">
        <DocumentList resultDocuments={results} />
      </ScrollArea>
    </section>
  );
};

export default QuickFindPage;

"use client";

import ImportWorkSpaceModal from "./components/ImportWorkspaceModal";
import getCookie from "@/lib/cookies/getCookie";

/**
 * Component to render the import workspace page.
 */
const ImportWorkspacePage: React.FC = () => {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    return <p>Loading...</p>;
  }

  return <ImportWorkSpaceModal accessToken={accessToken} />;
};

export default ImportWorkspacePage;

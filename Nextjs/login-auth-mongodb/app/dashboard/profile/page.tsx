"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-lg bg-white w-full p-4 rounded-md">
        <h1>Profile</h1>
        <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
      </div>
    </div>
  );
}

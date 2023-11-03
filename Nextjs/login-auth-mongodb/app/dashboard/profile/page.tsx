"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  console.log(session, status);

  return (
    <div className="bg-indigo-50 h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 gap-y-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl text-center font-bold">Profile</h1>
        <pre className="max-w-4xl bg-white w-full p-4 rounded-md">
          {JSON.stringify({ session, status }, null, 2)}
        </pre>
      </div>
      <button
        onClick={() => {
          signOut();
        }}
        className="px-16 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
      >
        Salir
      </button>
    </div>
  );
}

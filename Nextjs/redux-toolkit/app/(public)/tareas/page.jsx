import Link from "next/link";
import React from "react";

export default function TasksPage() {
  return (
    <div className="flex flex-col mx-auto h-screen bg-black text-white p-4 sm:p-8 gap-12">
      <div className="grid grid-cols-3 justify-between items-center text-center">
        <Link
          href="/"
          className="w-36 py-2 border border-white rounded-md text-center text-lg"
        >
          Regresar
        </Link>
        <h1 className="text-3xl">Tareas</h1>
      </div>
    </div>
  );
}

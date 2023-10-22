"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/redux/features/tasks/taskSlice";

export default function HomePage() {
  const count = useSelector((state) => state.tasksReducer.counter);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col mx-auto h-screen bg-black text-white p-4 sm:p-8 gap-12">
      <div className="text-center text-2xl">
        <h1>Total: {count}</h1>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          className="bg-green-500 py-2 px-4 rounded-md"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>

        <button
          className="bg-blue-500 py-2 px-4 rounded-md"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <Link
          href="/acceso"
          className="w-80 py-4 border border-white rounded-md text-center"
        >
          Iniciar sesión
        </Link>

        <Link
          href="/tareas"
          className="w-80 py-4 border border-white rounded-md text-center"
        >
          Ver tareas
        </Link>

        <Link
          href="/usuarios"
          className="w-80 py-4 border border-white rounded-md text-center"
        >
          Ver Usuarios
        </Link>
      </div>
    </div>
  );
}

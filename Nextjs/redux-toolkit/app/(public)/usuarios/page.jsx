"use client";
import React from "react";
import Link from "next/link";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
} from "@/redux/services/userApi";

export default function UsersPage() {
  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>Some error</p>;

  return (
    <div className="flex flex-col mx-auto h-screen bg-black text-white p-4 sm:p-8 gap-12">
      <div className="grid grid-cols-3 justify-between items-center text-center">
        <Link
          href="/"
          className="w-36 py-2 border border-white rounded-md text-center text-lg"
        >
          Regresar
        </Link>
        <h1 className="text-3xl">PlaceholderAPI: Traer Usuarios</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data?.map((user, i) => (
          <div key={user.id} className="bg-gray-600 rounded-md p-4">
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

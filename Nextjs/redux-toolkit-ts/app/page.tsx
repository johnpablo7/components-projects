"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, decrement } from "@/redux/features/counterSlice";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
} from "@/redux/services/userApi";

function HomePage() {
  const count = useAppSelector((state) => state.counterReducer.counter);
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>Some error</p>;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto h-screen text-white p-8">
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

export default HomePage;

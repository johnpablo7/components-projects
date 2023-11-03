import Link from "next/link";
import { getServerSession } from "next-auth";

export const Navbar = async () => {
  const session = await getServerSession();
  console.log(session);
  console.log(session?.user);

  return (
    <nav className="bg-indigo-50 p-4 border-b border-white">
      <div className="flex justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl">NextAuth</h1>
        </Link>

        <ul className="flex gap-2">
          {!session?.user ? (
            <>
              <li className="px-3 py-1">
                <Link href="/">Inicio</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/about">About</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/login">Acceso</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/register">Registrate</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

import Link from 'next/link';
import { signIn, signOut} from "next-auth/client";

const Navbar = ({session, loading = false}) => {
  return (
    <header>
      <nav className="flex justify-between items-center bg-gray-500 p-3 rounded-md mb-10">
        <p className="text-2xl font-sans font-bold text-gray-800">
          <Link href="/">
            <a>Microblog</a>
          </Link>
        </p>
        <div className="flex">
          {!loading && 
            (session ? (
              <>
                <button className="rounded-md bg-gray-700 text-white py-1 px-3" onClick={signOut}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="rounded-md bg-gray-700 text-white py-1 px-3" onClick={signIn}>
                    Login
                </button>
              </>
            ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
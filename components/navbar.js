import Link from 'next/link';
import { useUser } from '../lib/user';

const Header = () => {
  const { user, loading } = useUser();

  return (
    <header>
      <nav className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-10">
        <p className="text-2xl font-sans font-bold text-gray-800">
          <Link href="/">
            <a>Microblog</a>
          </Link>
        </p>
        <div className="flex">
          {!loading &&
            (user ? (
              <>
                <a class="rounded-md bg-gray-700 text-white py-1 px-3">
                  <a href="/api/logout">Logout</a>
                </a>
              </>
            ) : (
              <>
                <a class="rounded-md bg-gray-700 text-white py-1 px-3 mx-2">
                  <a href="/api/register">Register</a>
                </a>
                <a class="rounded-md bg-gray-700 text-white py-1 px-3">
                  <a href="/api/login">Login</a>
                </a>
              </>
            ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
import Head from 'next/head';

import Header from './navbar';
import { UserProvider, useUser } from '../lib/user';

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>Microblog App</title>
    </Head>

    <Header />

    <main>
      <div className="container mx-auto my-5">{children}</div>
    </main>
  </UserProvider>
);

export default Layout;

import Head from 'next/head';
import Navbar from './navbar';

const Layout = ({session, loading = false, children}) => (
  <>
    <Head>
      <title>Microblog App</title>
    </Head>

    <Navbar session={session} loading={loading}/>

    <main>
      <div className="container mx-auto my-5">{children}</div>
    </main>
  </>
);

export default Layout;

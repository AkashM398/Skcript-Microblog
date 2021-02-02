import Head from "next/head";
import React from "react";
import {useSession } from "next-auth/client";
import Layout from '../components/layout';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className="container mx-auto">
      <Head>
        <title>Auth Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout session={session} loading={loading}>
        <h1 className="text-center font-bold my-5">
          This is a Microblog Application
        </h1>

        {loading && <p className="text-center">Loading login info...</p>}

        {!loading && !session && (
          <>
            <p className="text-center">
              <i>Login</i> to check out the app
            </p>
            <pre className="text-center my-5">
              email: admin
              <br />
              password: admin
            </pre>
          </>
        )}

        {session && (
          <>
            <div className="container">
              <h4 className="text-center">Rendered user info on the client</h4>
            </div>
          </>
        )}
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1, stale-while-revalidate=59'
  );

  return {
    props: {
      host: req.headers.host
    }
  };
}
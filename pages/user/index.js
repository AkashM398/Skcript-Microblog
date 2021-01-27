import React from 'react';

import Layout from '../../components/layout';
import { useFetchUser } from '../../lib/user';

export default function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <h1 className="text-center font-bold my-5">This is a Microblog Application</h1>

      {loading && (
        <p className="text-center">
          Loading login info...
        </p>
      )}

      {!loading && !user && (
        <>
          <p className="text-center">
            <i>Login</i> to check out the app
          </p>
          <pre className="text-center my-5">email: test@gmail.com<br/>password: test@123</pre>
        </>
      )}

      {user && (
        <>
          <div className="container">
            <h4 className="text-center">Rendered user info on the client</h4>
          </div>
        </>
      )}
    </Layout>
  )
};

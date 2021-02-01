import React from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";

export default function SignIn({ providers, csrfToken }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Microblog App</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <form method="post" action="/api/auth/signin/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
              </button>
            </form>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              {Object.values(providers).map((provider) => {
                if (provider.name === "Email") {
                  return;
                }
                return (
                  <div key={provider.name}>
                    <button
                      type="button"
                      onClick={() => signIn(provider.id, {callbackUrl: 'http://localhost:3000'})}
                      className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-md text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                    >
                      {provider.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <a href="/">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <span className="inline-block ml-1">back to homepage</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const isCorrectCredentials = (credentials) =>
  credentials.username === process.env.NEXTAUTH_USERNAME &&
  credentials.password === process.env.NEXTAUTH_PASSWORD;

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (isCorrectCredentials(credentials)) {
          const user = { id: 1, name: 'Admin' };
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/signin",
  // },
  
};

export default (req, res) => NextAuth(req, res, options);

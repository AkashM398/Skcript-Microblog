import NextAuth from "next-auth";
import Providers from "next-auth/providers";


const useSecureCookies = process.env.NEXTAUTH_URL.startsWith('http://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = Url(process.env.NEXTAUTH_URL).hostname
const options = {
  cookies: {
    sessionToken: 
    {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
      }
    },
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

export default (req, res) => NextAuth(req, res, options);

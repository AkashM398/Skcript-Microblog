import "../styles/globals.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <div className="w-full">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;

 import'../styles/globals.css';

 export default function MyApp({ Component, pageProps }) {
     return (
         <div className="container mx-auto my-5">
             <Component {...pageProps}/>
         </div>
     )
 } 
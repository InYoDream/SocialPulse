import "@/styles/globals.css";

import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';


const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId="391465271528-vo90ccn0qmkonorakfdp145lt5or6kmd.apps.googleusercontent.com">
      <Component {...pageProps} />
      </GoogleOAuthProvider>
    </div>
  )
  
}

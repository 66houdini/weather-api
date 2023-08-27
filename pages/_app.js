import "@/styles/globals.css";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function App({ Component, pageProps }) {
  return (
    <KindeProvider>
      <Component {...pageProps} />
    </KindeProvider>
  );
}

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className=" text-white">
      <Component {...pageProps} />
    </div>
    
  );
}

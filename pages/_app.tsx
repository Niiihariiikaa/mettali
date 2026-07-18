import type { AppProps } from "next/app";
import { CartProvider } from "@/components/cart-context";
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

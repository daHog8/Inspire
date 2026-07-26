import "./globals.css";
import { CartProvider } from "../context/cart-context";

export const metadata = {
  title: "INSPIRE",
  description: "L'inspiration sur la peau.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

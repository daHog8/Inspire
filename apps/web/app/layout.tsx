import "./globals.css";
export const metadata = { title: "INSPIRE", description: "L'inspiration sur la peau." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}

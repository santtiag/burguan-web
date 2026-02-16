import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burguan | Hamburguesas Artesanales",
  description: "Las mejores hamburguesas artesanales. Delivery disponible. Visítanos o orderna por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

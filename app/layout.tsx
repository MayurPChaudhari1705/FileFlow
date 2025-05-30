import type { Metadata } from "next";
import { Noto_Sans , Delius } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700" , "800", "900"],
});

const delius = Delius({
  weight : "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FileFlow",
  description: "A smooth and seamless way to manage files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${delius.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import Providers from "./redux/Providers";
import LayoutWrapper from "./components/LayoutWrapper";
import { Poppins, Satisfy } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const satisfy = Satisfy({
  weight: "400", // ✅ Required
  subsets: ["latin"],
  variable: "--font-satisfy",
});
export const metadata = {
  title: "CoffeeHouse",
  description: "Real world coffee shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satisfy.variable} ${poppins.variable} `}>
      <body className="font-poppins text-universal flex flex-col min-h-screen">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

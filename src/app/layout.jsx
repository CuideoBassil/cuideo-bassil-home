import Providers from "@/components/provider";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import { Charm, Jost, Oregano, Roboto } from "next/font/google";
import "./globals.scss";

export const metadata = {
  title: "Cuideo Bassil Home",
  description: "Home appliances and electronics",
};

const body = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});
const heading = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-heading",
});
const p = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-p",
});
const jost = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-jost",
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-roboto",
});
const oregano = Oregano({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--tp-ff-oregano",
});
const charm = Charm({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-charm",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${body.variable} ${heading.variable} ${p.variable} ${jost.variable} ${roboto.variable} ${oregano.variable} ${charm.variable}`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

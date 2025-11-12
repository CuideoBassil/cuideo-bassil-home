import Providers from "@/components/provider";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import { Charm, Jost, Oregano, Roboto } from "next/font/google";
import "./globals.scss";

export const metadata = {
  title: "Cuideo Bassil Home - Premium Home Appliances & Electronics",
  description:
    "Discover premium home appliances and electronics at Cuideo Bassil Home. Shop quality products with fast delivery and excellent customer service.",
  keywords:
    "home appliances, electronics, kitchen appliances, home products, online shopping",
  authors: [{ name: "Cuideo Bassil Home" }],
  openGraph: {
    title: "Cuideo Bassil Home - Premium Home Appliances & Electronics",
    description:
      "Discover premium home appliances and electronics at Cuideo Bassil Home.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const body = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
  display: "swap", // Optimize font loading
});
const heading = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-heading",
  display: "swap",
});
const p = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-p",
  display: "swap",
});
const jost = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-jost",
  display: "swap",
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-roboto",
  display: "swap",
});
const oregano = Oregano({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--tp-ff-oregano",
  display: "swap",
});
const charm = Charm({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-charm",
  display: "swap",
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

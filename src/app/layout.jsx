import { Charm, Jost, Oregano, Roboto } from "next/font/google";
import "./globals.scss";
import MaintenancePage from "./maintenance-page";

export const metadata = {
  title: "Under Maintenance - Cuideo Bassil Home",
  description:
    "Our website is currently undergoing maintenance. We'll be back soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
  display: "swap",
});
const roboto = Roboto({
  weight: ["400", "500", "700"],
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
        className={`${jost.variable} ${roboto.variable} ${oregano.variable} ${charm.variable}`}
      >
        <MaintenancePage />
        {/* <Providers>
          <Header />
          {children}
          <Footer />
        </Providers> */}
      </body>
    </html>
  );
}

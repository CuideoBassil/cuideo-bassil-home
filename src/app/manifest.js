export default function manifest() {
  return {
    name: "Cuideo Bassil Home",
    short_name: "Cuideo",
    description: "Premium home appliances and electronics",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#010f1c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

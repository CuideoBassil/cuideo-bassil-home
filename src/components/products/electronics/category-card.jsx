import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  const { _id, image, name } = category || {};

  return (
    <div style={{ width: "100%", padding: "0.5rem" }}>
      <Link
        href={`/shop?category=${name
          ?.toLowerCase()
          .replace(/&/g, "")
          .split(" ")
          .join("-")}`}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "0.5rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            minHeight: "20rem", // Ensures uniform height for all cards
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "14rem",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={name || "category"}
              style={{ borderRadius: "0.5rem" }}
            />
          </div>
          <div
            style={{
              padding: "0.5rem",
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#4A4A4A",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1, // Ensures the name section fills remaining space
            }}
          >
            {name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;

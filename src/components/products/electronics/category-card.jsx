import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }) => {
  const { _id, image, name } = category || {};

  return (
    <div style={{ width: "100%", padding: "0.5rem" }}>
      <Link
        href={`/shop?productType=${name?.toLowerCase()}`}
        className="category-card-redesign"
      >
        <div className="category-card-img">
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            alt={name || "category"}
            style={{ objectFit: "cover" }}
          />
          <div className="category-card-overlay" />
        </div>
        <div className="category-card-name">{name}</div>
      </Link>
    </div>
  );
};

export default CategoryCard;

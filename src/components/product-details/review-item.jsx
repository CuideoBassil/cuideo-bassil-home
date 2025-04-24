import dayjs from "dayjs";
import { Rating } from "react-simple-star-rating";

const ReviewItem = ({ review }) => {
  const { comment, createdAt, rating, name } = review || {};
  return (
    <div className="tp-product-details-review-avater d-flex align-items-start">
      <div className="tp-product-details-review-avater-content">
        <div className="tp-product-details-review-avater-rating d-flex align-items-center">
          <Rating
            allowFraction
            size={16}
            initialValue={rating}
            readonly={true}
          />
        </div>
        <h3 className="tp-product-details-review-avater-title">{name}</h3>
        <span className="tp-product-details-review-avater-meta">
          {dayjs(createdAt).format("MMMM D, YYYY")}
        </span>

        <div className="tp-product-details-review-avater-comment">
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;

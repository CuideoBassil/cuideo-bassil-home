"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
// internal
import { useAddReviewMutation } from "@/redux/features/reviewApi";
import ErrorMsg from "../common/error-msg";

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().email().label("Email"),
  phoneNumber: Yup.string().label("Phone Number"),
  comment: Yup.string().label("Comment"),
});

const ReviewForm = ({ product_id }) => {
  // const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0.5);
  const [addReview, {}] = useAddReviewMutation();

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = (data) => {
    console.log("data: ", data);
    addReview({
      productId: product_id,
      rating: rating,
      comment: data.comment,
      phoneNumber: data.phoneNumber,
      name: data.name,
      email: data.email,
    }).then((result) => {
      if (result?.error) {
        notifyError(result?.error?.data?.message);
      } else {
        notifySuccess(result?.data?.message);
      }
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-product-details-review-form-rating d-flex align-items-center">
        <p>Your Rating :</p>
        <div className="tp-product-details-review-form-rating-icon d-flex align-items-center">
          <Rating
            onClick={handleRating}
            allowFraction
            size={16}
            initialValue={rating}
          />
        </div>
      </div>
      <div className="tp-product-details-review-input-box">
        <div className="tp-product-details-review-input">
          <textarea
            {...register("comment", { required: "Comment is required!" })}
            id="comment"
            name="comment"
            placeholder="Write your review here..."
          />
        </div>
        <div className="tp-product-details-review-input-title">
          <label htmlFor="msg">Your Review *</label>
        </div>
        <ErrorMsg msg={errors.comment?.message} />
      </div>
      <div className="tp-product-details-review-input-box">
        <div className="tp-product-details-review-input">
          <input
            {...register("name", { required: "Name is required!" })}
            name="name"
            id="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="tp-product-details-review-input-title">
          <label htmlFor="name">Your Name *</label>
        </div>
        <ErrorMsg msg={errors.name?.message} />
      </div>
      <div className="tp-product-details-review-input-box">
        <div className="tp-product-details-review-input">
          <input
            {...register("email", { required: "Email is required!" })}
            name="email"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="tp-product-details-review-input-title">
          <label htmlFor="email">Your Email</label>
        </div>
        <ErrorMsg msg={errors.email?.message} />
      </div>
      <div className="tp-product-details-review-input-box">
        <div className="tp-product-details-review-input">
          <input
            {...register("phoneNumber", {
              required: "Phone Number is required!",
            })}
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
          />
        </div>
        <div className="tp-product-details-review-input-title">
          <label htmlFor="phoneNumber">Your Phone Number</label>
        </div>
        <ErrorMsg msg={errors.phoneNumber?.message} />
      </div>

      <div className="tp-product-details-review-btn-wrapper">
        <button type="submit" className="tp-product-details-review-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;

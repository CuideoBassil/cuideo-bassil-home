"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// internal
import emailjs from "emailjs-com";
import ErrorMsg from "../common/error-msg";

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Subject"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed.")
    .label("Terms and Conditions"),
});

const ContactForm = () => {
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
    if (data) {
      emailjs
        .send(
          "service_jwqxoyl",
          "template_2iw29tc",
          {
            to_email: "cuidobassilhome2025@gmail.com",
            message: data.message,
            name: data.name,
            subject: data.subject,
            email: data.email,
          },
          "zaZOYT0puedHXFONT"
        )
        .then((response) => {
          alert("message sent successfully");
          setMessage("");
        })
        .catch((error) => {
          alert("error sending message");
        });
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
      <div className="tp-contact-input-wrapper">
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("name", { required: `Name is required!` })}
              name="name"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="name">Your Name</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("email", { required: `Email is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="enter your email"
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("subject", { required: `Subject is required!` })}
              name="subject"
              id="subject"
              type="text"
              placeholder="Write your subject"
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="subject">Subject</label>
          </div>
          <ErrorMsg msg={errors.subject?.message} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <textarea
              {...register("message", { required: `Message is required!` })}
              id="message"
              name="message"
              placeholder="Write your message here..."
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="message">Your Message</label>
          </div>
          <ErrorMsg msg={errors.message?.message} />
        </div>
      </div>
      <div className="tp-contact-btn">
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
};

export default ContactForm;

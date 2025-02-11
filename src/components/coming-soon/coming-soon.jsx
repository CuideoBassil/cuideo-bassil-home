"use client";
import social_data from "@/data/social-data";

const ComingSoon = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4"
    >
      <h1
        style={{ fontSize: "40px" }}
        className=" font-bold text-gray-800 mb-4"
      >
        Our website is currently under maintenance.
      </h1>

      <p
        style={{ fontSize: "25px", lineHeight: "30px" }}
        className="text-gray-600"
      >
        Contact us at:{" "}
        <a
          href="tel:+96181342284"
          style={{
            color: "blue",
            textDecoration: "underline",
            lineHeight: "30px",
          }}
          className="text-blue-500"
        >
          +96181342284
        </a>
      </p>
      <p
        style={{ fontSize: "25px", lineHeight: "30px" }}
        className="text-gray-600"
      >
        Or find us on:{" "}
      </p>
      <div className="tp-footer-social">
        {social_data.map((s) => (
          <a href={s.link} key={s.id} target="_blank">
            <i className={s.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;

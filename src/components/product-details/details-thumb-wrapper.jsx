"use client";
import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";

const DetailsThumbWrapper = ({
  imageURLs,
  handleImageActive,
  activeImg,
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav>
          <div
            className="nav nav-tabs flex-sm-column"
            style={{
              gap: "0.75rem",
            }}
          >
            {imageURLs?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item === activeImg ? "active" : ""}`}
                onClick={() => handleImageActive(item)}
                style={{
                  border:
                    item === activeImg
                      ? "3px solid #667eea"
                      : "2px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "0.25rem",
                  transition: "all 0.3s ease",
                  backgroundColor: "white",
                  boxShadow:
                    item === activeImg
                      ? "0 4px 12px rgba(102, 126, 234, 0.2)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (item !== activeImg) {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (item !== activeImg) {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <Image
                  src={item}
                  alt="image"
                  width={78}
                  height={100}
                  style={{ width: "100%", height: "100%", borderRadius: "6px" }}
                />
              </button>
            ))}
          </div>
        </nav>
        <div
          className="tab-content m-img"
          style={{
            border: "2px solid #e2e8f0",
            borderRadius: "12px",
            padding: "1rem",
            backgroundColor: "white",
          }}
        >
          <Image
            src={activeImg}
            alt="product img"
            width={imgWidth}
            height={imgHeight}
            style={{
              objectFit: "contain",
              width: 700,
              height: 500,
              borderRadius: "8px",
            }}
          />
          {/* <div className="tp-product-badge">
            {status === "out-of-stock" && (
              <span className="product-hot">out-stock</span>
            )}
          </div> */}
        </div>
      </div>
      {/* modal popup start */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
      {/* modal popup end */}
    </>
  );
};

export default DetailsThumbWrapper;

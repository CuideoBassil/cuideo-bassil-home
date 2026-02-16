"use client";

import Wrapper from "@/layout/wrapper";
import { useGetPageByKeyQuery } from "@/redux/features/pageApi";
import Link from "next/link";

export default function AboutUsPage() {
  const { data: page, isLoading, isError } = useGetPageByKeyQuery("about");

  return (
    <Wrapper>
      <div style={{ minHeight: "100vh" }}>
        <section
          className="breadcrumb__area include-bg text-center"
          style={{
            paddingTop: "40px",
            paddingBottom: "40px",
            background: "linear-gradient(135deg, #F8F9FA 0%, #EEF0F3 100%)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3
                    className="breadcrumb__title"
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      marginBottom: "8px",
                    }}
                  >
                    About Us
                  </h3>
                  <div className="breadcrumb__list">
                    <span>
                      <Link href="/">Home</Link>
                    </span>
                    <span>About Us</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-us__content container" style={{ paddingTop: "50px", paddingBottom: "60px" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #ECEEF0",
                  borderTopColor: "var(--tp-theme-primary)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p style={{ color: "#6B7280", fontSize: "15px" }}>Loading...</p>
            </div>
          ) : isError ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #ECEEF0",
              }}
            >
              <p style={{ color: "#6B7280", fontSize: "15px" }}>
                There was an error loading the page.
              </p>
            </div>
          ) : (
            <div
              className="about-us__dynamic-content"
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #ECEEF0",
                padding: "40px",
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#4A4F56",
              }}
              dangerouslySetInnerHTML={{
                __html: JSON.parse(page?.data?.data),
              }}
            />
          )}
        </section>
      </div>
    </Wrapper>
  );
}

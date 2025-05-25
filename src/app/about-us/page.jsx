"use client";

import Wrapper from "@/layout/wrapper";
import { useGetPageByKeyQuery } from "@/redux/features/pageApi";
import Link from "next/link";

//  const metadata = {
//   title: "Cuideo Bassil Home - About Us",
// };

export default function AboutUsPage() {
  const { data: page, isLoading, isError } = useGetPageByKeyQuery("about");

  return (
    <Wrapper>
      <div style={{ minHeight: "100vh" }}>
        <section className="breadcrumb__area include-bg text-center pt-25 pb-10">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="breadcrumb__content p-relative z-index-1">
                  <h3 className="breadcrumb__title">About Us</h3>
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

        <section className="about-us__content container pb-40">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>There was an error loading the page.</p>
          ) : (
            <div
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

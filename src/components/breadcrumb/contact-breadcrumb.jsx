import Link from "next/link";

const ContactBreadcrumb = () => {
  return (
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
                Contact Us
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#6B7280",
                  marginBottom: "12px",
                  maxWidth: "480px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Have a question or need help? We&apos;d love to hear from you.
              </p>
              <div className="breadcrumb__list">
                <span>
                  <Link href="/">Home</Link>
                </span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;

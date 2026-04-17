import Image from "next/image";

export default function MaintenancePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background:
          "linear-gradient(135deg, #f8f5f0 0%, #ede4d3 50%, #e4d5b7 100%)",
        fontFamily:
          "var(--tp-ff-body), 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "640px",
          width: "100%",
          textAlign: "center",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "56px 40px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <Image
            src="/assets/img/logo/logo.png"
            alt="Cuideo Bassil Home"
            width={200}
            height={60}
            priority
            style={{
              height: "auto",
              maxWidth: "220px",
              width: "100%",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "64px",
            marginBottom: "16px",
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          🔧
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#1a1a1a",
            margin: "0 0 16px 0",
            lineHeight: 1.3,
          }}
        >
          We&apos;ll be back soon
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#555",
            lineHeight: 1.6,
            margin: "0 0 24px 0",
          }}
        >
          Our website is currently undergoing scheduled maintenance. We
          apologize for the inconvenience and appreciate your patience while we
          work to restore service.
        </p>

        <p
          style={{
            fontSize: "15px",
            color: "#777",
            lineHeight: 1.6,
            margin: "0 0 32px 0",
          }}
        >
          Please check back shortly. Thank you for your understanding.
        </p>

        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid #eee",
            fontSize: "14px",
            color: "#888",
          }}
        >
          <div style={{ marginBottom: "10px" }}>Need to reach us?</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <a
              href="tel:96181342284"
              style={{
                color: "#8b6f47",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              +961 81-342284
            </a>
            <a
              href="mailto:cuidobassilhome2025@gmail.com"
              style={{
                color: "#8b6f47",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              cuidobassilhome2025@gmail.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

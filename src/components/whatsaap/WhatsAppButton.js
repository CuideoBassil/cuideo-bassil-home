"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+96181342284";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "7rem",
        right: "2rem",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        backgroundColor: "#25D366",
        padding: isHovered ? "0.75rem 1.5rem 0.75rem 0.75rem" : "0.75rem",
        borderRadius: "50px",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        textDecoration: "none",
        animation: "pulse 2s infinite",
      }}
    >
      <FaWhatsapp size={40} color="white" />
      {isHovered && (
        <span
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: "1rem",
            whiteSpace: "nowrap",
            animation: "slideIn 0.3s ease",
          }}
        >
          Chat with us!
        </span>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.7);
          }
          100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppButton;

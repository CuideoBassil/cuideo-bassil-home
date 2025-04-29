import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+96181342284";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: "transparent",
        position: "fixed",
        bottom: "7rem",
        right: "1rem",
        zIndex: "1000",
      }}
    >
      <FaWhatsapp size={60} color="green" />
    </a>
  );
};

export default WhatsAppButton;

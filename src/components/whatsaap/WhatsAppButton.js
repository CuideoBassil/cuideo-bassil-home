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
        top: "6rem",
        right: "1rem",
        zIndex: "1000",
      }}
    >
      <FaWhatsapp size={50} color="green" />
    </a>
  );
};

export default WhatsAppButton;

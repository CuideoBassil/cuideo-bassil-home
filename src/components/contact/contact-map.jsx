const ContactMap = () => {
  return (
    <section className="tp-map-area" style={{ paddingBottom: "80px" }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div
              className="tp-map-wrapper"
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #ECEEF0",
              }}
            >
              <div className="tp-map-iframe">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13221.593387405981!2d35.64484445553191!3d34.05930142204045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f43552d8fed8b%3A0x98158506cde41978!2sCuideo%20Bassil%20Home!5e0!3m2!1sen!2slb!4v1739665252606!5m2!1sen!2slb"
                  width="100%"
                  height="400"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ display: "block", border: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;

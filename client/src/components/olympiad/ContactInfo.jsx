import React from "react";

const ContactInfo = ({ content }) => {
  return (
    <section id="Contact" className="contact">
      <h3>{content.contact}</h3>
      <ul>
        {content.contact_us.map((item, i) => (
          <li key={i}>
            <strong>{item.label}: </strong> {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContactInfo;
import react from "react";
import ImageCarousel from "./Carousal";
import "../components/styles/olympiad.css";
import olympiad1 from "../components/images/olympiad1.webp";
import olympiad2 from "../components/images/olympiad2.webp";
import olympiad3 from "../components/images/olympiad3.webp";
import olympiad4 from "../components/images/olympiad4.webp";

const images = [olympiad1, olympiad2, olympiad3, olympiad4];
const content = {
  en: {
    title: "Olympiad",
    desc: "The Olympiad is organized to encourage students to showcase their knowledge, logical thinking, and problem-solving skills. It helps in developing competitive spirit and builds confidence.",
    register: "Register Now",
    contact: "Contact",
  },
  hi: {
    title: "ओलंपियाड",
    desc: "ओलंपियाड का आयोजन छात्रों को अपना ज्ञान, तार्किक सोच और समस्या समाधान क्षमता प्रदर्शित करने के लिए प्रोत्साहित करने हेतु किया जाता है। यह प्रतिस्पर्धात्मक भावना विकसित करता है और आत्मविश्वास बढ़ाता है।",
    register: "अभी पंजीकरण करें",
    contact: "संपर्क करें",
  },
};

const Olympiad = ({ languageType }) => {
  const selectedContent = content[languageType] || content.en;
  return (
    <div className="olympiad-container">
      <ImageCarousel images={images} />
      <div className="olympiad-intro">
        <h2>{selectedContent.title}</h2>
        <p>{selectedContent.desc}</p>
        <div className="buttons">
          <button className="btn">{selectedContent.register}</button>
          <button className="btn">{selectedContent.contact}</button>
        </div>
      </div>
    </div>
  );
};

export default Olympiad;

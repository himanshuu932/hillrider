import React from "react";
import "./styles/Donate.css";

const Donate = ({ languageType = 'en' }) => {
  const content = {
    en: {
      heading: "DONATE",
      message: `Your contribution helps us bring positive change in society — 
        from providing education to underprivileged children, supporting rural 
        development, promoting environmental conservation, to empowering youth 
        and women through skill development programs. Together, we can create a 
        healthier, educated, and self-reliant community.`,
      button: "Donate Now"
    },
    hi: {
      heading: "दान करें",
      message: `आपका योगदान समाज में सकारात्मक बदलाव लाने में मदद करता है — 
        वंचित बच्चों को शिक्षा प्रदान करने से लेकर ग्रामीण विकास, पर्यावरण 
        संरक्षण को बढ़ावा देने, युवाओं और महिलाओं को कौशल विकास कार्यक्रमों के 
        माध्यम से सशक्त बनाने तक। आइए, मिलकर एक स्वस्थ, शिक्षित और आत्मनिर्भर 
        समाज का निर्माण करें।`,
      button: "अभी दान करें"
    }
  };

  return (
    <div className="donate-container">
      <h2>{content[languageType].heading}</h2>
      <p>{content[languageType].message}</p>
      <button className="donate-btn" onClick={() => alert("Thank you for your interest in donating!")}>
        {content[languageType].button}
      </button>
    </div>
  );
}
export default Donate;
import React from "react";

const OlympiadIntro = ({ content, onRegister, onContact, onDownload }) => {
  return (
    <div className="olympiad-intro">
      <h2>{content.title}</h2>
      <p>{content.desc}</p>
      <div className="buttons">
        <button className="btn" onClick={onRegister}>
          {content.register}
        </button>
        <button className="btn" onClick={onContact}>
          {content.contact}
        </button>
        <button className="btn btn-secondary" onClick={onDownload}>
          {content.downloadReceipt}
        </button>
      </div>
    </div>
  );
};

export default OlympiadIntro;
import React from "react";

const RulesSection = ({ content }) => {
  return (
    <section className="rules">
      <h3>{content.ScholarshipRules}</h3>
      <ul>
        {content.scholarshipRules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
      <h3>{content.GeneralRules}</h3>
      <ul>
        {content.generalRules.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </section>
  );
};

export default RulesSection;
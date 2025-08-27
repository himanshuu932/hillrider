import React from "react";

const ClassWiseSubjects = ({ content }) => {
  return (
    <section className="classWiseSection">
      <h3>{content.ClassWiseSub}</h3>
      <table>
        <thead>
          <tr>
            <th>{content.Class}</th>
            <th>{content.Subject}</th>
          </tr>
        </thead>
        <tbody>
          {content.classwise.map((item, i) => (
            <tr key={i}>
              <td>{item.class}</td>
              <td>{item.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ClassWiseSubjects;
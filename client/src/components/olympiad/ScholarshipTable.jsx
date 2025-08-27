import React from "react";

const ScholarshipTable = ({ content }) => {
  return (
    <section className="scholarship">
      <h3>{content.Scholarship}</h3>
      <table>
        <thead>
          <tr>
            <th>{content.Class}</th>
            <th>{content.First}</th>
            <th>{content.Second}</th>
            <th>{content.Third}</th>
            <th>{content.OtherPrizes}</th>
          </tr>
        </thead>
        <tbody>
          {content.scholarship.map((item, i) => (
            <tr key={i}>
              <td>{item.class}</td>
              <td>{item.first}</td>
              <td>{item.second}</td>
              <td>{item.third}</td>
              <td>{item.other}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ScholarshipTable;
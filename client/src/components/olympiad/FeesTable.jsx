import React from "react";

const FeesTable = ({ content }) => {
  return (
    <section className="fees">
      <h3>{content.Fees}</h3>
      <table>
        <thead>
          <tr>
            <th>{content.Class}</th>
            <th>{content.Amount}</th>
          </tr>
        </thead>
        <tbody>
          {content.fees.map((item, i) => (
            <tr key={i}>
              <td>{item.type}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default FeesTable;
import React from "react";

const ExamDetails = ({ content }) => {
  return (
    <section className="exam">
      <h3>{content.ExamDesc}</h3>
      <div className="exam-tables">
        {content.examData.map((exam, index) => (
          <table key={index} className="exam-table">
            <thead>
              <tr>
                <th colSpan="3" className="class-heading">
                  {content.Class} {exam.class}
                </th>
              </tr>
              <tr>
                <th>{content.Subject}</th>
                <th>{content.Ques}</th>
                <th>{content.Time}</th>
              </tr>
            </thead>
            <tbody>
              {exam.subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td>{subj.subject}</td>
                  <td>{subj.questions}</td>
                  <td>{subj.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </section>
  );
};

export default ExamDetails;
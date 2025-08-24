import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
    Prizes: "Prizes",
    Prize: "Prize",
    Criteria: "Criteria",
    Scholarship: "Scholarship",
    Class: "Class",
    First: "First",
    Second: "Second",
    Third: "Third",
    OtherPrizes: "Other Prizes",
    GeneralRules: "General Rules",
    ScholarshipRules: "Scholarship Rules",
    Fees: "Fees",
    Amount: "Amount",
    ExamDesc: "Exam Description",
    Subject: "Subject",
    Ques: "Question",
    Time: "Duration",
    ClassWiseSub: "Class-Wise Subjects",
    classwise: [
      { class: "1-5", subject: "GK, English/Hindi, Mathematics" },
      { class: "6-8", subject: "GK, English/Hindi, Mathematics, Science" },
      { class: "9-10", subject: "GK, English/Hindi, Mathematics, Science" },
      {
        class: "11-12",
        subject: "Engineering PCM, Medical PCB, General Studies",
      },
      { class: "12th Pass", subject: "General Studies" },
    ],

    contact_us: [
      {
        label: "Name",
        value: "Shivam Mishra (Registration Incharge)- 730760593",
      },
      { label: "Phone/Call", value: "9415116540, 7307605936, 9889138039" },
      { label: "Message", value: "9415116540, 7307605936, 7317775562" },
      {
        label: "Address",
        value:
          "Belawa Khurd, IOCL pump, Sonbasra Bazar, Air Force Road, Gorakhpur, 273002",
      },
      { label: "Email", value: "hrmsevasamiti@gmail.com" },
    ],

    examData: [
      {
        class: "1-2",
        subjects: [
          {
            subject: "GK, English, Hindi, Maths",
            questions: "40",
            duration: "80 minutes",
          },
        ],
      },
      {
        class: "3-5",
        subjects: [
          { subject: "GK", questions: "50", duration: "80 minutes" },
          { subject: "English/Hindi", questions: "50", duration: "80 minutes" },
          { subject: "Maths", questions: "50", duration: "80 minutes" },
        ],
      },
      {
        class: "6-8",
        subjects: [
          { subject: "GK", questions: "60", duration: "80 minutes" },
          { subject: "English/Hindi", questions: "60", duration: "80 minutes" },
          { subject: "Maths", questions: "60", duration: "80 minutes" },
          { subject: "Science", questions: "60", duration: "80 minutes" },
        ],
      },
      {
        class: "9-10",
        subjects: [
          { subject: "GK", questions: "60", duration: "80 minutes" },
          { subject: "English/Hindi", questions: "60", duration: "80 minutes" },
          { subject: "Maths", questions: "60", duration: "80 minutes" },
          { subject: "Science", questions: "60", duration: "80 minutes" },
        ],
      },
      {
        class: "11-12",
        subjects: [
          {
            subject: "Engineering PCM",
            questions: "P20 + C20 + M20",
            duration: "2 hours",
          },
          {
            subject: "Medical PCB",
            questions: "P20 + C20 + M20",
            duration: "2 hours",
          },
          {
            subject: "General Studies (GK, Lang, Social)",
            questions: "40 + 40 + 40",
            duration: "2 hours",
          },
        ],
      },
      {
        class: "12th Pass",
        subjects: [
          {
            subject: "General Studies",
            questions:
              "GK=20, General Studies=20, History=20, Geography=20, Language=20, Method=20, Mathematics=20, Reasoning=20, Total=150",
            duration: "2 hours",
          },
        ],
      },
    ],

    fees: [
      { type: "1-5", amount: "Rs. 120 (per application)" },
      { type: "6-8", amount: "Rs. 130 (per application)" },
      { type: "9-10", amount: "Rs. 150 (per application)" },
      { type: "11-12", amount: "Rs. 210 (per application)" },
      { type: "12 Pass", amount: "Rs. 210 (per application)" },
    ],
    generalRules: [
      "1. Only registered students can appear in the exam.",
      "2. Admit card and original Aadhar card are must to carry along with in the exam hall.",
      "3. Any cheating means like paper, electronic devices, indisciplinary actions, etc.are strictly prohibited in case of any such things found corresponding candidate would be canceled for exam.",
      "4. A candidate can get his/her OMR sheet rechecked at head office paying Rs. 1000/-",
      "5. Admit card will be issued on your WhatsApp number/Email provided/ TO YOUR HRO INCHERGE AT YOUR SCHOOL.",
      "6. All the questions are Multiple Choice Questions (MCQs).",
      "7. The ranks will be decided as per the highest percentage of marks obtained in each CATEGORY.",
      "8. Qualifying Mark is 40. Only qualified students can receive the certificate of excellence rest of the students will get certificate of participant.",
      "9. Report at the centre as time is scheduled, being late no student is allowed to seat in exam once it starts.",
      "10. Answers will be taken on OMR sheets that is to be filled using blue/black ball point pen.,",
    ],
    scholarshipRules: [
      "> Winner trophy, medal and certificate to all candidates securing first, second and third position (each class).",
      "> Medal and certificate along with gift to all 17 students (each class) coming in gift category.",
      "> In case of equal marks in the result, preference will be given to the candidate with higher age and in case of equal age, preference will be given to the one who comes first in alphabetical order of the names of the candidates.",
    ],
    scholarship: [
      {
        class: "1-5",
        first: "Rs. 2100",
        second: "Rs. 1500",
        third: "Rs. 1100",
        other: "17 Prizes to Rest",
      },
      {
        class: "6-8",
        first: "Rs. 3500",
        second: "Rs. 2500",
        third: "Rs. 1500",
        other: "17 Prizes to Rest",
      },
      {
        class: "9-10",
        first: "Rs. 5000",
        second: "Rs. 3500",
        third: "Rs. 2500",
        other: "17 Prizes to Rest",
      },
      {
        class: "11-12",
        first: "Rs. 5500",
        second: "Rs. 4100",
        third: "Rs. 3100",
        other: "17 Prizes to Rest",
      },
      {
        class: "12 Pass",
        first: "Rs. 5100",
        second: "Rs. 3500",
        third: "Rs. 2500",
        other: "17 Prizes to Rest",
      },
    ],
    prizes: [
      { prize: "Certificate", criteria: "All participants" },
      { prize: "Medal", criteria: "Top 3" },
    ],
  },
  hi: {
    title: "ओलंपियाड",
    desc: "ओलंपियाड का आयोजन छात्रों को अपना ज्ञान, तार्किक सोच और समस्या समाधान क्षमता प्रदर्शित करने के लिए प्रोत्साहित करने हेतु किया जाता है। यह प्रतिस्पर्धात्मक भावना विकसित करता है और आत्मविश्वास बढ़ाता है।",
    register: "अभी पंजीकरण करें",
    contact: "संपर्क करें",
    Prizes: "पुरस्कार",
    Prize: "पुरस्कार",
    Criteria: "मानदंड",
    Scholarship: "छात्रवृत्ति",
    Class: "कक्षा",
    First: "प्रथम",
    Second: "द्वितीय",
    Third: "तृतीय",
    OtherPrizes: "अन्य पुरस्कार",
    GeneralRules: "सामान्य नियम",
    ScholarshipRules: "छात्रवृत्ति नियम",
    Fees: "शुल्क",
    Amount: "राशि",
    ExamDesc: "परीक्षा विवरण",
    Subject: "विषय",
    Ques: "प्रश्न",
    Time: "अवधि",
    ClassWiseSub: "कक्षा-वार विषय",
    classwise: [
      { class: "1-5", subject: "सामान्य ज्ञान, अंग्रेज़ी/हिंदी, गणित" },
      {
        class: "6-8",
        subject: "सामान्य ज्ञान, अंग्रेज़ी/हिंदी, गणित, विज्ञान",
      },
      {
        class: "9-10",
        subject: "सामान्य ज्ञान, अंग्रेज़ी/हिंदी, गणित, विज्ञान",
      },
      {
        class: "11-12",
        subject: "इंजीनियरिंग पीसीएम, मेडिकल पीसीबी, सामान्य अध्ययन",
      },
      { class: "12वीं उत्तीर्ण", subject: "सामान्य अध्ययन" },
    ],
    contact_us: [
      {
        label: "नाम",
        value: "शिवम मिश्रा (पंजीकरण प्रभारी) - 730760593",
      },
      { label: "फ़ोन/कॉल", value: "9415116540, 7307605936, 9889138039" },
      { label: "संदेश", value: "9415116540, 7307605936, 7317775562" },
      {
        label: "पता",
        value:
          "बेलवा खुर्द, आईओसीएल पंप, सोनबसरा बाज़ार, एयर फ़ोर्स रोड, गोरखपुर, 273002",
      },
      { label: "ईमेल", value: "hrmsevasamiti@gmail.com" },
    ],

    examData: [
      {
        class: "1-2",
        subjects: [
          {
            subject: "सामान्य ज्ञान, अंग्रेज़ी, हिंदी, गणित",
            questions: "40",
            duration: "80 मिनट",
          },
        ],
      },
      {
        class: "3-5",
        subjects: [
          { subject: "सामान्य ज्ञान", questions: "50", duration: "80 मिनट" },
          { subject: "अंग्रेज़ी/हिंदी", questions: "50", duration: "80 मिनट" },
          { subject: "गणित", questions: "50", duration: "80 मिनट" },
        ],
      },
      {
        class: "6-8",
        subjects: [
          { subject: "सामान्य ज्ञान", questions: "60", duration: "80 मिनट" },
          { subject: "अंग्रेज़ी/हिंदी", questions: "60", duration: "80 मिनट" },
          { subject: "गणित", questions: "60", duration: "80 मिनट" },
          { subject: "विज्ञान", questions: "60", duration: "80 मिनट" },
        ],
      },
      {
        class: "9-10",
        subjects: [
          { subject: "सामान्य ज्ञान", questions: "60", duration: "80 मिनट" },
          { subject: "अंग्रेज़ी/हिंदी", questions: "60", duration: "80 मिनट" },
          { subject: "गणित", questions: "60", duration: "80 मिनट" },
          { subject: "विज्ञान", questions: "60", duration: "80 मिनट" },
        ],
      },
      {
        class: "11-12",
        subjects: [
          {
            subject: "इंजीनियरिंग (भौतिकी, रसायन, गणित)",
            questions: "भौ20 + रा20 + ग20",
            duration: "2 घंटे",
          },
          {
            subject: "मेडिकल (भौतिकी, रसायन, जीव विज्ञान)",
            questions: "भौ20 + रा20 + जी20",
            duration: "2 घंटे",
          },
          {
            subject: "सामान्य अध्ययन (सामान्य ज्ञान, भाषा, सामाजिक विज्ञान)",
            questions: "40 + 40 + 40",
            duration: "2 घंटे",
          },
        ],
      },
      {
        class: "12वीं उत्तीर्ण",
        subjects: [
          {
            subject: "सामान्य अध्ययन",
            questions:
              "सामान्य ज्ञान=20, सामान्य अध्ययन=20, इतिहास=20, भूगोल=20, भाषा=20, विधि=20, गणित=20, तर्कशक्ति=20, कुल=150",
            duration: "2 घंटे",
          },
        ],
      },
    ],

    fees: [
      { type: "कक्षा 1-5", amount: "₹120 (प्रति आवेदन)" },
      { type: "कक्षा 6-8", amount: "₹130 (प्रति आवेदन)" },
      { type: "कक्षा 9-10", amount: "₹150 (प्रति आवेदन)" },
      { type: "कक्षा 11-12", amount: "₹210 (प्रति आवेदन)" },
      { type: "12 पास", amount: "₹210 (प्रति आवेदन)" },
    ],

    generalRules: [
      "1. केवल पंजीकृत छात्र ही परीक्षा में शामिल हो सकते हैं।",
      "2. प्रवेश पत्र और मूल आधार कार्ड परीक्षा हॉल में लाना अनिवार्य है।",
      "3. नकल जैसे- कागज़, इलेक्ट्रॉनिक उपकरण, अनुशासनहीन कार्य आदि सख्त वर्जित हैं। यदि ऐसा कुछ पाया गया तो संबंधित छात्र की परीक्षा रद्द कर दी जाएगी।",
      "4. कोई भी उम्मीदवार अपनी OMR शीट का पुनः परीक्षण हेड ऑफिस में ₹1000/- जमा करवा कर करा सकता है।",
      "5. प्रवेश पत्र आपके द्वारा दिए गए WhatsApp नंबर/ईमेल या आपके विद्यालय के एचआरओ इंचार्ज को जारी किया जाएगा।",
      "6. सभी प्रश्न बहुविकल्पीय (MCQs) होंगे।",
      "7. प्रत्येक श्रेणी में सर्वाधिक अंक प्राप्त करने वाले को रैंक प्रदान की जाएगी।",
      "8. उत्तीर्णांक 40 है। केवल योग्य छात्र ही उत्कृष्टता प्रमाणपत्र प्राप्त करेंगे, शेष छात्रों को सहभागिता प्रमाणपत्र मिलेगा।",
      "9. समय पर परीक्षा केंद्र पर उपस्थित हों, देरी होने पर परीक्षा शुरू होने के बाद किसी भी छात्र को प्रवेश नहीं मिलेगा।",
      "10. उत्तर OMR शीट पर ही लिए जाएंगे जिन्हें नीले/काले बॉल पेन से भरना होगा।",
    ],
    scholarshipRules: [
      "> प्रत्येक कक्षा में प्रथम, द्वितीय और तृतीय स्थान प्राप्त करने वाले सभी विद्यार्थियों को विजेता ट्रॉफी, मेडल और प्रमाणपत्र प्रदान किया जाएगा।",
      "> प्रत्येक कक्षा में 'गिफ्ट कैटेगरी' में आने वाले 17 विद्यार्थियों को मेडल, प्रमाणपत्र और उपहार दिए जाएंगे।",
      "> यदि परिणाम में अंकों की समानता होती है, तो अधिक आयु वाले छात्र को प्राथमिकता दी जाएगी और यदि आयु भी समान हो तो नाम के वर्णक्रम (Alphabetical order) के अनुसार पहले आने वाले को प्राथमिकता मिलेगी।",
    ],
    scholarship: [
      {
        class: "कक्षा 1-5",
        first: "₹2100",
        second: "₹1500",
        third: "₹1100",
        other: "बाकी को 17 सांत्वना पुरस्कार",
      },
      {
        class: "कक्षा 6-8",
        first: "₹3500",
        second: "₹2500",
        third: "₹1500",
        other: "बाकी को 17 सांत्वना पुरस्कार",
      },
      {
        class: "कक्षा 9-10",
        first: "₹5000",
        second: "₹3500",
        third: "₹1500",
        other: "बाकी को 17 सांत्वना पुरस्कार",
      },
      {
        class: "कक्षा 11-12",
        first: "₹5500",
        second: "₹4100",
        third: "₹3100",
        other: "बाकी को 17 सांत्वना पुरस्कार",
      },
      {
        class: "12वीं उत्तीर्ण",
        first: "₹5100",
        second: "₹3500",
        third: "₹2500",
        other: "बाकी को 17 सांत्वना पुरस्कार",
      },
    ],

    prizes: [
      { prize: "प्रमाण पत्र", criteria: "सभी प्रतिभागी" },
      { prize: "मेडल", criteria: "शीर्ष 3" },
    ],
  },
};

const Olympiad = ({ languageType }) => {
  const selectedContent = content[languageType] || content.en;
  const navigate = useNavigate();
  const contactRef = useRef(null);
  const handleRegisterClick = () => {
    navigate("/registration");
  };
  const handleContactClick = () => {
    const section = document.getElementById("Contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="olympiad-container-img">
      <ImageCarousel images={images} />

      {/* Intro Section */}
      <div className="olympiad-container">
        <div className="olympiad-intro">
          <h2>{selectedContent.title}</h2>
          <p>{selectedContent.desc}</p>
          <div className="buttons">
            <button className="btn" onClick={handleRegisterClick}>
              {selectedContent.register}
            </button>
            <button className="btn" onClick={handleContactClick}>
              {selectedContent.contact}
            </button>
          </div>
        </div>

        {/* Class-wise Section */}
        <section>
          <h3>{selectedContent.ClassWiseSub}</h3>
          <table>
            <thead>
              <tr>
                <th>{selectedContent.Class}</th>
                <th>{selectedContent.Subject}</th>
              </tr>
            </thead>
            <tbody>
              {selectedContent.classwise.map((item, i) => (
                <tr key={i}>
                  <td>{item.class}</td>
                  <td>{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Contact Section */}

        <section id="Contact">
          <h3>{selectedContent.contact}</h3>
          <ul>
            {selectedContent.contact_us.map((item, i) => (
              <li key={i}>
                <strong>{item.label}:</strong> {item.value}
              </li>
            ))}
          </ul>
        </section>

        {/* Exam Section */}
        <section>
          <h3>{selectedContent.ExamDesc}</h3>
          <div className="exam-tables">
            {selectedContent.examData.map((exam, index) => (
              <table key={index} className="exam-table">
                <thead>
                  <tr>
                    <th colSpan="3" className="class-heading">
                      {selectedContent.Class} {exam.class}
                    </th>
                  </tr>
                  <tr>
                    <th>{selectedContent.Subject}</th>
                    <th>{selectedContent.Ques}</th>
                    <th>{selectedContent.Time}</th>
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

        {/* Fees Section */}
        <section>
          <h3>{selectedContent.Fees}</h3>
          <table>
            <thead>
              <tr>
                <th>{selectedContent.Class}</th>
                <th>{selectedContent.Amount}</th>
              </tr>
            </thead>
            <tbody>
              {selectedContent.fees.map((item, i) => (
                <tr key={i}>
                  <td>{item.type}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Rules Section */}
        <section>
          <h3>{selectedContent.ScholarshipRules}</h3>
          <ul>
            {selectedContent.scholarshipRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
          <h3>{selectedContent.GeneralRules}</h3>
          <ul>
            {selectedContent.generalRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </section>

        {/* Scholarship Section */}
        <section>
          <h3>{selectedContent.Scholarship}</h3>
          <table>
            <thead>
              <tr>
                <th>{selectedContent.Class}</th>
                <th>{selectedContent.First}</th>
                <th>{selectedContent.Second}</th>
                <th>{selectedContent.Third}</th>
                <th>{selectedContent.OtherPrizes}</th>
              </tr>
            </thead>
            <tbody>
              {selectedContent.scholarship.map((item, i) => (
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

        {/* Prizes Section */}
        {/* <section>
          <h3>{selectedContent.Prizes}</h3>
          <table>
            <thead>
              <tr>
                <th>{selectedContent.Prize}</th>
                <th>{selectedContent.Criteria}</th>
              </tr>
            </thead>
            <tbody>
              {selectedContent.prizes.map((item, i) => (
                <tr key={i}>
                  <td>{item.prize}</td>
                  <td>{item.criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section> */}
      </div>
    </div>
  );
};

export default Olympiad;

import React from "react";
import "./styles/Activities.css";
import Carousel from "../helpers/Carousal";
import activity1 from "../../assets/activity1.webp";
import activity2 from "../../assets/activity2.webp";
import activity3 from "../../assets/activity3.webp";

export default function Activities({ languageType = "en" }) {
  const activities = {
    en: [
      {
        title: "Olympiad",
        img: activity1,
        desc: "Organizing competitive Olympiads for students to enhance knowledge and critical thinking."
      },
      {
        title: "Environmental Awareness",
        img: activity2,
        desc: "Promoting environmental protection through awareness programs, plantation drives, and clean-up campaigns."
      },
      {
        title: "Skill Development",
        img: activity3,
        desc: "Conducting workshops to enhance vocational and professional skills in rural and urban areas."
      }
    ],
    hi: [
      {
        title: "ओलंपियाड",
        img: activity1,
        desc: "छात्रों के ज्ञान और तार्किक क्षमता को बढ़ाने के लिए प्रतिस्पर्धी ओलंपियाड का आयोजन।"
      },
      {
        title: "पर्यावरण जागरूकता",
        img: activity2,
        desc: "जागरूकता कार्यक्रमों, वृक्षारोपण और सफाई अभियानों के माध्यम से पर्यावरण संरक्षण को बढ़ावा देना।"
      },
      {
        title: "कौशल विकास",
        img: activity3,
        desc: "ग्रामीण और शहरी क्षेत्रों में व्यावसायिक और पेशेवर कौशल को बढ़ाने के लिए कार्यशालाओं का आयोजन।"
      }
    ]
  };

  const carouselItems = activities[languageType].map((act) => ({
    src: act.img,
    alt: act.title,
    caption: `${act.title} - ${act.desc}`
  }));

  return (
    <div className="activities-container">
      <h2>{languageType === "en" ? "ACTIVITIES" : "गतिविधियां"}</h2>
      <Carousel images={carouselItems} />
    </div>
  );
}
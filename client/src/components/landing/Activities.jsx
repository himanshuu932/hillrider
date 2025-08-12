import React from "react";
import "./styles/Activities.css";
import Carousel from "../Carousal";

export default function Activities({ language = "en" }) {
  const activities = {
    en: [
      {
        title: "Olympiad",
        img: "https://picsum.photos/800/300?random=1",
        desc: "Organizing competitive Olympiads for students to enhance knowledge and critical thinking."
      },
      {
        title: "Environmental Awareness",
        img: "https://picsum.photos/800/300?random=2",
        desc: "Promoting environmental protection through awareness programs, plantation drives, and clean-up campaigns."
      },
      {
        title: "Skill Development",
        img: "https://picsum.photos/800/300?random=3",
        desc: "Conducting workshops to enhance vocational and professional skills in rural and urban areas."
      }
    ],
    hi: [
      {
        title: "ओलंपियाड",
        img: "https://picsum.photos/800/300?random=1",
        desc: "छात्रों के ज्ञान और तार्किक क्षमता को बढ़ाने के लिए प्रतिस्पर्धी ओलंपियाड का आयोजन।"
      },
      {
        title: "पर्यावरण जागरूकता",
        img: "https://picsum.photos/800/300?random=2",
        desc: "जागरूकता कार्यक्रमों, वृक्षारोपण और सफाई अभियानों के माध्यम से पर्यावरण संरक्षण को बढ़ावा देना।"
      },
      {
        title: "कौशल विकास",
        img: "https://picsum.photos/800/300?random=3",
        desc: "ग्रामीण और शहरी क्षेत्रों में व्यावसायिक और पेशेवर कौशल को बढ़ाने के लिए कार्यशालाओं का आयोजन।"
      }
    ]
  };

  const carouselItems = activities[language].map((act) => ({
    src: act.img,
    alt: act.title,
    caption: `${act.title} - ${act.desc}`
  }));

  return (
    <div className="activities-container">
      <h2>{language === "en" ? "ACTIVITIES" : "गतिविधियां"}</h2>
      <Carousel images={carouselItems} />
    </div>
  );
}
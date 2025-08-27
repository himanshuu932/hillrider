import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import paths are updated for your file structure
import ImageCarousel from "../helpers/Carousal";
import { images, content } from "./olympiadContent";
import "./styles/olympiad.css";

// Child Components imported from the same directory
import OlympiadIntro from "./OlympiadIntro";
import ClassWiseSubjects from "./ClassWiseSubjects";
import ExamDetails from "./ExamDetails";
import FeesTable from "./FeesTable";
import RulesSection from "./RulesSection";
import ScholarshipTable from "./ScholarshipTable";
import ContactInfo from "./ContactInfo";
import ReceiptModal from "./ReceiptModal";

const Olympiad = ({ languageType }) => {
  const selectedContent = content[languageType] || content.en;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => navigate("/registration");
  
  const handleContactClick = () => {
    document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="olympiad-container-img">
      <ImageCarousel images={images} />

      <div className="olympiad-container">
        <OlympiadIntro
          content={selectedContent}
          onRegister={handleRegisterClick}
          onContact={handleContactClick}
          onDownload={() => setIsModalOpen(true)}
        />
        
        <ClassWiseSubjects content={selectedContent} />
        <ExamDetails content={selectedContent} />
        <FeesTable content={selectedContent} />
        <RulesSection content={selectedContent} />
        <ScholarshipTable content={selectedContent} />
        <ContactInfo content={selectedContent} />
      </div>

      <ReceiptModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        languageType={languageType}
      />
    </div>
  );
};

export default Olympiad;
import "./styles/AboutUs.css";
import missionVisionBg from './img.jpg';

const content = {
  en: {
    aboutTitle: "ABOUT US",
    aboutText: `<strong>Hill Riders Manav Sewa Samiti</strong> is a registered non-profit organization (Reg. No. GOR/02834/2023-2024) dedicated to holistic community development. We are committed to uplifting society through multifaceted initiatives in education, environmental conservation, healthcare, and social welfare. Our focus is on empowering marginalized communities, fostering self-reliance among the youth, and creating a sustainable and harmonious society for all. Through our various projects, we strive to build a future where every individual has the opportunity to thrive.`,
    missionTitle: "MISSION",
    visionTitle: "VISION",
    missionAndVisionText: `To provide every child with an ideal, modern, and developed education, ensuring their holistic development through academics, cultural arts, and sports to make them self-reliant. We are dedicated to environmental protection and instilling positive values to foster an atmosphere of harmony and brotherhood.`
  },
  hi: {
    aboutTitle: "हमारे बारे में",
    aboutText: `<strong>हिल राइडर्स मानव सेवा समिति</strong> एक पंजीकृत गैर-लाभकारी संगठन (पंजीकरण संख्या GOR/02834/2023-2024) है जो समग्र सामुदायिक विकास के लिए समर्पित है। हम शिक्षा, पर्यावरण संरक्षण, स्वास्थ्य सेवा, और सामाजिक कल्याण में बहुमुखी पहलों के माध्यम से समाज के उत्थान के लिए प्रतिबद्ध हैं। हमारा ध्यान हाशिए पर मौजूद समुदायों को सशक्त बनाने, युवाओं में आत्मनिर्भरता को बढ़ावा देने, और सभी के लिए एक स्थायी और सामंजस्यपूर्ण समाज बनाने पर है। अपनी विभिन्न परियोजनाओं के माध्यम से, हम एक ऐसे भविष्य का निर्माण करने का प्रयास करते हैं जहाँ हर व्यक्ति को आगे बढ़ने का अवसर मिले।`,
    missionTitle: "मिशन",
    visionTitle: "दृष्टिकोण",
    missionAndVisionText: `प्रत्येक बच्चे को एक आदर्श, आधुनिक और विकसित शिक्षा प्रदान करना, ताकि शिक्षा, सांस्कृतिक कला और खेल के माध्यम से उनका समग्र विकास सुनिश्चित हो सके और वे आत्मनिर्भर बन सकें। हम पर्यावरण संरक्षण और सद्भाव और भाईचारे के माहौल को बढ़ावा देने के लिए सकारात्मक मूल्यों को स्थापित करने के लिए समर्पित हैं।`
  }
};

const AboutUs = ({ languageType}) => {
  const selectedContent = content[languageType] || content.en;

  return (
    <div className="about-us-container">
      <div className="about-section">
        <h2>{selectedContent.aboutTitle}</h2>
        <p dangerouslySetInnerHTML={{ __html: selectedContent.aboutText }}></p>
      </div>

      <div className="stats-boxes">
        <div className="stat-box"></div>
        <div className="stat-box"></div>
        <div className="stat-box"></div>
        <div className="stat-box"></div>
      </div>

      <div className="mission-vision-section" style={{ backgroundImage: `url(${missionVisionBg})` }}>
        <div className="overlay">
          <div className="mission">
            <h3>{selectedContent.missionTitle}</h3>
            <p>{selectedContent.missionAndVisionText}</p>
          </div>
          <div className="vision">
            <h3>{selectedContent.visionTitle}</h3>
            <p>{selectedContent.missionAndVisionText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;
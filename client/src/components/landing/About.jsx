import missionVisionBg from './img.jpg'; // Ensure this path is correct

// Content for multi-language support
const content = {
  en: {
    aboutTitle: "About Hill Riders Manav Sewa Samiti",
    aboutText: `<strong>Hill Riders Manav Sewa Samiti</strong> is a registered non-profit organization (Reg. No. GOR/02834/2023-2024) dedicated to holistic community development. We are committed to uplifting society through multifaceted initiatives in education, environmental conservation, healthcare, and social welfare. Our focus is on empowering marginalized communities, fostering self-reliance among the youth, and creating a sustainable and harmonious society for all. Through our various projects, we strive to build a future where every individual has the opportunity to thrive.`,
    missionTitle: "MISSION",
    visionTitle: "VISION",
    missionText: `To provide every child with an ideal, modern, and developed education, ensuring their holistic development through academics, cultural arts, and sports to make them self-reliant. Dedicated to environmental protection and instilling positive values to foster an atmosphere of harmony and brotherhood.`,
    visionText: `Empowering communities through education and employment, fostering self-reliance and sustainable growth by providing opportunities for स्वरोजगार (self-employment), and creating a society where individuals thrive and contribute to the nation's progress.`,
    teamTitle: "Our Executive Team"
  },
  hi: {
    aboutTitle: "हिल राइडर्स मानव सेवा समिति के बारे में",
    aboutText: `<strong>हिल राइडर्स मानव सेवा समिति</strong> एक पंजीकृत गैर-लाभकारी संगठन (पंजीकरण संख्या GOR/02834/2023-2024) है जो समग्र सामुदायिक विकास के लिए समर्पित है। हम शिक्षा, पर्यावरण संरक्षण, स्वास्थ्य सेवा, और सामाजिक कल्याण में बहुमुखी पहलों के माध्यम से समाज के उत्थान के लिए प्रतिबद्ध हैं। हमारा ध्यान हाशिए पर मौजूद समुदायों को सशक्त बनाने, युवाओं में आत्मनिर्भरता को बढ़ावा देने, और सभी के लिए एक स्थायी और सामंजस्यपूर्ण समाज बनाने पर है। अपनी विभिन्न परियोजनाओं के माध्यम से, हम एक ऐसे भविष्य का निर्माण करने का प्रयास करते हैं जहाँ हर व्यक्ति को आगे बढ़ने का अवसर मिले।`,
    missionTitle: "मिशन",
    visionTitle: "दृष्टिकोण",
    missionText: `प्रत्येक बच्चे को एक आदर्श, आधुनिक और विकसित शिक्षा प्रदान करना, ताकि शिक्षा, सांस्कृतिक कला और खेल के माध्यम से उनका समग्र विकास सुनिश्चित हो सके और वे आत्मनिर्भर बन सकें। हम पर्यावरण संरक्षण और सद्भाव और भाईचारे के माहौल को बढ़ावा देने के लिए सकारात्मक मूल्यों को स्थापित करने के लिए समर्पित हैं।`,
    visionText:`शिक्षा और रोजगार के माध्यम से समुदायों को सशक्त बनाना, स्वरोजगार के अवसर प्रदान करके आत्मनिर्भरता और सतत विकास को बढ़ावा देना, और एक ऐसा समाज बनाना जहां व्यक्ति फलें-फूलें और राष्ट्र की प्रगति में योगदान करें।`,
    teamTitle: "हमारी कार्यकारी टीम"
  }
};

// Team member data
const teamMembers = [
  {
    name: "Mr. Shatrughna Rao",
    role: "President",
    imageUrl: "/s.webp"
  },
  {
    name: "Mr. Vinay Kumar Gupta",
    role: "Vice-President",
    imageUrl: "/vp.webp"
  },
  {
    name: "Dr. Rahul Singh",
    role: "Coordinator",
    imageUrl: "/cor.webp"
  },
  {
    name: "Mr. Avinash Kr Tripathi",
    role: "Chief Counsellor",
    imageUrl: "/cou.webp"
  }
];

const AboutUs = ({ languageType }) => {
  const selectedContent = content[languageType] || content.en;

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* About Section */}
      <section className="container mx-auto px-6 pt-12 md:pt-16">
        <div className="max-w-7xl mx-auto">
          
          <p
            className="text-lg text-gray-700 leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: selectedContent.aboutText }}
          ></p>
        </div>
      </section>

      {/* NEW TEAM SECTION using the 4-box layout */}
      <section className="container mx-auto px-6 py-12 md:py-16">
      
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image occupies 80% */}
              <div className="relative w-full h-0 pb-[80%] overflow-hidden bg-gray-200">
                <img
                  src={member.imageUrl || `https://picsum.photos/seed/${member.name.replace(/\s/g, '')}/400/300`}
                  alt={`Portrait of ${member.name}`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              {/* Name & Role occupies 20% */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 min-h-[6rem] flex flex-col items-center justify-center">
                <p className="text-md text-gray-900 font-bold text-center leading-tight">{member.name}</p>
                <p className="text-sm text-green-700 font-medium text-center">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        className="relative bg-cover bg-center bg-fixed text-white py-16 md:py-20"
        style={{ backgroundImage: `url(${missionVisionBg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-12">
            <div className="flex-1 max-w-xl text-justify flex flex-col">
              <p className="text-3xl font-bold text-white text-center border-b-2 border-white pb-2 mb-4 ">
                {selectedContent.missionTitle}
              </p>
              <p className="text-lg leading-relaxed">{selectedContent.missionText}</p>
            </div>
            <div className="flex-1 max-w-xl text-justify flex flex-col">
              <p className="text-3xl font-bold color-white text-center border-b-2 border-white pb-2 mb-4">
                {selectedContent.visionTitle}
              </p>
              <p className="text-lg leading-relaxed">{selectedContent.visionText}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
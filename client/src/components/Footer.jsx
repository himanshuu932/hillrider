import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import insta from "../assets/image.png";
import linkedin from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";

export default function Footer({ languageType }) {
  const content = {
    en: {
      nav: "Navigation",
      initiatives: "Our Initiatives",
      donate: "Donate",
      links: "Links",
      connect: "Connect",
      privacy: "Privacy Policy",
      terms: "Terms and Conditions",
      rights: "All Rights Reserved",
      made: "Made With Love By - XYZ",
      home: "HOME",
      about: "ABOUT US",
      mission: "MISSION",
      sectors: "OUR SECTORS",
      activities: "ACTIVITIES",
      donateUs: "DONATE US",
      programs: "OUR PROGRAMS",
      olympiad: "OLYMPIAD",
      volunteer: "VOLUNTEER",
      press: "PRESS RELEASE",
      clothes: "CLOTHES",
      books: "BOOKS",
      stationary: "STATIONARY",
      donateFunds: "DONATE FUNDS",
      education: "EDUCATION",
      upliftment: "UPLIFTMENT",
      social: "SOCIAL",
      environment: "ENVIRONMENT",
    },
    hi: {
      nav: "नेविगेशन",
      initiatives: "हमारी पहल",
      donate: "दान करें",
      links: "लिंक्स",
      connect: "जुड़ें",
      privacy: "गोपनीयता नीति",
      terms: "नियम और शर्तें",
      rights: "सर्वाधिकार सुरक्षित",
      made: "प्यार से बनाया गया - XYZ",
      home: "मुख्य पृष्ठ",
      about: "हमारे बारे में",
      mission: "मिशन",
      sectors: "हमारे क्षेत्र",
      activities: "गतिविधियाँ",
      donateUs: "दान दें",
      programs: "हमारे कार्यक्रम",
      olympiad: "ओलंपियाड",
      volunteer: "स्वयंसेवक",
      press: "प्रेस विज्ञप्ति",
      clothes: "कपड़े",
      books: "पुस्तकें",
      stationary: "स्टेशनरी",
      donateFunds: "धन दान करें",
      education: "शिक्षा",
      upliftment: "उत्थान",
      social: "सामाजिक",
      environment: "पर्यावरण",
    },
  };
  const t = content[languageType] || content.en;
  return (
    <footer className="bg-[#0A3153] text-white font-robotoSlab">
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col lg:flex-row lg:gap-20 gap-8">
        <div className="space-y-2 lg:mr-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <img src={logo} alt="Hill Riders Logo" className="w-16 h-16 sm:w-17 sm:h-17 mr-0 sm:mr-3 mb-2 sm:mb-0" />
            <div className="leading-tight">
              <h2 className="text-3xl sm:text-4xl font-bold">HILL RIDERS</h2>
              <p className="text-lg sm:text-2xl font-semibold">Manav Seva Samiti</p>
            </div>
          </div>

          <div className="py-3 space-y-3 text-sm sm:text-base">
            <p className="flex gap-2 ml-0 sm:ml-2">
              <FaMapMarkerAlt className="mt-1" /> Hill Riders Academy Sukarauli Hata Kushinagar
            </p>
            <p className="flex gap-2 ml-0 sm:ml-2">
              <FaPhoneAlt className="mt-1" /> +91 541351845121, +91 5656662595
            </p>
            <p className="flex gap-2 ml-0 sm:ml-2">
              <FaEnvelope className="mt-1"/> kjhfgd@gmail.com
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap sm:space-x-8 lg:space-x-16 gap-8 sm:gap-0">
          
          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.nav}</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li>{t.home}</li>
              <li>{t.about}</li>
              <li>{t.mission}</li>
              <li>{t.sectors}</li>
              <li>{t.activities}</li>
              <li>{t.donateUs}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.initiatives}</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li>{t.education}</li>
              <li>{t.social}</li>
              <li>{t.upliftment}</li>
              <li>{t.environment}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.donate}</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li>{t.clothes}</li>
              <li>{t.books}</li>
              <li>{t.stationary}</li>
              <li>{t.donateFunds}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.links}</h4>
            <p className="cursor-pointer text-sm">{t.privacy}</p>
            <p className="cursor-pointer text-sm">{t.terms}</p>
            <h4 className="font-bold mt-5 mb-2 text-lg sm:text-xl">{t.connect}</h4>
            <div className="flex gap-3 text-lg">
              <img src={insta} className="cursor-pointer w-7 h-7" />
              <img src={linkedin} className="cursor-pointer w-7 h-7" />
              <img src={youtube} className="cursor-pointer w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2 text-center sm:text-left">
        <p className="text-sm">
          © 2025 Hill Riders Manav Seva Samiti <br className="sm:hidden" /> {t.rights}
        </p>
      </div>

      <div className="bg-[#0A3153] py-4 text-center text-sm">
        {t.made}
      </div>
    </footer>
  );
}

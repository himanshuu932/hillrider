import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import insta from "../assets/image.png";
import linkedin from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
export default function Footer({ languageType }) {
  const content = {
    en: {
      logo: "HILL RIDERS",
      mnvss: "Manav Seva Samiti",
      add: "Hill Riders Academy Sukarauli Hata Kushinagar",
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
      social: "SOCIAL",
      environment: "ENVIRONMENT",
      upliftment: "UPLIFTMENT",
    },
    hi: {
      logo: "हिल राइडर्स",
      mnvss: "मानव सेवा समिति",
      add: "हिल राइडर्स अकैडमी सुकौरौली हाटा कुशीनगर",
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
      donateUs: "हमें दान दें",
      programs: "हमारे कार्यक्रम",
      olympiad: "ओलंपियाड",
      volunteer: "स्वयंसेवक",
      press: "प्रेस विज्ञप्ति",
      clothes: "कपड़े",
      books: "पुस्तकें",
      stationary: "स्टेशनरी",
      donateFunds: "धन दान करें",
      education: "शिक्षा",
      social: "सामाजिक",
      environment: "पर्यावरण",
      upliftment: "उत्थान",
    },
  };

  const t = content[languageType] || content.en;
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0A3153] text-white font-robotoSlab">
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col lg:flex-row lg:gap-20 gap-8">
        <div className="space-y-2 lg:mr-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <img
              src={logo}
              alt="Hill Riders Logo"
              className="w-16 h-16 sm:w-17 sm:h-17 mr-0 sm:mr-3 mb-2 sm:mb-0"
            />
            <div className="leading-tight">
              <h2 className="text-3xl sm:text-4xl font-bold">{t.logo}</h2>
              <p className="text-lg sm:text-2xl font-semibold">{t.mnvss}</p>
            </div>
          </div>

          <div className="py-3 space-y-3 text-sm sm:text-base">
            <p className="flex gap-2 ml-0 sm:ml-2">
              <FaMapMarkerAlt className="mt-1" />
              {t.add}
            </p>
            <p className="flex gap-2 ml-0 sm:ml-2">
              <FaPhoneAlt className="mt-1" /> +91 541351845121, +91 5656662595
            </p>
            <p className="flex gap-2 ml-0 sm:ml-2">
              <FaEnvelope className="mt-1" /> kjhfgd@gmail.com
            </p>
          </div>
        </div>

        {/* Main container for links: Grid on mobile, Flex on larger screens */}
        <div className="grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap lg:flex-nowrap sm:space-x-8 lg:space-x-16 sm:gap-0">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.nav}</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li><HashLink smooth to="/#hero">{t.home}</HashLink></li>
              <li><HashLink smooth to="/#about">{t.about}</HashLink></li>
              <li><HashLink smooth to="/#sectors">{t.sectors}</HashLink></li>
              <li><HashLink smooth to="/#activities">{t.activities}</HashLink></li>
              <li><HashLink smooth to="/#donate">{t.donateUs}</HashLink></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.initiatives}</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li><HashLink smooth to="/#education">{t.education}</HashLink></li>
              <li><HashLink smooth to="/#social">{t.social}</HashLink></li>
              <li><HashLink smooth to="/#upliftment">{t.upliftment}</HashLink></li>
              <li><HashLink smooth to="/#environment">{t.environment}</HashLink></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.donate}</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <Link to="/donate"><li>{t.clothes}</li></Link>
              <Link to="/donate"><li>{t.books}</li></Link>
              <Link to="/donate"><li>{t.stationary}</li></Link>
              <Link to="/donate"><li>{t.donateFunds}</li></Link>
            </ul>
          </div>

          {/* Column 4 (wrapper for Links & Connect) */}
          {/* Behaves as a single flex item on desktop, but its children become grid items on mobile */}
          <div className="contents sm:block">
            <div>
              <h4 className="font-bold mb-3 text-lg sm:text-xl">{t.links}</h4>
              <ul className="space-y-1 text-sm">
                <li><HashLink smooth to="/#home" className="cursor-pointer">{t.privacy}</HashLink></li>
                <li><HashLink smooth to="/#home" className="cursor-pointer">{t.terms}</HashLink></li>
              </ul>
            </div>
            <div className="mt-0 sm:mt-5">
              <h4 className="font-bold mb-2 text-lg sm:text-xl">{t.connect}</h4>
              <div className="flex gap-3 text-lg">
                <img src={insta} alt="Instagram" className="cursor-pointer w-7 h-7" />
                <img src={linkedin} alt="LinkedIn" className="cursor-pointer w-7 h-7" />
                <img src={youtube} alt="YouTube" className="cursor-pointer w-7 h-7" />
              </div>
            </div>
          </div>
          
          {/* Copyright for mobile grid view only */}
          <div className="text-sm sm:hidden">
            <p onClick={()=>navigate('/login')}>© 2025 Hill Riders Manav Seva Samiti</p>
            <p>{t.rights}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2 text-center sm:text-left hidden sm:block">
        <p onClick={()=>navigate('/login')} className="text-sm">
          © 2025 Hill Riders Manav Seva Samiti {" "} {t.rights}
        </p>
      </div>

      <div className="bg-[#0A3153] py-4 text-center text-sm">
          <a
              href="https://bludgers.vercel.app/"
              target="_blank" 
              rel="noopener noreferrer" 
              style={{color:"white"}}
            >
              {t.made}
              </a>
              </div>
    </footer>
  );
}
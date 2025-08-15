import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import insta from "../assets/image.png";
import linkedin from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";

export default function Footer() {
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
            <h4 className="font-bold mb-3 text-lg sm:text-xl">Navigation</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li>HOME</li>
              <li>OUR PROGRAMS</li>
              <li>OLYMPIAD</li>
              <li>DONATE</li>
              <li>VOLUNTEER</li>
              <li>PRESS RELEASE</li>
              <li>ABOUT US</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">Our Initiatives</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li>HOME</li>
              <li>OUR PROGRAMS</li>
              <li>OLYMPIAD</li>
              <li>DONATE</li>
              <li>VOLUNTEER</li>
              <li>PRESS RELEASE</li>
              <li>ABOUT US</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">Donate</h4>
            <ul className="space-y-1 text-sm cursor-pointer">
              <li>HOME</li>
              <li>OUR PROGRAMS</li>
              <li>OLYMPIAD</li>
              <li>DONATE</li>
              <li>VOLUNTEER</li>
              <li>PRESS RELEASE</li>
              <li>ABOUT US</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-lg sm:text-xl">LINKS</h4>
            <p className="cursor-pointer text-sm">Privacy Policy</p>
            <p className="cursor-pointer text-sm">Terms and Conditions</p>
            <h4 className="font-bold mt-5 mb-2 text-lg sm:text-xl">Connect</h4>
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
          © 2025 Hill Riders Manav Seva Samiti <br className="sm:hidden" /> All Rights Reserved
        </p>
      </div>

      <div className="bg-[#0A3153] py-4 text-center text-sm">
        Made With Love By-XYZ
      </div>
    </footer>
  );
}

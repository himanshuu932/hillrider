import heroImage1 from "../assets/heroImage1.png";
import heroImage2 from "../assets/heroImage2.png";
import { useState } from "react";

export default function DonationPage({languageType}) {
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      hero: "Together, We Can Make A Difference!!",
      message:
        "Every contribution helps us bring hope, resources and opportunities to those who need them most. Donate today and be the reason for someone's smile tomorrow ❤️",
      scan: "Scan to Donate",
      accountName: "Account Name",
      bank: "Bank",
      accNo: "Acc. No.",
      ifsc: "IFSC",
      branch: "Branch",
      copy: "Copy Account No.",
      copied: "✅ Copied!",
    },
    hi: {
      hero: "आइए मिलकर बदलाव लाएँ!!",
      message:
        "आपका हर योगदान हमें ज़रूरतमंदों तक आशा, साधन और अवसर पहुँचाने में मदद करता है। आज दान करें और किसी की मुस्कान का कारण बनें ❤️",
      scan: "दान करने के लिए स्कैन करें",
      accountName: "खाता नाम",
      bank: "बैंक",
      accNo: "खाता संख्या",
      ifsc: "आईएफएससी",
      branch: "शाखा",
      copy: "खाता संख्या कॉपी करें",
      copied: "✅ कॉपी हो गया!",
    },
  };

  const t = content[languageType] || content.en;
  const copyAccountNumber = () => {
    navigator.clipboard.writeText("123456789012");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="relative flex h-48 md:h-72 lg:h-80">
        <img src={heroImage1} alt="Donation Drive" className="w-1/2 object-cover" />
        <img src={heroImage2} alt="Donation Drive" className="w-1/2 object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-snug tracking-wide drop-shadow-lg">
            {t.hero}
          </h1>
        </div>
      </div>
      <div className="px-6 py-5 max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-2xl mx-auto">
          {t.message}
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-5 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          {t.scan}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex flex-col items-center">
            <img
              src="/images/qrcode.png"
              alt="QR Code for Donation"
              className="w-52 h-52 rounded-lg shadow-md border border-gray-200"
            />
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm text-left w-full md:w-1/2">
            <p>
              <strong>{t.accountName}:</strong> Your NGO Name
            </p>
            <p>
              <strong>{t.bank}:</strong> State Bank of India
            </p>
            <p>
              <strong>{t.accNo}:</strong> 123456789012
            </p>
            <p>
              <strong>{t.ifsc}:</strong> SBIN0001234
            </p>
            <p>
              <strong>{t.branch}:</strong> City Branch, Lucknow
            </p>

            <button
              onClick={copyAccountNumber}
              className="mt-6 bg-[#0A3153] text-white px-6 py-2 rounded-lg shadow hover:bg-[#092640] transition">
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


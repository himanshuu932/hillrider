import React from 'react';
import hillrider from '../../assets/education.webp';
import hillrider2 from '../../assets/social.webp';
import hillrider3 from '../../assets/upliftment.webp';
import hillrider4 from '../../assets/environment.webp';

const sectorsData = [
  {
    id: "education",
    content: {
      en: {
        title: 'EDUCATION',
        description: 'We work to advance education by establishing and managing schools, colleges, and libraries. We are dedicated to enhancing the quality of Education through various projects and programmes:',
        points: [
          'Competitive Exams Preparation / Organising Hill Riders Olympiad',
          'Seminars and Career Counselling',
          'Teacher training and Effective Teaching Style training',
          'Social and Cultural activities among students',
          'Hill Riders Sports/Games organised for schools'
        ]
      },
      hi: {
        title: 'शिक्षा',
        description: 'हम स्कूलों, कॉलेजों और पुस्तकालयों की स्थापना और प्रबंधन करके शिक्षा को आगे बढ़ाने के लिए काम करते हैं। हम विभिन्न परियोजनाओं और कार्यक्रमों के माध्यम से शिक्षा की गुणवत्ता बढ़ाने के लिए समर्पित हैं:',
        points: [
          'प्रतियोगी परीक्षाओं की तैयारी / हिल राइडर्स ओलंपियाड का आयोजन',
          'सेमिनार और करियर परामर्श',
          'शिक्षक प्रशिक्षण और प्रभावी शिक्षण शैली प्रशिक्षण',
          'छात्रों के बीच सामाजिक और सांस्कृतिक गतिविधियाँ',
          'स्कूलों के लिए हिल राइडर्स खेल/कूद का आयोजन'
        ]
      }
    },
    images: [{ src: hillrider, alt: 'Students in a classroom' }],
  },
  {
    id: "social",
    content: {
      en: {
        title: 'SOCIAL',
        description: 'Fostering social harmony by working to end outdated customs, empowering women, and running homes for the underprivileged. Our social programs include:',
        points: [
          'Sharing spiritual knowledge among people',
          'Keeping our Indian cultures established among society',
          'Health awareness programmes',
          'Supporting social harmony programmes'
        ]
      },
      hi: {
        title: 'सामाजिक',
        description: 'पुरानी कुरीतियों को समाप्त करने, महिलाओं को सशक्त बनाने और वंचितों के लिए आश्रम चलाकर सामाजिक समरसता को बढ़ावा देना। हमारे सामाजिक कार्यक्रमों में शामिल हैं:',
        points: [
          'लोगों के बीच आध्यात्मिक ज्ञान साझा करना',
          'समाज में हमारी भारतीय संस्कृतियों को स्थापित रखना',
          'स्वास्थ्य जागरूकता कार्यक्रम',
          'सामाजिक सद्भाव कार्यक्रमों का समर्थन करना'
        ]
      }
    },
    images: [{ src: hillrider2, alt: 'Community gathering for social work' }],
  },
  {
    id: "upliftment",
    content: {
      en: {
        title: 'UPLIFTMENT',
        description: 'Dedicated to the social and economic upliftment of backward communities through free vocational and technical training. We also focus on:',
        points: [
          'Supporting the poor and helping needy people',
          'Providing food, clothes, and shelter for homeless and helpless people',
          'Seeking justice for the victims ignored in society',
          'Providing employment and promoting entrepreneurs through Hill Riders Kutir/Laghu Udyog programmes'
        ]
      },
      hi: {
        title: 'उत्थान',
        description: 'मुफ्त व्यावसायिक और तकनीकी प्रशिक्षण के माध्यम से पिछड़े समुदायों के सामाजिक और आर्थिक उत्थान के लिए समर्पित। हम इस पर भी ध्यान केंद्रित करते हैं:',
        points: [
          'गरीबों का समर्थन करना और जरूरतमंद लोगों की मदद करना',
          'बेघर और असहाय लोगों के लिए भोजन, वस्त्र और आश्रय प्रदान करना',
          'समाज में उपेक्षित पीड़ितों के लिए न्याय की मांग करना',
          'हिल राइडर्स कुटीर/लघु उद्योग कार्यक्रमों के माध्यम से रोजगार प्रदान करना और उद्यमियों को बढ़ावा देना'
        ]
      }
    },
    images: [{ src: hillrider3, alt: 'Vocational skill development session' }],
  },
  {
    id: "environment",
    content: {
      en: {
        title: 'ENVIRONMENT',
        description: 'Promoting environmental protection through tree plantation, water conservation, and awareness for sustainable agriculture. Our key initiatives include:',
        points: [
          'Plantation drives',
          'Save Tree, Save Earth campaigns',
          'Pollution control practices',
          'Water conservation projects',
          'Promotion for utilization of renewable sources of energy'
        ]
      },
      hi: {
        title: 'पर्यावरण',
        description: 'वृक्षारोपण, जल संरक्षण और टिकाऊ कृषि के लिए जागरूकता के माध्यम से पर्यावरण संरक्षण को बढ़ावा देना। हमारी मुख्य पहलों में शामिल हैं:',
        points: [
          'वृक्षारोपण अभियान',
          'पेड़ बचाओ, पृथ्वी बचाओ अभियान',
          'प्रदूषण नियंत्रण प्रथाएं',
          'जल संरक्षण परियोजनाएं',
          'नवीकरणीय ऊर्जा स्रोतों के उपयोग को बढ़ावा देना'
        ]
      }
    },
    images: [{ src: hillrider4, alt: 'Environmental conservation effort' }],
  }
];

const Sectors = ({ languageType = 'en' }) => {
  return (
    <div className="bg-white sm:py-12" id="sectors">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#003366] sm:text-4xl">
            OUR SECTORS
          </h2>
        </div>

        <div className="mt-16 space-y-16">
          {sectorsData.map((sector, index) => (
            <div
              key={sector.id}
              className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Image Column */}
              <div className="w-full md:w-1/2">
                <img
                  src={sector.images[0].src}
                  alt={sector.images[0].alt}
                  className="w-full h-80 rounded-xl shadow-lg object-cover"
                />
              </div>

              {/* Text Content Column */}
              <div className="w-full md:w-1/2">
                <p className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-left">
                  {sector.content[languageType].title}
                </p>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  {sector.content[languageType].description}
                </p>
                <ul className="mt-6 space-y-2 list-disc list-inside text-gray-700">
                  {sector.content[languageType].points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sectors;
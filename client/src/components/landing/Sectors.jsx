import React from 'react';
import './styles/Sector.css';
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
        description: 'We work to advance education by establishing and managing schools, colleges, and libraries for all. We also run coaching centers for competitive exams.'
      },
      hi: {
        title: 'शिक्षा',
        description: 'हम सभी के लिए स्कूलों, कॉलेजों और पुस्तकालयों की स्थापना और प्रबंधन करके शिक्षा को आगे बढ़ाने के लिए काम करते हैं। हम प्रतियोगी परीक्षाओं के लिए कोचिंग सेंटर भी चलाते हैं।'
      }
    },
    images: [{ src: hillrider, alt: 'Students in a classroom' }],
  },
  {
    id: "social",
    content: {
      en: {
        title: 'SOCIAL',
        description: 'Fostering social harmony by working to end outdated customs, empowering women, and running homes for the underprivileged.'
      },
      hi: {
        title: 'सामाजिक',
        description: 'पुरानी कुरीतियों को समाप्त करने, महिलाओं को सशक्त बनाने और वंचितों के लिए आश्रम चलाकर सामाजिक समरसता को बढ़ावा देना।'
      }
    },
    images: [{ src: hillrider2, alt: 'Community gathering for social work' }],
  },
  {
    id: "upliftment",
    content: {
      en: {
        title: 'UPLIFTMENT',
        description: 'Dedicated to the social and economic upliftment of backward communities through free vocational and technical training to ensure employment.'
      },
      hi: {
        title: 'उत्थान',
        description: 'रोजगार सुनिश्चित करने के लिए मुफ्त व्यावसायिक और तकनीकी प्रशिक्षण के माध्यम से पिछड़े समुदायों के सामाजिक और आर्थिक उत्थान के लिए समर्पित।'
      }
    },
    images: [{ src: hillrider3, alt: 'Vocational skill development session' }],
  },
  {
    id: "environment",
    content: {
      en: {
        title: 'ENVIRONMENT',
        description: 'Promoting environmental protection through tree plantation, water conservation, and awareness for sustainable agriculture.'
      },
      hi: {
        title: 'पर्यावरण',
        description: 'वृक्षारोपण, जल संरक्षण और टिकाऊ कृषि के लिए जागरूकता के माध्यम से पर्यावरण संरक्षण को बढ़ावा देना।'
      }
    },
    images: [{ src: hillrider4, alt: 'Environmental conservation effort' }],
  }
];

const Sectors = ({ languageType = 'en' }) => {
  return (
    <div className="sectors-page-container" id="sectors">
      <h2 className="main-title">OUR SECTORS</h2>
      <div className="sectors-grid">
        {sectorsData.map((sector, index) => (
          <div className="sector-card" key={index} id={sector.id}>
            <img src={sector.images[0].src} alt={sector.images[0].alt} className="sector-card-image" />
            <div className="sector-card-content">
              <h3 className="sector-card-title">{sector.content[languageType].title}</h3>
              <p className="sector-card-description">{sector.content[languageType].description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectors;
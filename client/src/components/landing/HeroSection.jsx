import React, { useState, useEffect, useRef } from 'react';
import './styles/HeroSection.css';
import sevabharti from '../../assets/headImage.webp';
import sevabharti2 from '../../assets/headImage2.webp';
import sevabharti3 from '../../assets/headImage3.webp';
import sevabharti4 from '../../assets/headImage4.webp';
import sevabharti5 from '../../assets/headImage5.webp';
import sevabharti6 from '../../assets/headImage6.webp';

const slides = [
  {
    en: {
      title: "Sewa Bharati Goraksh",
      subtitle: "Serving with dedication, compassion, and trust",
      paragraphs: [
        "Rashtriya Swayamsevak Sangh is working towards bringing the nation to the pinnacle of glory by uniting the entire Hindu society.",
        {
          quote: "Service to humanity is service to divinity",
          regular: "With this vision, the Sangh has created Seva Vibhag and Seva Bharti to bring people closer through service."
        },
        "Sewa Bharti is a service organization run by volunteers, working exclusively in Sewa Bastis where the deprived and neglected communities live."
      ],
      cta: "Join Our Mission",
      image: sevabharti,
    },
    hi: {
      title: "सेवा भारती गोरक्ष",
      subtitle: "समर्पण, करुणा और विश्वास के साथ सेवा",
      paragraphs: [
        "राष्ट्रीय स्वयंसेवक संघ संपूर्ण हिंदू समाज को एकजुट करके राष्ट्र को गौरव के शिखर पर पहुंचाने की दिशा में कार्य कर रहा है।",
        {
          quote: "मानवता की सेवा ही दिव्यता की सेवा है",
          regular: "इसी दृष्टि से संघ ने सेवा विभाग और सेवा भारती का निर्माण किया है जो सेवा के माध्यम से लोगों को करीब लाने का कार्य करते हैं।"
        },
        "सेवा भारती स्वयंसेवकों द्वारा संचालित एक सेवा संगठन है जो विशेष रूप से सेवा बस्तियों में कार्य करती है जहां वंचित और उपेक्षित समुदाय रहते हैं।"
      ],
      cta: "हमारे मिशन से जुड़ें",
      image: sevabharti,
    }
  },
  {
    en: {
      title: "Sewa Bharati Goraksh",
      subtitle: "Providing immediate assistance to those in need",
      paragraphs: [
        "In the disaster caused by cloudburst in Himachal Pradesh, Seva Bharati is providing immediate relief to victims rendered homeless.",
        {
          quote: "The best way to find yourself is to lose yourself in the service of others",
          regular: "Our volunteers are delivering food, blankets, and medical assistance to affected families."
        },
        "Through relief and rescue operations, RSS and Seva Bharati volunteers are working tirelessly in affected areas."
      ],
      cta: "Donate Now",
      image: sevabharti3,
    },
    hi: {
      title: "सेवा भारती गोरक्ष",
      subtitle: "जरूरतमंदों को तत्काल सहायता प्रदान करना",
      paragraphs: [
        "हिमाचल प्रदेश में बादल फटने से हुई आपदा में, सेवा भारती बेघर हुए पीड़ितों को तत्काल राहत प्रदान कर रही है।",
        {
          quote: "खुद को खोजने का सबसे अच्छा तरीका है दूसरों की सेवा में खुद को खो देना",
          regular: "हमारे स्वयंसेवक प्रभावित परिवारों को भोजन, कंबल और चिकित्सा सहायता प्रदान कर रहे हैं।"
        },
        "राहत और बचाव अभियानों के माध्यम से, आरएसएस और सेवा भारती के स्वयंसेवक प्रभावित क्षेत्रों में अथक परिश्रम कर रहे हैं।"
      ],
      cta: "अभी दान करें",
      image: sevabharti3,
    }
  },
  {
    en: {
      title: "Sewa Bharati Goraksh",
      subtitle: "Empowering the underprivileged sections of society",
      paragraphs: [
        "Sewa Bharati is committed to holistic development through education, healthcare, and skill development programs.",
        {
          quote: "The hands that serve are holier than the lips that pray",
          regular: "Our volunteers work in rural and urban slums to provide quality education and healthcare facilities."
        },
        "Join us in creating a self-reliant society where every individual has equal opportunities to grow."
      ],
      cta: "Volunteer With Us",
      image: sevabharti2,
    },
    hi: {
      title: "सेवा भारती गोरक्ष",
      subtitle: "समाज के वंचित वर्गों को सशक्त बनाना",
      paragraphs: [
        "सेवा भारती शिक्षा, स्वास्थ्य और कौशल विकास कार्यक्रमों के माध्यम से समग्र विकास के लिए प्रतिबद्ध है।",
        {
          quote: "सेवा करने वाले हाथ प्रार्थना करने वाले होंठों से अधिक पवित्र होते हैं",
          regular: "हमारे स्वयंसेवक ग्रामीण और शहरी झुग्गी बस्तियों में गुणवत्तापूर्ण शिक्षा और स्वास्थ्य सुविधाएं प्रदान करने का कार्य करते हैं।"
        },
        "हमारे साथ जुड़कर एक आत्मनिर्भर समाज के निर्माण में सहयोग करें जहां हर व्यक्ति के पास विकास के समान अवसर हों।"
      ],
      cta: "हमारे साथ स्वयंसेवक बनें",
      image: sevabharti2,
    }
  },
  {
    en: {
      title: "Sewa Bharati Goraksh",
      subtitle: "Serving with dedication, compassion, and trust",
      paragraphs: [
        "Rashtriya Swayamsevak Sangh is working towards bringing the nation to the pinnacle of glory by uniting the entire Hindu society.",
        {
          quote: "Service to humanity is service to divinity",
          regular: "With this vision, the Sangh has created Seva Vibhag and Seva Bharti to bring people closer through service."
        },
        "Sewa Bharti is a service organization run by volunteers, working exclusively in Sewa Bastis where the deprived and neglected communities live."
      ],
      cta: "Join Our Mission",
      image: sevabharti4,
    },
    hi: {
      title: "सेवा भारती गोरक्ष",
      subtitle: "समर्पण, करुणा और विश्वास के साथ सेवा",
      paragraphs: [
        "राष्ट्रीय स्वयंसेवक संघ संपूर्ण हिंदू समाज को एकजुट करके राष्ट्र को गौरव के शिखर पर पहुंचाने की दिशा में कार्य कर रहा है।",
        {
          quote: "मानवता की सेवा ही दिव्यता की सेवा है",
          regular: "इसी दृष्टि से संघ ने सेवा विभाग और सेवा भारती का निर्माण किया है जो सेवा के माध्यम से लोगों को करीब लाने का कार्य करते हैं।"
        },
        "सेवा भारती स्वयंसेवकों द्वारा संचालित एक सेवा संगठन है जो विशेष रूप से सेवा बस्तियों में कार्य करती है जहां वंचित और उपेक्षित समुदाय रहते हैं।"
      ],
      cta: "हमारे मिशन से जुड़ें",
      image: sevabharti4,
    }
  },
  {
    en: {
      title: "Sewa Bharati Goraksh",
      subtitle: "Empowering the underprivileged sections of society",
      paragraphs: [
        "Sewa Bharati is committed to holistic development through education, healthcare, and skill development programs.",
        {
          quote: "The hands that serve are holier than the lips that pray",
          regular: "Our volunteers work in rural and urban slums to provide quality education and healthcare facilities."
        },
        "Join us in creating a self-reliant society where every individual has equal opportunities to grow."
      ],
      cta: "Volunteer With Us",
      image: sevabharti5,
    },
    hi: {
      title: "सेवा भारती गोरक्ष",
      subtitle: "समाज के वंचित वर्गों को सशक्त बनाना",
      paragraphs: [
        "सेवा भारती शिक्षा, स्वास्थ्य और कौशल विकास कार्यक्रमों के माध्यम से समग्र विकास के लिए प्रतिबद्ध है।",
        {
          quote: "सेवा करने वाले हाथ प्रार्थना करने वाले होंठों से अधिक पवित्र होते हैं",
          regular: "हमारे स्वयंसेवक ग्रामीण और शहरी झुग्गी बस्तियों में गुणवत्तापूर्ण शिक्षा और स्वास्थ्य सुविधाएं प्रदान करने का कार्य करते हैं।"
        },
        "हमारे साथ जुड़कर एक आत्मनिर्भर समाज के निर्माण में सहयोग करें जहां हर व्यक्ति के पास विकास के समान अवसर हों।"
      ],
      cta: "हमारे साथ स्वयंसेवक बनें",
      image: sevabharti5,
    }
  },
  {
    en: {
      title: "Sewa Bharati Goraksh",
      subtitle: "Providing immediate assistance to those in need",
      paragraphs: [
        "In the disaster caused by cloudburst in Himachal Pradesh, Seva Bharati is providing immediate relief to victims rendered homeless.",
        {
          quote: "The best way to find yourself is to lose yourself in the service of others",
          regular: "Our volunteers are delivering food, blankets, and medical assistance to affected families."
        },
        "Through relief and rescue operations, RSS and Seva Bharati volunteers are working tirelessly in affected areas."
      ],
      cta: "Donate Now",
      image: sevabharti6,
    },
    hi: {
      title: "सेवा भारती गोरक्ष",
      subtitle: "जरूरतमंदों को तत्काल सहायता प्रदान करना",
      paragraphs: [
        "हिमाचल प्रदेश में बादल फटने से हुई आपदा में, सेवा भारती बेघर हुए पीड़ितों को तत्काल राहत प्रदान कर रही है।",
        {
          quote: "खुद को खोजने का सबसे अच्छा तरीका है दूसरों की सेवा में खुद को खो देना",
          regular: "हमारे स्वयंसेवक प्रभावित परिवारों को भोजन, कंबल और चिकित्सा सहायता प्रदान कर रहे हैं।"
        },
        "राहत और बचाव अभियानों के माध्यम से, आरएसएस और सेवा भारती के स्वयंसेवक प्रभावित क्षेत्रों में अथक परिश्रम कर रहे हैं।"
      ],
      cta: "अभी दान करें",
      image: sevabharti6,
    }
  },
];

const HeroSection = ({ languageType }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const slideTimeoutRef = useRef(null);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    resetAutoSlide();
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    resetAutoSlide();
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    clearTimeout(slideTimeoutRef.current);
    slideTimeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        goToNextSlide();
      }
    }, 8000);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;
    if (Math.abs(diff)) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!startX) return;
    const currentX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - currentX;
    
    if (diff > 50) {
      goToNextSlide();
    } else if (diff < -50) {
      goToPrevSlide();
    }
    
    setStartX(null);
    setIsDragging(false);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => clearTimeout(slideTimeoutRef.current);
  }, [currentSlide, isDragging]);

  const currentContent = languageType === 'hi' ? slides[currentSlide].hi : slides[currentSlide].en;

  const firstQuoteObj = currentContent.paragraphs.find(
    (para) => typeof para === 'object' && para.quote
  );

  return (
    <section 
      className="hs-hero-slider"
      ref={sliderRef}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="hs-image-content"
        style={{ backgroundImage: `url(${currentContent.image})` }}
      />
      
      <div className="hs-text-content">
       
        <div className="hs-slider-nav">
          <button className="hs-slider-prev" onClick={goToPrevSlide} aria-label="Previous slide">
            &lt;
          </button>
          <div className="hs-slider-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hs-indicator-dot ${index === currentSlide ? 'hs-active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button className="hs-slider-next" onClick={goToNextSlide} aria-label="Next slide">
            &gt;
          </button>
        </div>
    
      </div>
    </section>
  );
};

export default HeroSection;

import HeroSection from './landing/HeroSection';
import Sectors from './landing/Sectors';
import AboutUs from './landing/About';
import Activities from './landing/Activities';
import Donate from './landing/Donate';





const LandingPage = () => {


  return (
    <div className="landing-page">
      <HeroSection />
      <AboutUs/>
      <Sectors/>
      <Activities/>
      <Donate/>
    </div>
  );
};

export default LandingPage;

import HeroSection from './landing/HeroSection';
import Sectors from './landing/Sectors';
import AboutUs from './landing/About';
import Activities from './landing/Activities';
import Donate from './landing/Donate';





const LandingPage = ({languageType}) => {


  return (
    <div className="landing-page">
      <HeroSection languageType={languageType}/>
      <AboutUs languageType={languageType}/>
      <Sectors languageType={languageType}/>
      <Activities languageType={languageType}/>
      <Donate languageType={languageType}/>
    </div>
  );
};

export default LandingPage;
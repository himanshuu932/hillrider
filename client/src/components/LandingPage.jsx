import HeroSection from './landing/HeroSection';
import Sectors from './landing/Sectors';
import AboutUs from './landing/About';
import Activities from './landing/Activities';
import Donate from './landing/Donate';

const LandingPage = ({languageType}) => {
  return (
    <div className="landing-page">
      <section id="home">
        <HeroSection languageType={languageType}/>
      </section>

      <section id="about">
        <AboutUs languageType={languageType}/>
      </section>

      <section id="sectors">
        <Sectors languageType={languageType}/>
      </section>

      <section id="activities">
        <Activities languageType={languageType}/>
      </section>

      <section id="donate">
        <Donate languageType={languageType}/>
      </section>
    </div>
  );
};

export default LandingPage;
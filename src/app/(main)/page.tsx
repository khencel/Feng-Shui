import About from "./About";
import FiveElementSection from "@/../components/landing/FiveElementSection";
import styles from "./About.module.css";
import DiscoverySection from "@/../components/landing/DiscoverySection";

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-content">
            <h6 style={{color:"#f0d071"}}>THE HEART OF HARMONY</h6>
            <h1>Align Your Space.</h1>
            <h1>Attract Your <span style={{color:"#f0d071"}}>Fortune.</span> </h1>
            <p>
              Feng Shui is the ancient Chinese art of arranging your environment to create balance, harmony, and prosperity. Our expert consultants will help you optimize your space to attract positive energy and abundance.
            </p>

            <a href="#consultation" className="feng-consultation-btn">
              Let's Connect
            </a>
          </div>
        </div>
      </section>

      <section className="home-section" style={{backgroundColor:"linen"}}>
        <div className="container">
          <About />
        </div>
      </section>

      <section className="home-section position-relative" style={{background:"linear-gradient(90deg, #071C0E, #0e381c, #071C0E"}}>

        <div className={styles.bambooLeft} style={{position:"absolute", top:0, left:0, width:"20%", height:"100%"}}>
          
        </div>
        <div className={styles.bambooRight} style={{position:"absolute", top:0, right:0, width:"17%", height:"100%"}}>
          
        </div>

        <div className="container">
          <FiveElementSection />
        </div>
      </section>

      <section className="">
        
        <DiscoverySection />
        
      </section>


    </main>
  );
}
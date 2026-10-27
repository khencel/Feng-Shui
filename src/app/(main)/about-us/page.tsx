import styles from "./page.module.css"

export default function AboutUs(){
    return (
        <>
            <main>
                <section className="home-hero">
                    <div className="container">
                    <div className="home-hero-content" style={{maxWidth:"700px"}}>
                        <h6 style={{color:"#f0d071"}}>OUR PHILOSOPHY</h6>
                        <h1>A More meaningful Way</h1>
                        <h1>to Live, Lead <span style={{color:"#f0d071"}}>& Prosper.</span> </h1>
                        <p>
                            By applying the wisdom of Chinese metaphysics and strategic thinking. we help you make better decisions in your personal life, business and future.
                        </p>

                        <a href="#consultation" className="feng-consultation-btn">
                            EXPLORE OUR APPROACH
                        </a>
                    </div>
                    </div>
                </section>
                <section>
                    <div className={styles.secondSection}>
                        <div className="row justify-content-center m-0 mt-3">
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                <div className={styles.headerLine}>

                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center m-0">
                            <div className="col-md-4 text-center pt-2">
                                <span className={styles.headerText}>ABOUT PERIOD 9 STRATEGIC MANAGEMENT</span>
                            </div>
                        </div>

                        <div className="row justify-content-center m-0">
                            <div className="col-md-8 text-center pt-2">
                                <span className={styles.headerSubTitle}>Ancient Wisdom. Strategic Thinking.<br/> Better Decisions.</span>
                            </div>
                        </div>
                        <div className="row justify-content-center m-0">
                            <div className="col-md-5">
                                <p className={`${styles.aboutUsText} mt-5`}>
                                    Period 9 Strategic Management is a consulting firm that focuses on business strategies, legal or lawsuit strategies, personal development, investments, property selection guide, date selection for major decision making, and making the most out of life using Chinese Metaphysics tools like Feng Shui, BaZi (8 Characters), Qi Men Dun Jia, Yi Jing and Date Selection. The Company believes that if anything or something of great importance is done timely, then the result is the amazingly awesome!
                                </p>
                            </div>
                            <div className="col-md-5">
                                <img className="mt-5" src="/Zen Feng Shui Study with Bonsai.png" style={{width:"95%"}} alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
import style from "./About.module.css";

export default function About() {
  return (
    <main>
        <section>
            <div className="row">
                <div className="col-md-3">
                    <div className="d-flex">
                        <div>
                            <img src="/img/about1.png" style={{width:"75px"}} alt="" />
                        </div>
                        <div className={style.aboutIconText}>
                            <div className={style.aboutIconTextHeader}>
                                HOME FENG SHUI
                            </div>
                            <div className={style.aboutIconTextBody}>
                                Create harmony and positive energy in your home.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="d-flex">
                        <div>
                            <img src="/img/about2.png" style={{width:"75px"}} alt="" />
                        </div>
                        <div className={style.aboutIconText}>
                            <div className={style.aboutIconTextHeader}>
                                BUSINESS FENG SHUI
                            </div>
                            <div className={style.aboutIconTextBody}>
                                Attract success, growth, and prosperity.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="d-flex">
                        <div>
                            <img src="/img/about3.png" style={{width:"75px"}} alt="" />
                        </div>
                        <div className={style.aboutIconText}>
                            <div className={style.aboutIconTextHeader}>
                                BAZI & DESTINY
                            </div>
                            <div className={style.aboutIconTextBody}>
                                Understand your unique energy and life path.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="d-flex">
                        <div>
                            <img src="/img/about4.png" style={{width:"75px"}} alt="" />
                        </div>
                        <div className={style.aboutIconText}>
                            <div className={style.aboutIconTextHeader}>
                                RELATIONSHIP
                            </div>
                            <div className={style.aboutIconTextBody}>
                                Improve compatibility and strengthen connections.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-5">
                    <img src="/img/Zen Bonsai and Enso Still Life.png" style={{width:"100%"}} alt="" />
                </div>
                <div className="col-md-7">
                    <div className={style.aboutIconTextHeader}>
                        ABOUT FENG SHUI
                    </div>
                    <div className={style.aboutIconTextHeader} style={{fontSize:"1.5rem", marginTop:"1rem"}}>
                        Ancient Wisdom. Modern Living.
                    </div>
                    <div className={style.aboutIconTextBody} style={{marginTop:"1rem"}}>
                        Feng Shui is more than arranging furniture or placing lucky charms. It is about understanding the flow of energy in your environment and how it affects your life. By applying the principles of Feng Shui, you can create a space that supports your goals, enhances your well-being, and attracts positive opportunities.
                    </div>
                    <div className="row mt-4">   
                        <div className="col-md-4">
                            <div className="d-flex">
                                <div>
                                    <img src="/img/harmony.png" style={{width:"40px"}} alt="" />
                                </div>
                                <div className={style.aboutIconText}>
                                    <div className={style.aboutIconTextHeader}>
                                        <span style={{color:"#D9BB80"}}>HARMONY</span>
                                    </div>
                                    <div className={style.aboutIconTextBody}>
                                        Bring balance to your mind, body, and environment.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex">
                                <div>
                                    <img src="/img/prosperity.png" style={{width:"50px"}} alt="" />
                                </div>
                                <div className={style.aboutIconText}>
                                    <div className={style.aboutIconTextHeader}>
                                        <span style={{color:"#D9BB80"}}>PROSPERITY</span>
                                    </div>
                                    <div className={style.aboutIconTextBody}>
                                        Attract abundance in all areas of your life.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex">
                                <div>
                                    <img src="/img/well-being.png" style={{width:"60px"}} alt="" />
                                </div>
                                <div className={style.aboutIconText}>
                                    <div className={style.aboutIconTextHeader}>
                                        <span style={{color:"#D9BB80"}}>WELL-BEING</span>
                                    </div>
                                    <div className={style.aboutIconTextBody}>
                                        Enhance health, happiness, and overall quality of life.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
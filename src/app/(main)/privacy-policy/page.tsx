import styles from "./page.module.css"
import { 
            FaRegUserCircle, 
            FaBirthdayCake,
            FaRegClock,
            FaSearchLocation,
            FaRegEnvelope,
            FaPhoneAlt,
            FaMailBulk 
} from "react-icons/fa";

export default function AboutUs(){
    return (
        <>
            <main>
                <section className={styles.homeHero}>
                    <div className="container">
                    <div className={styles.homeHeroContent} style={{maxWidth:"700px"}}>
                        <h6 style={{color:"#f0d071"}}>DATA PRIVACY NOTICE</h6>
                        <h1>Your Privacy</h1>
                        <h1><span style={{color:"#f0d071"}}>Matters</span> to Us</h1>
                        <p>
                            We are committed to protecting your personal information and ensuring your trust. This Data Privacy Notice explains how we collect, use, store, and protect your data.
                        </p>

                       
                    </div>
                    </div>
                </section>
                <section>
                    <div className={styles.secondSection}>
                        <div className="row justify-content-center m-0 mt-5">
                            <div className="col-md-5">
                                <p className={styles.textTitle}>1. About This Privacy Notice</p>
                                <div className={styles.textBody}>
                                    <p >
                                        Period 9 Strategic Management Services shall protect and keep confidential the personal data that you submit or that Period 9 Strategic Management Services collects from you, as required by the Data Privacy Act of 2012 as amended.
                                    </p>
                                    <p>
                                        This Privacy Notice describes how Period 9 Strategic Management Services comply with the existing Data Privacy Law of the Philippines known as R.A. 10173 or DPA (Data Privacy Act of 2012). We value the trust you have placed in us and respect your privacy. Please read this Data Privacy Notice to understand how we use the personal information we may collect from you, why we collect it, and how we use it. By providing your Personal Information to us, you are consenting to this Data Privacy Notice and the collection, use, access, transfer, storage and processing of your personal information as described in this Data Privacy Notice.
                                    </p>
                                </div>
                                
                            </div>
                            <div className="col-md-5 ">
                                <div className={styles.poemStyle}>
                                    <div className={styles.poemText}>
                                        <p>
                                            <i>
                                                "Your personal information
                                                <br />
                                                is valuable. we handle it
                                                <br />
                                                with care, integrity, and 
                                                <br />
                                                utmost confidentiality"
                                            </i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center m-0 mt-5">
                            <div className="col-md-5">
                                <p className={styles.textTitle}>2. What does it mean for you to give consent?</p>
                                <div className={styles.textBody}>
                                    <p >
                                        By providing your Personal Information to us and/or continuing access to our website, software, apps and/or any other products and services (collectively referred to as “Services”) offered by the Company (“Period 9 Strategic Management Services”), you are consenting to this Data Privacy Notice and the collection, use, access, transfer, storage and processing of your personal information as described in this Data Privacy Notice. If you do not agree to this Notice or any amendments to this Notice, please do not subscribe to any of our Services and stop using or accessing our website.
                                    </p>
                                </div>
                                
                            </div>
                            <div className="col-md-5 ">
                                <p className={styles.textTitle}>3. Personal Information We Collect</p>
                                <div className={styles.textBody}>
                                    <p >
                                        We collect the following personal information when you sign up for our services or when you interact with us.
                                    </p>
                                    <div className="row">
                                        <div className="col">
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaRegUserCircle style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Full Name
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaBirthdayCake style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Date of birth
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaRegClock style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Time of birth
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaSearchLocation  style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Country currently located
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaRegEnvelope style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Email address
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="col">
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaPhoneAlt style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Telephone number
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaMailBulk style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Mailing Address
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaRegUserCircle style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Previous/ current address
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <div style={{width:"20%"}}>
                                                    <FaRegEnvelope style={{width:"25px", height:"25px", color:"#C5A566"}} />
                                                </div>
                                                <div style={{width:"80%"}}>
                                                    Personal information related to your inquiries, transactions or services
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center m-0 mt-5">
                            <div className="col-md-5">
                                <p className={styles.textTitle}>4. Legal basis for processing Personal Data under General Data Protection Regulation (GDPR)</p>
                                <div className={styles.textBody}>
                                    <p >
                                        If you reside in the European Union (“EU”), United Kingdom, Lichtenstein, Norway, Iceland or Switzerland, you may have additional rights with respect to your Personal Data, as further outlined below. These rights may include rights under the EU’s General Data Protection Regulation (“GDPR”), if you are a resident of the EU, United Kingdom, Lichtenstein, Norway or Iceland.
                                    </p>
                                    <p>
                                        <strong>DATA COLLECTION</strong> When and How we collect your Personal Information
                                        Period 9 Strategic Management Services will collect the following personal information and sensitive personal information (collectively, personal data) such as:
                                    </p>
                                    
                                        <ul>
                                            <li>Full name</li>
                                            <li>Date of birth</li>
                                            <li>Time of birth</li>
                                            <li>Country currently located</li>
                                            <li>Email address</li>
                                        </ul>
                                  
                                    <p>
                                        Period 9 Strategic Management Services collects the personal data through the Company’s website when you sign up for your access.
                                    </p>
                                    <p>
                                        Period 9 Strategic Management Services collects data to process your:
                                    </p>
                                   
                                    <ul>
                                        <li>
                                            3 victory days (qi men dun jia)
                                        </li>
                                        <li>
                                            Generate Personalized Tong Shu Calendar
                                        </li>
                                        <li>
                                            Generate your personalized BaZi Chart
                                        </li>
                                        <li>
                                            Calculate your personalized Qi Men Destiny Palace
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                            <div className="col-md-5">
                                <p className={styles.textTitle}>5. DATA PROTECTION</p>
                                <div className={styles.textBody}>
                                    <p >
                                        Period 9 Strategic Management Services will take reasonable efforts to protect personal data it collects by implementing reasonable security measures to prevent unauthorized access, collection, use, disclosure, copying, modification, disposal and other similar risks.  While Period 9 Strategic Management Services has security implementation in place, Period 9 Strategic Management Services cannot completely guarantee the security of any personal data.
                                    </p>
                                    <p>
                                        <strong>RIGHTS OF DATA SUBJECTS</strong>
                                    </p>
                                    <p>
                                        You have the following rights under the Data Privacy Act 2012:
                                    </p>
                                    
                                    <ul>
                                        <li>The right to access;</li>
                                        <li>The right to object;</li>
                                        <li>The right to erasure or blocking;</li>
                                        <li>The right to file a complaint;</li>
                                        <li>The right to rectify; and</li>
                                        <li>The right to data portability.</li>
                                    </ul>
                                   
                                    <p>
                                        Should you want to exercise or know more about these rights, you may communicate with our Data Protection Officer at period9.dpo.support@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
import styles from "./Home.module.css"
import { GUA_DIRECTIONS, GuaDetails, LogoElement } from "@/constants/GuaList";

interface dataProps{
    gua:number | null,
    guaInfo:
        | typeof GUA_DIRECTIONS[keyof typeof GUA_DIRECTIONS]
        | null;
    details:
        | ReturnType<typeof GuaDetails>[keyof ReturnType<typeof GuaDetails>] 
        | null
    
}

export default function Result({gua,guaInfo, details}:dataProps){
    const logos = LogoElement();
    return (
        <>
            <div className="row m-0">
                <div className="col-md-3 p-0">
                    <div className={styles.containerContent}>
                        
                        <div className="row m-0 p-2">
                            <div className="col p-0">
                                <div className="d-flex mt-3">
                                    <div style={{width:"20%"}} className="text-end">
                                        <img src="/yinyang.png" style={{width:"40px"}} className="me-2" alt="" />
                                    </div>
                                    <div style={{width:"80%"}}>
                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                Gua number:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {gua}
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                East:
                                            </div>
                                            <div className={styles.rightContent}>      
                                                {guaInfo?.east.value}
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                North:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.north.value}
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                NorthEast:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.northEast.value}
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                NorthWest:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.northWest.value}
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                South:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.south.value}
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                SouthEast:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.southEast.value}
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                SouthWest:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.southWest.value}
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className={styles.leftLabel}>
                                                West:
                                            </div>
                                            <div className={styles.rightContent}>
                                                {guaInfo?.west.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="text-center">
                            <img src="/line.png" style={{width:"90%",height:"10px"}} alt="" />
                        </div>
                        <div className={styles.submitBottonDiv}>
                            
                            {/* <button
                                onClick={handleSubmit}
                                className={`${styles.submitBotton} btn`}
                            >
                                Submit
                                <FaArrowRight className="ms-2" />
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="col-md-5 p-0">
                    <div className={styles.containerContent}>
                        <img src={`/img/nine_star/${gua}.png`} style={{width:"100%"}} alt="" />
                    </div>
                </div>

                <div className="col-md-4 p-0">
                    <div className={styles.containerContent} style={{padding:"8%"}}>
                        <div className="row">
                            <div className="col">
                                <div className="d-flex">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={logos[details?.element as keyof typeof logos]?.element} alt="" style={{width:"50px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        Element:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.element}
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex mt-3">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={'/number.png'} alt="" style={{width:"35px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        Number:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.number}
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={'/location.png'} alt="" style={{width:"35px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        Direction:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.direction}
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={'/people.png'} alt="" style={{width:"35px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        People:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.people}
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={'/body.png'} alt="" style={{width:"35px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        Body Parts:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.bodyParts}
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={'/sicknes.png'} alt="" style={{width:"35px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        Sickness:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.Sickness}
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className={styles.leftRightLogo}> 
                                        <img src={'/color.png'} alt="" style={{width:"35px"}} />
                                    </div>
                                    <div className={styles.leftRightContent} style={{marginTop:"4%"}}>
                                        Colour:
                                    </div>
                                    <div className={styles.rightRightContent} style={{marginTop:"4%"}}>
                                        {details?.colour}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
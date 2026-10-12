"use client"
import { GUA_DIRECTIONS, convertNumberToGua, GuaDetails } from "@/constants/GuaList"
import { useState } from "react";
import { birthYearArray, yearAddDigit } from "./services";
import Chart from "./chart";
import styles from "./Home.module.css"
import { FaUser } from "react-icons/fa";

export default function Home(){
    const [birthDate,setbirthDate] = useState("")
    const [gender, setGender] = useState("")
    const [gua,setGua] = useState<number | null>(null)
    const [guaInfo, setGuaInfo] = useState<typeof GUA_DIRECTIONS[keyof typeof GUA_DIRECTIONS] | null>(null)
    const [guaName, setGuaName] = useState("")
    const [details, setDetails] = useState<ReturnType<typeof GuaDetails>[keyof ReturnType<typeof GuaDetails>] | null>(null);
    
    const handleSubmit = () => {
        const dateArr = birthYearArray(birthDate);
        const details = GuaDetails()
        const guaNumber = yearAddDigit(dateArr[0],gender)
        const res = convertNumberToGua(Number(guaNumber));
        setGuaName(res ?? "")
        setGuaInfo(res ? GUA_DIRECTIONS[res as keyof typeof GUA_DIRECTIONS] : null)
        setGua(guaNumber ?? null)

        const guaDetails = res as keyof typeof details;
        setDetails(details[guaDetails])
        console.log(details);
        
    }

    return (
        <>
            <section className="home-hero" style={{paddingTop:"7%"}}>
                <div className="container">
                    <div className="row">
                        <div className="col text-white">
                            <div className={styles.heroTitle}>
                                CREATE YOUR FENG SHUI CHART
                            </div>
                            <div className={styles.heroSubtitle}>
                                Discover balance in Every <span style={{color:"#F0D071"}}>Direction</span> 
                            </div>
                            <div style={{fontSize:"14px"}}>
                                Enter your birth details to unlock your personal feng shui chart and find the energy of each sector in your life.
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className={styles.contentDiv}>
                                <div className="row m-0">
                                    <div className="col-md-4 border p-0">
                                        <div className="d-flex mt-4">
                                            <div style={{width:"30%"}} className="text-end">
                                                <img src="/img/Untitled design.png" style={{width:"40px"}} className="me-2" alt="" />
                                            </div>
                                            <div style={{width:"70%"}}>
                                                <div>
                                                    <input  
                                                        type="date"
                                                        style={{background:"transparent",border:"1px solid gray"}} 
                                                        className="form-control txtStandard" 
                                                        value={birthDate}
                                                        onChange={(e)=>setbirthDate(e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div className="mt-2 position-relative">
                                                    <FaUser className="bi bi-gender-ambiguous"
                                                        style={{
                                                            position: "absolute",
                                                            left: "12px",
                                                            top: "50%",
                                                            transform: "translateY(-50%)",
                                                            color: "#B78130",
                                                            fontSize: "18px",
                                                            pointerEvents: "none",
                                                            zIndex: 2,
                                                        
                                                        }} />
                                                
                                                    <select
                                                        name="gender"
                                                        className="form-control txtStandard"
                                                        
                                                        style={{
                                                            backgroundColor: "transparent",
                                                            border: "1px solid gray",
                                                            paddingLeft: "40px"
                                                        }}
                                                        value={gender}
                                                        onChange={(e)=>setGender(e.target.value)}
                                                    >
                                                        <option value="" disabled>Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row m-0">
                                            <div className="col border p-0">
                                                <div className="d-flex mt-3">
                                                    <div style={{width:"30%"}} className="text-end">
                                                        <img src="/img/Untitled design.png" style={{width:"40px"}} className="me-2" alt="" />
                                                    </div>
                                                    <div style={{width:"70%"}}>
                                                        Gua number:{gua}
                                                        <br />
                                                        East:{guaInfo?.east.value}
                                                        <br />
                                                        North:{guaInfo?.north.value}
                                                        <br />
                                                        NorthEast:{guaInfo?.northEast.value}
                                                        <br />
                                                        NorthWest:{guaInfo?.northWest.value}
                                                        <br />
                                                        South:{guaInfo?.south.value}
                                                        <br />
                                                        SouthEast{guaInfo?.southEast.value}
                                                        <br />
                                                        SouthWest:{guaInfo?.southWest.value}
                                                        <br />
                                                        West:{guaInfo?.west.value}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <button onClick={handleSubmit}>Submit</button>
                                    </div>

                                    <div className="col-md-5 p-2">
                                        <img src={`/img/nine_star/${gua}.png`} style={{width:"100%"}} alt="" />
                                    </div>

                                    <div className="col-md-3 p-2">
                                        <div className="row">
                                            <div className="col">
                                                Element:{details?.element}
                                                <br />
                                                Number:{details?.number}
                                                <br />
                                                Direction:{details?.direction}
                                                <br />
                                                People:{details?.people}
                                                <br />
                                                Body Parts:{details?.bodyParts}
                                                <br />
                                                Sickness:{details?.Sickness}
                                                <br />
                                                Colour:{details?.colour}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
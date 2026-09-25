"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {login} from "@/services/auth.service";
import styles from "./login.module.css"
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import SocMedLogin from "./SocMedLogin";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await login({
                email,
                password
            })

            console.log("Login successful:", response.user);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <section className="home-hero">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-5">
                            <div className="mt-4 mb-4">
                                <div className="row">
                                    <div className="col text-center mb-4">
                                        
                                        <Link href={"/"} style={{
                                            textDecoration:"none"
                                        }}>
                                        <div className={styles.loginTop}>
                                            <div className="feng-logo m-auto">
                                                <span>◈</span>
                                            </div>

                                            <div className="feng-brand-text">
                                                <div className="feng-title">FENG SHUI</div>
                                                <div className="feng-tagline">
                                                HARMONY · BALANCE · PROSPERITY
                                                </div>
                                            </div>
                                        </div>
                                        </Link>
                                        
                                    </div>
                                </div>
                                <div className={`row p-4 ${styles.logincontainer}`}>
                                    <div className="col">
                                        <div className="row mb-3">
                                            <div className="col text-center">
                                                <span className={styles.loginHeader}>
                                                    WELCOME BACK
                                                </span>
                                                <br />
                                                <span className={styles.loginWord}>Log In</span> <span className={styles.loginYellow}>to Your Account</span>
                                                 <br />
                                                 <span style={{color:"white"}}><small>Access your consultation, services and <br /> personal dashboard</small></span>
                                            </div>
                                        </div>
                                        <form onSubmit={handleLoginForm}>
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}>✉</span>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Email Address" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><CiLock /></span>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    placeholder="Password" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <br />
                                            <button className={styles.loginButton}>
                                                <span>SIGN IN</span>
                                                <span className={styles.arrow}>→</span>
                                            </button>
                                            <SocMedLogin />
                                            
                                        </form>
                                        <div className="row mt-3">
                                            <div className="col position-relative">
                                                <hr style={{
                                                    width:"100%",
                                                    background:"white",
                                                    height:"3px"
                                                }} />
                                                <div style={{
                                                    color:"white",
                                                    background:"rgba(0, 29, 8, 0.9)",
                                                    width:"10%",
                                                    position:"absolute",
                                                    top:"20%",
                                                    textAlign:"center",
                                                    left:"45%"
                                                }}>
                                                    
                                                    <span>OR</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <Link href={"/sign-up"} style={{textDecoration:"none"}}>
                                                <button className={styles.googleButton} style={{
                                                    borderColor:"#F0D071",
                                                    color:"#F0D071"
                                                }}>
                                                    <span className={`${styles.googleIcon}`}><FaUser /></span>
                                                    <span>CREATE AN ACCOUNT</span>
                                                </button>
                                                </Link>
                                            </div>
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
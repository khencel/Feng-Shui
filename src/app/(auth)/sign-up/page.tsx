"use client";

import { useState } from "react";
import styles from "@/app/(auth)/login/login.module.css"
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import SocMedLogin from "../login/SocMedLogin";
import { FaEnvelope, FaUserAlt, FaTransgender, FaBirthdayCake    } from "react-icons/fa";
import CustomToast from "../../../../components/Toas";
import { showConfirmSwal } from "../../../../components/CustomSwal";
import { createRecord } from "@/lib/api/apiEndpoint";
import {RegisterUserData, User } from "../../../../types/user";
import LoadingFullScreen from "../../../../components/LoadingFullScreen";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const intialForm = {
        first_name:"",
        last_name:"",
        gender:"",
        date_of_birth:"",
        email:"",
        password:"",
        confirm_password:""
    }

    const [form, setForm] = useState(intialForm)
    const [toastText, setToastText] = useState("")
    const [toastStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info")
    const [showToast, setShowToast] = useState(false)

    const [fieldErrors, setFieldErrors] = useState<
        Record<string, string[]>
    >({});

    const [loading, setLoading] = useState(false)

    const renderFieldError = (field: string) => {
        const errors = fieldErrors[field];

        if (!errors?.length) return null;

        return (
            <div className="text-danger small mt-1">
                {errors.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
        );
    };
    
    const handleRegister = async () => {
        await showConfirmSwal({
            title: "Confirm Registration?",
            text: "Are you sure you want to create your account?",
            confirmButtonText: "Yes, Register",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                await handleSave();
            },
        });
        console.log(form);
    }

    const handleSave = async () => {
        setLoading(true)
        setFieldErrors({});
        try {
            const response = await createRecord<User, RegisterUserData>(
                "register",
                {
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    gender: form.gender,
                    date_of_birth: form.date_of_birth,
                    password: form.password,
                    confirm_password: form.confirm_password,
                    is_active: true,
                }
            );

            console.log("Registration successful:", response);
            setToastText("Registration successful.");
            setToastStatus("success");
            setShowToast(true);
            setLoading(false)

            setTimeout(() => {
                router.push("/login");
            }, 3000);

        } catch (error: any) {
            const errors =
                error?.errors ??
                error?.response?.data?.errors ??
                error?.data?.errors;

            if (errors) {
                setFieldErrors(errors);
            } else {
                setToastText(
                    error?.message || "Registration failed. Please try again."
                );
                setToastStatus("error");
                setShowToast(true);
            }

            setLoading(false)
        }
    };



    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "is_active"
                ? value === "true"
                : value,
        }));
    };

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
                                        
                                                <span className={styles.loginYellow}>CREATE YOUR ACCOUNT</span>
                                                 <br />
                                                 <span style={{color:"white"}}><small>Begin your journey to better energy, <br /> balance and a more prosperous life.</small></span>
                                            </div>
                                        </div>
                                        
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><FaUserAlt /></span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="First Name" 
                                                    value={form.first_name}
                                                    onChange={handleInputChange}
                                                    name="first_name"
                                                />
                                            </div>
                                            {renderFieldError("first_name")}
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><FaUserAlt /></span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Last Name" 
                                                    value={form.last_name}
                                                    name="last_name"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            {renderFieldError("last_name")}
                                            <br />
                                            <div className="row ">
                                                <div className="col-md-6">
                                                    <div className={styles.inputBox}>
                                                        <span className={styles.inputIcon}><FaTransgender  /></span>
                                                
                                                        <select 
                                                            className="form-control" 
                                                            onChange={handleInputChange}
                                                            value={form.gender}
                                                            name="gender"
                                                        >
                                                            <option value="" hidden >Selelect Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                    </div>
                                                    {renderFieldError("gender")}
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={styles.inputBox}>
                                                        <span className={styles.inputIcon}><FaBirthdayCake  /></span>
                                                        <input 
                                                            type="date" 
                                                            className="form-control"
                                                            value={form.date_of_birth}
                                                            onChange={handleInputChange}
                                                            name="date_of_birth"
                                                        />
                                                    </div>
                                                    {renderFieldError("date_of_birth")}
                                                </div>
                                            </div>
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><FaEnvelope /></span>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Email Address" 
                                                    value={form.email}
                                                    onChange={handleInputChange}
                                                    name="email"
                                                />
                                            </div>
                                            {renderFieldError("email")}
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><CiLock /></span>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    placeholder="Password" 
                                                    value={form.password}
                                                    onChange={handleInputChange}
                                                    name="password"
                                                />
                                            </div>
                                            {renderFieldError("password")}
                                            <br />
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}><CiLock /></span>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    placeholder="Confirm Password" 
                                                    value={form.confirm_password}
                                                    onChange={handleInputChange}
                                                    name="confirm_password"
                                                />
                                            </div>
                                            {renderFieldError("confirm_password")}
                                            
                                            <br />

                                            <SocMedLogin />
                                        
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
                                                
                                                <button 
                                                    className={styles.googleButton} 
                                                    style={{
                                                    borderColor:"#F0D071",
                                                    color:"#F0D071"
                                                    }}
                                                    onClick={handleRegister}
                                                >
                                                    <span className={`${styles.googleIcon}`}><FaUser /></span>
                                                    <span>SIGN UP</span>
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            <CustomToast
                show={showToast}
                message={toastText}
                type={toastStatus}
                onClose={() => setShowToast(false)}
            />

            <LoadingFullScreen
                loading={loading}
            />
        </main>
    );
}
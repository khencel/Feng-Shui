"use client";

import { useState } from "react";
import styles from "./DiscoverySection.module.css";
import HowToSubscribe from "@/app/(main)/HowToSubscribe";

export default function DiscoverySection() {
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        timeOfBirth: "",
        gender: "",
    });

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();

        console.log("Energy Calculation:", formData);
    };

    return (
        <>
            <div className="row m-0">
                <div className="col-md-5 p-5">
                    {/* LEFT CONTENT */}
                    <div className={styles.content}>

                        <div className={styles.eyebrow}>
                            DISCOVER YOUR ENERGY
                        </div>

                        <h2>
                            Free Feng Shui Energy
                            <br />
                            Calculator
                        </h2>

                        <p className={styles.description}>
                            Enter your birth details to discover your elemental
                            profile, lucky directions, and personal strengths.
                        </p>

                        {/* FEATURE ITEMS */}
                        <div className={styles.features}>

                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <circle
                                            cx="24"
                                            cy="24"
                                            r="17"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M24 7C19 14 17 19 20 24C23 29 29 30 31 35C33 39 28 42 24 42"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M24 42C29 35 31 30 28 24C25 19 19 18 17 13C15 9 20 7 24 7"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                </div>

                                <span>ELEMENT</span>
                            </div>

                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <circle
                                            cx="24"
                                            cy="24"
                                            r="16"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <circle
                                            cx="24"
                                            cy="24"
                                            r="4"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M24 4V16M24 32V44M4 24H16M32 24H44"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                </div>

                                <span>DIRECTION</span>
                            </div>

                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path
                                            d="M15 31C11 28 9 23 11 18C13 13 18 10 24 10C31 10 37 14 39 20C41 26 38 32 33 35C29 37 24 36 20 35C18 34 16 33 15 31Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />

                                        <circle
                                            cx="18"
                                            cy="21"
                                            r="2"
                                            fill="currentColor"
                                        />

                                        <circle
                                            cx="25"
                                            cy="17"
                                            r="2"
                                            fill="currentColor"
                                        />

                                        <circle
                                            cx="32"
                                            cy="21"
                                            r="2"
                                            fill="currentColor"
                                        />

                                        <circle
                                            cx="25"
                                            cy="27"
                                            r="2"
                                            fill="currentColor"
                                        />

                                        <path
                                            d="M10 31L6 35M38 31L42 35"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                </div>

                                <span>COLORS</span>
                            </div>

                            <div className={styles.feature}>
                                <div className={styles.featureIcon}>
                                    <svg viewBox="0 0 48 48" fill="none">
                                        <path
                                            d="M15 22C15 16 19 11 24 11C29 11 33 16 33 22V28H15V22Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />

                                        <path
                                            d="M19 34H29"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />

                                        <path
                                            d="M20 38H28"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />

                                        <path
                                            d="M24 5V2M9 10L7 8M39 10L41 8M6 23H3M45 23H42"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />

                                        <circle
                                            cx="24"
                                            cy="22"
                                            r="2"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                </div>

                                <span>INSIGHTS</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    {/* FORM */}
                    <HowToSubscribe />
                </div>
                <div className="col-md-2 p-0">
                    <img src="/img/Ornate Feng Shui Compass with Tassel and Leaves.png" style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                </div>
            </div>
        </>
    );
}
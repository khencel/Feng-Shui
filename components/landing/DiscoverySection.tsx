"use client";

import { useState } from "react";
import styles from "./DiscoverySection.module.css";

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
                <div className="col-md-5 p-5">
                    {/* FORM */}
                    <form
                        className={styles.formCard}
                        onSubmit={handleSubmit}
                    >

                        <div className={styles.formGrid}>

                            {/* FULL NAME */}
                            <div className={styles.formGroup}>
                                <label htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>


                            {/* DATE OF BIRTH */}
                            <div className={styles.formGroup}>
                                <label htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>

                                <div className={styles.inputWithIcon}>
                                    <input
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        type="text"
                                        placeholder="DD / MM / YYYY"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        onFocus={(e) => {
                                            e.target.type = "date";
                                        }}
                                    />

                                    <span className={styles.inputIcon}>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <rect
                                                x="4"
                                                y="5"
                                                width="16"
                                                height="15"
                                                rx="2"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M8 3V7M16 3V7M4 10H20"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M8 14H8.01M12 14H12.01M16 14H16.01M8 17H8.01M12 17H12.01"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>


                            {/* TIME OF BIRTH */}
                            <div className={styles.formGroup}>
                                <label htmlFor="timeOfBirth">
                                    Time of Birth
                                </label>

                                <div className={styles.inputWithIcon}>
                                    <input
                                        id="timeOfBirth"
                                        name="timeOfBirth"
                                        type="time"
                                        value={formData.timeOfBirth}
                                        onChange={handleChange}
                                    />

                                    <span className={styles.inputIcon}>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="8"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M12 7V12L15 14"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>


                            {/* GENDER */}
                            <div className={styles.formGroup}>
                                <label htmlFor="gender">
                                    Gender
                                </label>

                                <div className={styles.selectWrapper}>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="male">
                                            Male
                                        </option>

                                        <option value="female">
                                            Female
                                        </option>
                                    </select>

                                    <span className={styles.selectArrow}>
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M7 10L12 15L17 10"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                        </div>


                        <button
                            type="submit"
                            className={styles.calculateButton}
                        >
                            CALCULATE MY ENERGY
                        </button>

                    </form>
                </div>
                <div className="col-md-2 p-0">
                    <img src="/img/Ornate Feng Shui Compass with Tassel and Leaves.png" style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                </div>
            </div>
        </>
    );
}
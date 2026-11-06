
"use client";

import { useState } from "react";
import styles from "@/app/(auth)/login/login.module.css";
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import SocMedLogin from "../login/SocMedLogin";
import {
    FaEnvelope,
    FaUserAlt,
    FaTransgender,
    FaBirthdayCake
} from "react-icons/fa";

import CustomToast from "../../../../components/Toas";
import { showConfirmSwal } from "../../../../components/CustomSwal";
import { createRecord } from "@/lib/api/apiEndpoint";
import { RegisterUserData, User } from "../../../../types/user";
import LoadingFullScreen from "../../../../components/LoadingFullScreen";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();

    const initialForm = {
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    const [form, setForm] = useState(initialForm);

    const [toastText, setToastText] = useState("");
    const [toastStatus, setToastStatus] = useState<
        "success" | "error" | "warning" | "info"
    >("info");

    const [showToast, setShowToast] = useState(false);

    const [fieldErrors, setFieldErrors] = useState<
        Record<string, string[]>
    >({});

    const [loading, setLoading] = useState(false);

    // OTP STATES
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    // EMAIL VALIDATION
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
    );

    // CHECK ALL REQUIRED FIELDS
    const isFormComplete =
        form.first_name.trim() !== "" &&
        form.last_name.trim() !== "" &&
        form.gender !== "" &&
        form.date_of_birth !== "" &&
        form.email.trim() !== "" &&
        isValidEmail &&
        form.password !== "" &&
        form.confirm_password !== "";

    // PASSWORD VALIDATION
    const passwordsMatch =
        form.password === form.confirm_password;

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

    // INPUT CHANGE
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

        setFieldErrors((prev) => ({
            ...prev,
            [name]: []
        }));
    };

    // SEND OTP
    const handleSendOTP = async () => {
        if (!isFormComplete) return;

        setOtpLoading(true);
        setFieldErrors({});

        try {
            await createRecord(
                "register/send-otp",
                {
                    email: form.email.trim().toLowerCase()
                }
            );

            setOtpSent(true);
            setOtp("");
            setEmailVerified(false);

            setToastText(
                "Verification code has been sent to your email."
            );
            setToastStatus("success");
            setShowToast(true);

        } catch (error: any) {
            const errors =
                error?.errors ??
                error?.response?.data?.errors ??
                error?.data?.errors;

            if (errors) {
                setFieldErrors(errors);
            } else {
                setToastText(
                    error?.message ||
                    "Unable to send verification code."
                );
                setToastStatus("error");
                setShowToast(true);
            }
        } finally {
            setOtpLoading(false);
        }
    };

    // VERIFY OTP
    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setFieldErrors({
                otp: ["Please enter the 6-digit verification code."]
            });
            return;
        }

        setOtpLoading(true);
        setFieldErrors({});

        try {
            await createRecord(
                "register/verify-otp",
                {
                    email: form.email.trim().toLowerCase(),
                    otp: otp
                }
            );

            setEmailVerified(true);

            setToastText(
                "Email verified successfully. You can now sign up."
            );
            setToastStatus("success");
            setShowToast(true);

        } catch (error: any) {
            const errors =
                error?.errors ??
                error?.response?.data?.errors ??
                error?.data?.errors;

            if (errors) {
                setFieldErrors(errors);
            } else {
                setToastText(
                    error?.message ||
                    "Invalid verification code."
                );
                setToastStatus("error");
                setShowToast(true);
            }
        } finally {
            setOtpLoading(false);
        }
    };

    // SAVE REGISTRATION
    const handleSave = async () => {
        setLoading(true);
        setFieldErrors({});

        try {
            const response = await createRecord<User, RegisterUserData>(
                "register",
                {
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email.trim().toLowerCase(),
                    gender: form.gender,
                    date_of_birth: form.date_of_birth,
                    password: form.password,
                    confirm_password: form.confirm_password,
                    is_active: true
                }
            );

            console.log("Registration successful:", response);

            setToastText("Registration successful.");
            setToastStatus("success");
            setShowToast(true);

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
                    error?.message ||
                    "Registration failed. Please try again."
                );
                setToastStatus("error");
                setShowToast(true);
            }
        } finally {
            setLoading(false);
        }
    };

    // REGISTER CONFIRMATION
    const handleRegister = async () => {
        if (!emailVerified) return;

        if (!passwordsMatch) {
            setFieldErrors({
                confirm_password: ["Passwords do not match."]
            });
            return;
        }

        await showConfirmSwal({
            title: "Confirm Registration?",
            text: "Are you sure you want to create your account?",
            confirmButtonText: "Yes, Register",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                await handleSave();
            }
        });
    };

    return (
        <main>
            <section className="home-hero">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-5">
                            <div className="mt-4 mb-4">

                                {/* LOGO */}
                                <div className="row">
                                    <div className="col text-center mb-4">
                                        <Link
                                            href="/"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div className={styles.loginTop}>
                                                <div className="feng-logo m-auto">
                                                    <span>◈</span>
                                                </div>

                                                <div className="feng-brand-text">
                                                    <div className="feng-title">
                                                        FENG SHUI
                                                    </div>

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

                                        {/* HEADER */}
                                        <div className="row mb-3">
                                            <div className="col text-center">
                                                <span className={styles.loginYellow}>
                                                    CREATE YOUR ACCOUNT
                                                </span>
                                                <br />

                                                <span style={{ color: "white" }}>
                                                    <small>
                                                        Begin your journey to better energy,
                                                        <br />
                                                        balance and a more prosperous life.
                                                    </small>
                                                </span>
                                            </div>
                                        </div>

                                        {/* FIRST NAME */}
                                        <div className={styles.inputBox}>
                                            <span className={styles.inputIcon}>
                                                <FaUserAlt />
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                value={form.first_name}
                                                onChange={handleInputChange}
                                                name="first_name"
                                                disabled={otpSent}
                                            />
                                        </div>
                                        {renderFieldError("first_name")}
                                        <br />

                                        {/* LAST NAME */}
                                        <div className={styles.inputBox}>
                                            <span className={styles.inputIcon}>
                                                <FaUserAlt />
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                value={form.last_name}
                                                name="last_name"
                                                onChange={handleInputChange}
                                                disabled={otpSent}
                                            />
                                        </div>
                                        {renderFieldError("last_name")}
                                        <br />

                                        {/* GENDER AND BIRTHDAY */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className={styles.inputBox}>
                                                    <span className={styles.inputIcon}>
                                                        <FaTransgender />
                                                    </span>

                                                    <select
                                                        className="form-control"
                                                        onChange={handleInputChange}
                                                        value={form.gender}
                                                        name="gender"
                                                        disabled={otpSent}
                                                    >
                                                        <option value="" hidden>
                                                            Select Gender
                                                        </option>
                                                        <option value="male">
                                                            Male
                                                        </option>
                                                        <option value="female">
                                                            Female
                                                        </option>
                                                    </select>
                                                </div>
                                                {renderFieldError("gender")}
                                            </div>

                                            <div className="col-md-6">
                                                <div className={styles.inputBox}>
                                                    <span className={styles.inputIcon}>
                                                        <FaBirthdayCake />
                                                    </span>

                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={form.date_of_birth}
                                                        onChange={handleInputChange}
                                                        name="date_of_birth"
                                                        disabled={otpSent}
                                                    />
                                                </div>
                                                {renderFieldError("date_of_birth")}
                                            </div>
                                        </div>

                                        <br />

                                        {/* PASSWORD */}
                                        <div className={styles.inputBox}>
                                            <span className={styles.inputIcon}>
                                                <CiLock />
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={form.password}
                                                onChange={handleInputChange}
                                                name="password"
                                                disabled={otpSent}
                                            />
                                        </div>
                                        {renderFieldError("password")}
                                        <br />

                                        {/* CONFIRM PASSWORD */}
                                        <div className={styles.inputBox}>
                                            <span className={styles.inputIcon}>
                                                <CiLock />
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                value={form.confirm_password}
                                                onChange={handleInputChange}
                                                name="confirm_password"
                                                disabled={otpSent}
                                            />
                                        </div>
                                        {renderFieldError("confirm_password")}

                                        {!passwordsMatch &&
                                            form.confirm_password !== "" && (
                                                <div className="text-danger small mt-1">
                                                    Passwords do not match.
                                                </div>
                                            )}

                                        <br />

                                        {/* EMAIL */}
                                        <div className={styles.inputBox}>
                                            <span className={styles.inputIcon}>
                                                <FaEnvelope />
                                            </span>

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                value={form.email}
                                                onChange={handleInputChange}
                                                name="email"
                                                disabled={otpSent}
                                            />
                                        </div>
                                        {renderFieldError("email")}

                                        {/* OTP SECTION */}
                                        <div className="mt-2">

                                            {!otpSent && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-warning w-100"
                                                    onClick={handleSendOTP}
                                                    disabled={
                                                        otpLoading ||
                                                        !isFormComplete
                                                    }
                                                >
                                                    {otpLoading
                                                        ? "SENDING..."
                                                        : "SEND VERIFICATION CODE"}
                                                </button>
                                            )}

                                            {otpSent && !emailVerified && (
                                                <>
                                                    <div className={styles.inputBox}>
                                                        <span className={styles.inputIcon}>
                                                            <CiLock />
                                                        </span>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter 6-digit verification code"
                                                            value={otp}
                                                            maxLength={6}
                                                            inputMode="numeric"
                                                            onChange={(e) => {
                                                                setOtp(
                                                                    e.target.value.replace(/\D/g, "")
                                                                );
                                                                setFieldErrors((prev) => ({
                                                                    ...prev,
                                                                    otp: []
                                                                }));
                                                            }}
                                                        />
                                                    </div>

                                                    {renderFieldError("otp")}

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-warning w-100 mt-2"
                                                        onClick={handleVerifyOTP}
                                                        disabled={
                                                            otpLoading ||
                                                            otp.length !== 6
                                                        }
                                                    >
                                                        {otpLoading
                                                            ? "VERIFYING..."
                                                            : "VERIFY CODE"}
                                                    </button>
                                                </>
                                            )}

                                            {emailVerified && (
                                                <div className="text-success text-center mt-2">
                                                    ✓ Email successfully verified
                                                </div>
                                            )}

                                        </div>

                                        <br />

                                        

                                        {/* SOCIAL LOGIN */}
                                        <SocMedLogin />

                                        <div className="row mt-3">
                                            <div className="col position-relative">
                                                <hr
                                                    style={{
                                                        width: "100%",
                                                        background: "white",
                                                        height: "3px"
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        color: "white",
                                                        background: "rgba(0, 29, 8, 0.9)",
                                                        width: "10%",
                                                        position: "absolute",
                                                        top: "20%",
                                                        textAlign: "center",
                                                        left: "45%"
                                                    }}
                                                >
                                                    <span>OR</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SIGN UP */}
                                        <div className="row mt-3">
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className={styles.googleButton}
                                                    style={{
                                                        borderColor: "#F0D071",
                                                        color: "#F0D071",
                                                        opacity: emailVerified ? 1 : 0.5,
                                                        cursor: emailVerified
                                                            ? "pointer"
                                                            : "not-allowed"
                                                    }}
                                                    onClick={handleRegister}
                                                    disabled={
                                                        !emailVerified ||
                                                        loading ||
                                                        !passwordsMatch
                                                    }
                                                >
                                                    <span className={styles.googleIcon}>
                                                        <FaUser />
                                                    </span>

                                                    <span>
                                                        {emailVerified
                                                            ? "SIGN UP"
                                                            : "VERIFY EMAIL FIRST"}
                                                    </span>
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

            {/* TOAST */}
            <CustomToast
                show={showToast}
                message={toastText}
                type={toastStatus}
                onClose={() => setShowToast(false)}
            />

            {/* LOADING */}
            <LoadingFullScreen loading={loading} />
        </main>
    );
}

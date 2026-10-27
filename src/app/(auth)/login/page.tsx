
"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";
import styles from "./login.module.css";
import { CiLock } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import SocMedLogin from "./SocMedLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";

type FormErrors = {
    email?: string;
    password?: string;
    general?: string;
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            newErrors.email = "Email address is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        ) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (!password.trim()) {
            newErrors.password = "Password cannot contain only spaces.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLoginForm = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (isLoading) return;

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const response = await login({
                email: email.trim(),
                password,
            });

            if (!response?.access || !response?.user) {
                setErrors({
                    general: "Invalid login response. Please try again.",
                });
                return;
            }

            Cookies.set("access_token", response.access, {
                expires: 7 / 24,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            Cookies.set("user", JSON.stringify(response.user), {
                expires: 7 / 24,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });

            if (
                "is_admin" in response.user &&
                response.user.is_admin
            ) {
                router.push("/dashboard");
            } else {
                router.push("/user/home");
            }
        
        
        } catch (error: unknown) {
            // console.error("Login failed:", error);

            if (error instanceof ApiError) {
                const message = error.message;

                setErrors({
                    general:
                        message === "No active account found with the given credentials"
                            ? "Account not found or invalid email/password."
                            : message,
                });
            } else {
                setErrors({
                    general: "Something went wrong. Please try again.",
                });
            }
        } finally {
            setIsLoading(false);
        }
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

                                <div
                                    className={`row p-4 ${styles.logincontainer}`}
                                >
                                    <div className="col">
                                        <div className="row mb-3">
                                            <div className="col text-center">
                                                <span className={styles.loginHeader}>
                                                    WELCOME BACK
                                                </span>
                                                <br />

                                                <span className={styles.loginWord}>
                                                    Log In
                                                </span>{" "}
                                                <span className={styles.loginYellow}>
                                                    to Your Account
                                                </span>
                                                <br />

                                                <span style={{ color: "white" }}>
                                                    <small>
                                                        Access your consultation,
                                                        services and <br />
                                                        personal dashboard
                                                    </small>
                                                </span>
                                            </div>
                                        </div>

                                        {errors.general && (
                                            <div
                                                className="alert alert-danger py-2"
                                                role="alert"
                                                aria-live="polite"
                                            >
                                                {errors.general}
                                            </div>
                                        )}

                                        <form
                                            onSubmit={handleLoginForm}
                                            noValidate
                                        >
                                            {/* Email */}
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}>
                                                    ✉
                                                </span>

                                                <input
                                                    type="email"
                                                    className={`form-control ${
                                                        errors.email
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    placeholder="Email Address"
                                                    aria-label="Email address"
                                                    aria-invalid={!!errors.email}
                                                    aria-describedby={
                                                        errors.email
                                                            ? "email-error"
                                                            : undefined
                                                    }
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            email: undefined,
                                                            general: undefined,
                                                        }));
                                                    }}
                                                    disabled={isLoading}
                                                    autoComplete="email"
                                                />
                                            </div>

                                            {errors.email && (
                                                <div
                                                    id="email-error"
                                                    className="text-danger small mt-1"
                                                    role="alert"
                                                >
                                                    {errors.email}
                                                </div>
                                            )}

                                            <br />

                                            {/* Password */}
                                            <div className={styles.inputBox}>
                                                <span className={styles.inputIcon}>
                                                    <CiLock />
                                                </span>

                                                <input
                                                    type="password"
                                                    className={`form-control ${
                                                        errors.password
                                                            ? "is-invalid"
                                                            : ""
                                                    }`}
                                                    placeholder="Password"
                                                    aria-label="Password"
                                                    aria-invalid={
                                                        !!errors.password
                                                    }
                                                    aria-describedby={
                                                        errors.password
                                                            ? "password-error"
                                                            : undefined
                                                    }
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            password: undefined,
                                                            general: undefined,
                                                        }));
                                                    }}
                                                    disabled={isLoading}
                                                    autoComplete="current-password"
                                                />
                                            </div>

                                            {errors.password && (
                                                <div
                                                    id="password-error"
                                                    className="text-danger small mt-1"
                                                    role="alert"
                                                >
                                                    {errors.password}
                                                </div>
                                            )}

                                            <br />

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                className={styles.loginButton}
                                                disabled={isLoading}
                                            >
                                                <span>
                                                    {isLoading
                                                        ? "SIGNING IN..."
                                                        : "SIGN IN"}
                                                </span>

                                                <span className={styles.arrow}>
                                                    {isLoading ? (
                                                        <span
                                                            className="spinner-border spinner-border-sm"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        "→"
                                                    )}
                                                </span>
                                            </button>

                                            <SocMedLogin />
                                        </form>

                                        <div className="row mt-3">
                                            <div className="col position-relative">
                                                <hr
                                                    style={{
                                                        width: "100%",
                                                        background: "white",
                                                        height: "3px",
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        color: "white",
                                                        background:
                                                            "rgba(0, 29, 8, 0.9)",
                                                        width: "10%",
                                                        position: "absolute",
                                                        top: "20%",
                                                        textAlign: "center",
                                                        left: "45%",
                                                    }}
                                                >
                                                    <span>OR</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col">
                                                <Link
                                                    href="/sign-up"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.googleButton
                                                        }
                                                        style={{
                                                            borderColor: "#F0D071",
                                                            color: "#F0D071",
                                                        }}
                                                        disabled={isLoading}
                                                    >
                                                        <span
                                                            className={
                                                                styles.googleIcon
                                                            }
                                                        >
                                                            <FaUser />
                                                        </span>
                                                        <span>
                                                            CREATE AN ACCOUNT
                                                        </span>
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
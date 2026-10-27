"use client";

import { signIn, useSession  } from "next-auth/react";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SocMedLogin() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/dashboard",
        });
    };

    useEffect(() => {
        if (status !== "authenticated") return;

        if (session?.djangoUser?.is_admin === true) {
            router.replace("/dashboard");
        } else if (session?.djangoUser) {
            router.replace("/user/home");
        }
    }, [status, session, router]);

    return (
        <>
            <button
                onClick={handleLogin}
                type="button"
                className={styles.googleButton}
            >
                <span className={styles.googleIcon}>
                    <FcGoogle />
                </span>

                <span>CONTINUE WITH GOOGLE</span>
            </button>

            <button
                type="button"
                className={styles.googleButton}
            >
                <span className={styles.googleIcon}>
                    <FaFacebook
                        style={{ color: "#0866FF" }}
                    />
                </span>

                <span>CONTINUE WITH FACEBOOK</span>
            </button>
        </>
    );
}
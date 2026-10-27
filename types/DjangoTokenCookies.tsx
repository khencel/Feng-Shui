"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

export default function DjangoTokenCookie() {
    const { data: session, status } = useSession();
    const initialized = useRef(false);

    useEffect(() => {
        if (status !== "authenticated" || initialized.current) return;

        const token = session?.djangoAccessToken;
        const user = session?.djangoUser;

        if (token && !Cookies.get("access_token")) {
            Cookies.set("access_token", token, {
                expires: 7 / 24,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }

        if (user && !Cookies.get("user")) {
            Cookies.set("user", JSON.stringify(user), {
                expires: 7 / 24,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }

        initialized.current = true;
    }, [status, session]);

    return null;
}
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
       
        Cookies.remove("access_token", {
            path: "/",
        });

        Cookies.remove("user", {
            path: "/",
        });

       
        await signOut({
            redirect: false,
        });

        
        router.replace("/login");
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}
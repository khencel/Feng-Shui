"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        Cookies.remove("access_token", { path: "/" });
        Cookies.remove("user", { path: "/" });

        await signOut({
            redirect: false,
        });

        router.replace("/login");
    };

    return (
        <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
        >
            <LogOut size={17} strokeWidth={2} />
            <span>Logout</span>
        </button>
    );
}
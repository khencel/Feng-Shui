
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [userCookie, setUserCookie] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  const handleLogout = async () => {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("user", { path: "/" });

    setUserCookie(undefined);

    await signOut({ redirect: false });

    router.replace("/login");
  };

  useEffect(() => {
    setUserCookie(Cookies.get("access_token"));
    setMounted(true);
  }, []);

  // Check kung active ang current page
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Reusable class para sa active navigation
  const navClass = (href: string) =>
    `feng-nav-link${isActive(href) ? " active" : ""}`;

  return (
    <nav className="feng-navbar navbar navbar-expand-lg">
      <div className="container-fluid px-4 px-lg-5">
        {/* LOGO */}
        <Link href="/" className="feng-brand">
          <div className="feng-logo">
            <span>◈</span>
          </div>

          <div className="feng-brand-text">
            <div className="feng-title">FENG SHUI</div>
            <div className="feng-tagline">
              HARMONY · BALANCE · PROSPERITY
            </div>
          </div>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler feng-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#fengNavbar"
          aria-controls="fengNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="fengNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link
                href="/"
                className={navClass("/")}
                aria-current={isActive("/") ? "page" : undefined}
              >
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/about-us"
                className={navClass("/about-us")}
                aria-current={isActive("/about-us") ? "page" : undefined}
              >
                ABOUT US
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/privacy-policy"
                className={navClass("/privacy-policy")}
                aria-current={isActive("/privacy-policy") ? "page" : undefined}
              >
                DATA PRIVACY
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/copyright-notice"
                className={navClass("/copyright-notice")}
                aria-current={isActive("/copyright-notice") ? "page" : undefined}
              >
                COPYRIGHT NOTICE
              </Link>
            </li>

            {mounted && !userCookie ? (
              <>
                <li className="nav-item">
                  <Link
                    href="/login"
                    className={navClass("/login")}
                    aria-current={isActive("/login") ? "page" : undefined}
                  >
                    SIGN IN
                  </Link>
                </li>

                <li className="nav-item ms-lg-4">
                  <Link
                    href="/sign-up"
                    className={`feng-consultation-btn${
                      isActive("/sign-up") ? " active" : ""
                    }`}
                    aria-current={
                      isActive("/sign-up") ? "page" : undefined
                    }
                  >
                    SIGN UP NOW
                  </Link>
                </li>
              </>
            ) : mounted && userCookie ? (
              <li className="nav-item ms-lg-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="feng-consultation-btn"
                  style={{ cursor: "pointer" }}
                >
                  SIGN OUT
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

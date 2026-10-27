import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        djangoAccessToken?: string;
        djangoRefreshToken?: string;

        djangoUser?: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            gender: string;
            is_admin: boolean;
        };
    }

    interface Account {
        djangoAccessToken?: string;
        djangoRefreshToken?: string;
        djangoUser?: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            gender: string;
            is_admin: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        djangoAccessToken?: string;
        djangoRefreshToken?: string;

        djangoUser?: {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            gender: string;
            is_admin: boolean;
        };
    }
}
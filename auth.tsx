
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),

        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID!,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
        }),
    ],

    callbacks: {

        async signIn({ account }) {

            if (
                account?.provider !== "google" &&
                account?.provider !== "facebook"
            ) {
                return true;
            }

            try {

                let endpoint = "";
                let payload = {};

                // GOOGLE LOGIN
                if (account.provider === "google") {

                    if (!account.id_token) {
                        return false;
                    }

                    endpoint = "/api/auth/google/";

                    payload = {
                        id_token: account.id_token,
                    };
                }

                // FACEBOOK LOGIN
                if (account.provider === "facebook") {

                    if (!account.access_token) {
                        return false;
                    }

                    endpoint = "/api/auth/facebook/";

                    payload = {
                        access_token: account.access_token,
                    };
                }

                // SEND TOKEN TO DJANGO
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error("DJANGO LOGIN ERROR:", data);
                    return false;
                }

                // SAVE DJANGO DATA
                account.djangoAccessToken = data.access;
                account.djangoRefreshToken = data.refresh;
                account.djangoUser = data.user ?? undefined;

                return true;

            } catch (error) {

                console.error("SOCIAL LOGIN ERROR:", error);
                return false;

            }
        },

        async jwt({ token, account }) {

            if (account?.djangoAccessToken) {
                token.djangoAccessToken = account.djangoAccessToken;
            }

            if (account?.djangoRefreshToken) {
                token.djangoRefreshToken = account.djangoRefreshToken;
            }

            if (account?.djangoUser) {
                token.djangoUser = account.djangoUser;
            }

            return token;
        },

        async session({ session, token }) {

            session.djangoAccessToken =
                token.djangoAccessToken as string;

            session.djangoRefreshToken =
                token.djangoRefreshToken as string;

            session.djangoUser =
                token.djangoUser as typeof session.djangoUser;

            return session;
        },
    },
});

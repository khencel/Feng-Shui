import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],


    callbacks: {
        async signIn({ user, account }) {
            console.log("========== GOOGLE LOGIN ==========");
            console.log("PROVIDER:", account?.provider);
            console.log("ACCOUNT:", account);
            console.log("ID TOKEN:", account?.id_token);
            console.log("ACCESS TOKEN:", account?.access_token);

            if (account?.provider !== "google") {
                return true;
            }

            if (!account.id_token) {
                console.error("❌ NO GOOGLE ID TOKEN");
                return false;
            }

            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/`;

                console.log("DJANGO URL:", url);

                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_token: account.id_token,
                    }),
                });

                console.log("DJANGO STATUS:", response.status);

                const responseText = await response.text();

                console.log("DJANGO RESPONSE:", responseText);

                if (!response.ok) {
                    console.error("❌ DJANGO LOGIN FAILED");
                    return false;
                }

                console.log("✅ DJANGO LOGIN SUCCESS");

                return true;

            } catch (error) {
                console.error("❌ FETCH ERROR:", error);
                return false;
            }
        },
    },
});
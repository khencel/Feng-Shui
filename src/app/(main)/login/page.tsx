"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {login} from "@/services/auth.service";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        await signIn("google", {
            callbackUrl: "/dashboard",
        });
    };

    const handleLoginForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await login({
                email,
                password
            })

            console.log("Login successful:", response.user);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <section className="home-hero">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-7 border p-3">
                            <div className="mt-4 mb-4">
                                <form onSubmit={handleLoginForm}>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <br />
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <br />
                                    <button className="btn btn-success">Login</button>
                                </form>
                            </div>
                            <button onClick={handleLogin} className="btn btn-primary">
                                Continue with Google
                            </button>
                        </div>
                    </div>
                    
                </div>
            </section>
            
        </main>
    );
}
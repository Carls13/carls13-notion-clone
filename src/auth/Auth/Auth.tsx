import { useState } from "react"
import { useAuthSession } from "./../AuthSessionContext";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from './../../utils/utils.module.css';

export const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const { session } = useAuthSession();

    if (session) {
        return <Navigate to="/" />;
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            console.log(error);
        }
        alert("Check your email for the magic link!");
        setLoading(false);
    };

    return (
        <div className={styles.centeredFlex}>
            <div>
                <h1>ZTM Notes App</h1>
                <p>Sign in via magic link with your email below</p>
                {
                    loading ? (
                        <p>Sending magic link...</p>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit">Send Magic Link</button>
                        </form>
                    )
                }
            </div>
        </div>
    )

}
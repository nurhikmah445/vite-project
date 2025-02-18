import { FormEvent } from "react";
import apifetch from "../../utils/axios";
import { useNavigate } from "react-router";
import "./style.css";

export default function Register() {
    const navigate = useNavigate();

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();
        const { username, password } = ev.target as typeof ev.target & {
            username: { value: string },
            // email: { value: string },
            password: { value: string }
        }

        try {
            const response = await apifetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    username: username.value,
                    // email: email.value,
                    password: password.value
                }
            });

            if (response.status >= 400) {
                throw new Error(response.data.messages);
            }

            const data = await response.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", username.value);

            alert("Registration successful! Redirecting to login...");
            navigate('/login');

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                alert("Registration failed. Please try again.");
                return;
            }
            alert("Server error occurred.");
        }
    }

    return (
        <section>
            <div className="main-container">
                <div className="form-container">
                    <h2>CREATE ACCOUNT ?</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" aria-label="Username" required />
                        {/* <input type="email" name="email" placeholder="Email" aria-label="Email" required />y */}
                        <input type="password" name="password" placeholder="Password" aria-label="Password" required />
                        <button type="submit">Create Account</button>
                        <a href="/login">Already have an account?</a>
                    </form>
                </div>
            </div>
        </section>
    )
}

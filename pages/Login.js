import { userData } from "@/jotaiStorage";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [doesMatch, setDoesMatch] = useState(true);
    const [nameDoesMatch, setNameDoesMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useAtom(userData);

    const warningRef = useRef(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPass: "",
        },
    });

    const submitForm = async (data) => {
        setLoading(true);

        try {
            const response = await axios.post("/api/auth/login", {
                username: data.username,
                password: data.password,
            });

            if (response.status === 200) {
                // Successful login
                console.log("Login In Successful");
                Cookies.set("user", JSON.stringify(response.data.userData), {
                    expires: 7,
                });

                router.push("/");
            } else {
                console.log("Login failed:", response.data.match);
            }
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response.status === 401) {
                // Show the warning message
                setDoesMatch(false);
                warningRef.current.innerText = "Wrong password";
                warningRef.current.style.visibility = "visible";
            } else if (error.response.status === 404) {
                setNameDoesMatch(true);
                warningRef.current.innerText = "User Not Found";
                warningRef.current.style.visibility = "visible";
            }
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (type, showPasswordState) => (
        <>
            <input
                type={showPasswordState ? "text" : "password"}
                onFocus={() => {
                    setDoesMatch(true);
                    warningRef.current.style.visibility = "hidden";
                }}
                {...register(type)}
                className={
                    doesMatch ? `input-password` : `input-password red-border`
                }
                required
            />
            <i
                className={
                    showPasswordState
                        ? "fa-regular fa-eye-slash eye"
                        : "fa-regular fa-eye eye"
                }
                onClick={() => {
                    if (type === "password") {
                        setShowPassword(!showPassword);
                    } else if (type === "confirmPass") {
                        setShowPasswordConfirm(!showPasswordConfirm);
                    }
                }}
            ></i>
        </>
    );

    return (
        <>
            <div className="outer-register-main-container">
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="register-main-container"
                >
                    <div onClick={() => router.push("/")}>
                        <i class="fa-solid fa-xmark go-back-login-register"></i>
                    </div>
                    <div className="register-container">WelcomeBack</div>
                    <div
                        ref={warningRef}
                        className={`register-warning-container`}
                    ></div>
                    <div className="all-options">
                        <div className="outer-username-option">
                            <div className="register-username">username</div>
                            <div className="input-username-container">
                                <input
                                    onFocus={() => {
                                        setNameDoesMatch(false);
                                        warningRef.current.style.visibility =
                                            "hidden";
                                    }}
                                    {...register("username")}
                                    className={
                                        nameDoesMatch
                                            ? `input-username red-border`
                                            : `input-username `
                                    }
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="outer-password-option">
                            <div className="register-password">password</div>
                            <div className="input-password-container">
                                {renderInput("password", showPassword)}
                            </div>
                        </div>

                        <div className="register-button-container">
                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >
                                {loading ? "Logging..." : "Login"}
                            </button>
                            <Link className="transfer-link" href="/Register">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

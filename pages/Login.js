import { userData } from "@/jotaiStorage";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const router = useRouter();
    const [doesMatch, setDoesMatch] = useState(true);
    const [nameDoesMatch, setNameDoesMatch] = useState(false);
    const [hideWarning, setHideWarning] = useState(true);
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

    useEffect(() => {
        hideWarning
            ? (warningRef.current.style.visibility = "hidden")
            : (warningRef.current.style.visibility = "visible");
    }, [hideWarning]);

    const submitForm = async (data) => {
        setLoading(true);

        try {
            const response = await axios.post("/api/auth/login", {
                username: data.username,
                password: data.password,
            });

            if (response.status === 200) {
                // console.log("User Data: ", response.data.userData);
                setUser(response.data.userData);

                router.push("/");
            } else {
                console.log("Login failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
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
                    setHideWarning(true);
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
                    <div className="register-container">WelcomeBack</div>
                    <div
                        ref={warningRef}
                        className="register-warning-container"
                    ></div>
                    <div className="all-options">
                        <div className="outer-username-option">
                            <div className="register-username">username</div>
                            <div className="input-username-container">
                                <input
                                    onFocus={() => {
                                        setNameDoesMatch(false);
                                        setHideWarning(true);
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
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

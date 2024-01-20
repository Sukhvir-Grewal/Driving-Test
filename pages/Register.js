import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
    const router = useRouter();
    const [doesMatch, setDoesMatch] = useState(true);
    const [nameDoesMatch, setNameDoesMatch] = useState(false);
    const [hideWarning, setHideWarning] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [loading, setLoading] = useState(false);   

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

    const registerUser = async (username, password) => {
        try {
            setLoading(true);
            await axios.post("/api/auth/register", { username, password });
            router.push("/Login");
            console.log("User Added");
        } catch (error) {
            setNameDoesMatch(true);
            setHideWarning(() => {
                warningRef.current.innerHTML = "User name already exists";
                return false;
            });
        } finally {
            setLoading(false);
        }
    };

    const submitForm = async (data) => {
        if (data.password !== data.confirmPass) {
            setDoesMatch(false);
            setHideWarning(() => {
                warningRef.current.innerHTML = "Password does not match";
                return false;
            });
        } else {
            setDoesMatch(true);
            await registerUser(data.username, data.password);
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
                    <div className="register-container">Register New User</div>
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
                        <div className="outer-confirmPassword-option">
                            <div className="register-confirmPassword">
                                confirm
                            </div>
                            <div className="input-confirmPassword-container">
                                {renderInput(
                                    "confirmPass",
                                    showPasswordConfirm
                                )}
                            </div>
                        </div>
                        <div className="register-button-container">
                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

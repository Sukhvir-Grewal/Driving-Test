import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
    const router = useRouter();
    const [doesMatch, setDoesMatch] = useState(true);
    const [nameDoesMatch, setNameDoesMatch] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPass: "",
        },
    });

    const submitForm = async (data) => {
        if (data.password !== data.confirmPass) {
            setDoesMatch(false);
            console.log("password does not match");
        } else {
            setDoesMatch(true);
            try {
                await axios.post("/api/auth/register", {
                    username: data.username,
                    password: data.password,
                });
                router.push("/Login");
                console.log("User Added");
            } catch (error) {
                setNameDoesMatch(true);
                console.log("already there");
            }
        }
    };

    return (
        <>
            <div className="outer-register-main-container">
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="register-main-container"
                >
                    <div className="register-container">Register New User</div>
                    <div className="all-options">
                        <div className="outer-username-option">
                            <div className="register-username">username</div>
                            <div className="input-username-container">
                                <input
                                    onFocus={() => setNameDoesMatch(false)}
                                    {...register("username")}
                                    className={
                                        nameDoesMatch
                                            ? `input-username red-border`
                                            : `input-username `
                                    }
                                ></input>
                            </div>
                        </div>
                        <div className="outer-password-option">
                            <div className="register-password">password</div>
                            <div className="input-password-container">
                                <input
                                    {...register("password")}
                                    className="input-password"
                                ></input>
                            </div>
                        </div>
                        <div className="outer-confirmPassword-option">
                            <div className="register-confirmPassword">
                                confirm
                            </div>
                            <div className="input-confirmPassword-container">
                                <input
                                    onFocus={() => setDoesMatch(true)}
                                    type="text"
                                    {...register("confirmPass")}
                                    className={
                                        doesMatch
                                            ? `input-confirmPassword`
                                            : `input-confirmPassword red-border`
                                    }
                                ></input>
                            </div>
                        </div>
                        <div className="register-button-container">
                            <button type="submit" className="register-button">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

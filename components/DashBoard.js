import { userData } from "@/jotaiStorage";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";

export default function DashBoard({ setView }) {
    const [user, setUser] = useAtom(userData);
    return (
        <>
            <div className="nav-container">
                <div className="login-register-container">
                    {user ? (
                        user.username
                    ) : (
                        <>
                            <Link className="link" href="/Login">
                                Login
                            </Link>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link className="link" href="/Register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="outer-main-container">
                <div className="main-container">
                    <div className="heading-container">
                        Canadian Driving Test
                    </div>
                    <div className="option-container">
                        <Link
                            className="link"
                            href={{
                                pathname: "/Quiz",
                                query: { dataType: "signData" },
                            }}
                        >
                            Traffic Signs
                        </Link>
                    </div>
                    <div className="option-container">
                        <Link
                            className="link"
                            href={{
                                pathname: "/Quiz",
                                query: { dataType: "rorData" },
                            }}
                        >
                            Rules of Road
                        </Link>
                    </div>
                    <div className="option-container">
                        <Link
                            className="link"
                            href={{
                                pathname: "/Quiz",
                                query: { dataType: "FullTest" },
                            }}
                        >
                            Full Test
                        </Link>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}

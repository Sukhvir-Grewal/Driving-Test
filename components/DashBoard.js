import { userData } from "@/jotaiStorage";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DashBoard({ setView }) {
    const [user, setUser] = useAtom(userData);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
    }, []);

    const renderNavBar = () => (
        <>
            <div className="nav-container">
                <div className="login-register-container">
                    {user ? (
                        <div className="user-name-container">
                            <div className="user-name">{user.username}</div>
                            <div className="user-image-container">
                                <img
                                    className="user-image"
                                    src="/images/defaultImage.webp"
                                    onClick={() =>
                                        setShowSettings(!showSettings)
                                    }
                                ></img>
                            </div>
                        </div>
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
        </>
    );

    const renderSetting = () => (
        <div className="setting-main-container">
            <div className="setting-option">
                <span>Dark Mode</span>
            </div>
            <div className="setting-option">
                <span>Setting</span>
            </div>
            <div className="setting-option">
                <span>Log Out</span>
            </div>
        </div>
    );

    return (
        <>
            {renderNavBar()}
            <div className="outer-main-container">
                {showSettings && renderSetting()}
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

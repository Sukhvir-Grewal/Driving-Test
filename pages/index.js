import { userData } from "@/jotaiStorage";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Settings from "@/components/Settings";
import Style from "@/styles/Home.module.css";

export default function Home({ setView }) {
    const goBackContainerRef = useRef(null);
    const [user, setUser] = useAtom(userData);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSetting, setShowSetting] = useState(false);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            console.log(userCookie);
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
    }, []);

    const renderNavBar = () => (
        <>
            <div className="nav-container">
                {showSetting && (
                    <div
                        onClick={() => {
                            setShowSetting(false);
                            setShowDropDown(false);
                        }}
                        ref={goBackContainerRef}
                        className={Style.goBackContainer}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                )}
                <div></div>
                <div className="login-register-container">
                    {user ? (
                        <div className="user-name-container">
                            <div className="user-name">{user.username}</div>
                            <div className="user-image-container">
                                <img
                                    className="user-image"
                                    src={user.profileImage.imageUrl}
                                    onClick={() =>
                                        setShowDropDown(!showDropDown)
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

    const renderDropDown = () => (
        <div className="dropDown-main-container">
            <div className="dropDown-option">
                <span>Dark Mode</span>
            </div>
            {!showSetting && (
                <div
                    onClick={() => {
                        setShowSetting(true);
                        setShowDropDown(false);
                    }}
                    className="dropDown-option"
                >
                    <span>Setting</span>
                </div>
            )}
            <div onClick={() => handleLogout()} className="dropDown-option">
                <span>Log Out</span>
            </div>
        </div>
    );

    const handleLogout = () => {
        Cookies.remove("user");
        window.location.reload();
    };

    const renderMenu = () => (
        <>
            <div className="heading-container">Canadian Driving Test</div>
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
        </>
    );

    return (
        <>
            {renderNavBar()}
            <div className="outer-main-container">
                {showDropDown && renderDropDown()}
                <div className="main-container">
                    {!showSetting ? renderMenu() : <Settings />}
                </div>
            </div>
        </>
    );
}

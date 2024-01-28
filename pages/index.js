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
    const [colorMode, setColorMode] = useState(false);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
    }, []);

    useEffect(() => {
        if (colorMode)
            Cookies.set("user", JSON.stringify(user), { expires: 7 });
    }, [colorMode]);

    useEffect(() => {
        if (user?.isDarkMode) {
            //Dark Mode
            document.documentElement.style.setProperty("--bg", "black");
            document.documentElement.style.setProperty(
                "--nav-bg",
                "var(--gray-3)"
            );
            document.documentElement.style.setProperty(
                "--container-bg",
                "var(--gray-2)"
            );
            document.documentElement.style.setProperty(
                "--text-color-before-hover",
                "rgb(207, 207, 207)"
            );
            document.documentElement.style.setProperty(
                "--text-color-after-hover",
                "white"
            );
            document.documentElement.style.setProperty(
                "--nav-user-name-color",
                "white"
            );
            document.documentElement.style.setProperty(
                "--drop-down-bg",
                "var(--gray-3)"
            );
            document.documentElement.style.setProperty(
                "--quiz-nav-bg",
                "var(--gray-3)"
            );
            document.documentElement.style.setProperty("--text-color", "white");
            document.documentElement.style.setProperty(
                "--goBack-bg",
                "var(--gray-2)"
            );
            document.documentElement.style.setProperty(
                "--wrong-ans-counter",
                "var(--gray-2)"
            );
            document.documentElement.style.setProperty(
                "--wrong-ans-container",
                "var(--gray-3)"
            );
            document.documentElement.style.setProperty(
                "--edit-name-container",
                "var(--gray-3)"
            );
            document.documentElement.style.setProperty(
                "--button-bg",
                "var(--gray-3)"
            );
        } else {
            //Light Mode
            document.documentElement.style.setProperty("--bg", "white");
            document.documentElement.style.setProperty("--nav-bg", "white");
            document.documentElement.style.setProperty(
                "--container-bg",
                "white"
            );
            document.documentElement.style.setProperty(
                "--text-color-before-hover",
                "rgb(94, 92, 92)"
            );
            document.documentElement.style.setProperty(
                "--text-color-after-hover",
                "black"
            );
            document.documentElement.style.setProperty(
                "--nav-user-name-color",
                "black"
            );
            document.documentElement.style.setProperty(
                "--drop-down-bg",
                "white"
            );
            document.documentElement.style.setProperty(
                "--quiz-nav-bg",
                "white"
            );
            document.documentElement.style.setProperty("--text-color", "black");
            document.documentElement.style.setProperty("--goBack-bg", "white");
            document.documentElement.style.setProperty(
                "--wrong-ans-counter",
                "white"
            );
            document.documentElement.style.setProperty(
                "--wrong-ans-container",
                "white"
            );
            document.documentElement.style.setProperty(
                "--edit-name-container",
                "white"
            );
            document.documentElement.style.setProperty("--button-bg", "white");
        }
    }, [user?.isDarkMode]);

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
                                    src={
                                        user.profileImage?.imageUrl
                                            ? user.profileImage.imageUrl
                                            : "/images/defaultImage.webp"
                                    }
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
            <div
                onClick={() => {
                    setUser((prevData) => ({
                        ...prevData,
                        isDarkMode: !prevData.isDarkMode,
                    }));
                    setColorMode(!colorMode);
                }}
                className="dropDown-option"
            >
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

import { showPracticeMenuG, userData } from "@/jotaiStorage";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Settings from "@/components/Settings";
import Style from "@/styles/Home.module.css";
import { darkMode, lightMode } from "../colorModes";

export default function Home() {
    const goBackContainerRef = useRef(null);
    const cartoonCarRef = useRef(null);
    const cartoonContainerRef = useRef(null);
    const tireRef = useRef(null);
    const goBackMainMenuRef = useRef(null);

    const [user, setUser] = useAtom(userData);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [colorMode, setColorMode] = useState(false);
    const [afterPracticeAnimation, setAfterPracticeAnimation] = useState(false);
    const [showPracticeMenu, setShowPracticeMenu] = useAtom(showPracticeMenuG);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }

        document
            .querySelector(".outer-main-container")
            .addEventListener("click", () => {
                setTimeout(() => {
                    setShowDropDown(false);
                }, 10);
            });
    }, []);

    useEffect(() => {
        let distance = 1;
        let totalDistance = cartoonContainerRef.current.offsetWidth;
        const carTimer = setInterval(() => {
            if (distance > totalDistance) {
                distance = -cartoonCarRef.current.offsetWidth; // Reset position instantly
            }
            if (cartoonCarRef.current)
                cartoonCarRef.current.style.transform = `translateX(${distance}px)`;
            distance += 1;
        }, 10);

        return () => clearInterval(carTimer);
    }, []);

    useEffect(() => {
        if (colorMode)
            Cookies.set("user", JSON.stringify(user), { expires: 7 });
    }, [colorMode]);

    useEffect(() => {
        user?.isDarkMode ? darkMode() : lightMode();
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
                <div
                    ref={cartoonContainerRef}
                    className="cartoon-car-container"
                >
                    <img
                        ref={cartoonCarRef}
                        className={Style.cartoonCar}
                        src="/images/design/cartoonCar.gif"
                        loading="eager"
                    />
                </div>
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
                                    loading="eager"
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
                {!colorMode ? <span>Dark Mode</span> : <span>Light Mode</span>}
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

    const renderMenu = () => {
        const mainMenu = [
            { name: "Traffic Signs", dataType: "signData" },
            { name: "Rules of Road", dataType: "rorData" },
            { name: "Full Test", dataType: "FullTest" },
        ];

        const practiceMenu = [
            {
                name: "Test Information",
                dataType: "testInfo",
            },
            {
                name: "Traffic Signs",
                dataType: "signData",
            },
            {
                name: "Rules of Road",
                dataType: "rorData",
            },
        ];

        const menu = showPracticeMenu ? practiceMenu : mainMenu;

        return (
            <>
                <div className="heading-container">Canadian Driving Test</div>
                {menu.map((item, index) => (
                    <div
                        key={index}
                        className={`option-container ${
                            afterPracticeAnimation ? "slideToLeft" : ""
                        }`}
                    >
                        <Link
                            className={`link ${
                                showPracticeMenu ? "slideRight" : ""
                            }`}
                            href={{
                                pathname: showPracticeMenu
                                    ? "/Practice"
                                    : "/Quiz",
                                query: { dataType: item.dataType },
                            }}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
                {!showPracticeMenu && (
                    <div
                        onClick={doLeftAnimation}
                        className={`option-container link ${
                            afterPracticeAnimation ? "slideToLeft" : ""
                        }`}
                    >
                        Revision
                    </div>
                )}
                {showPracticeMenu && (
                    <div
                        ref={goBackMainMenuRef}
                        onClick={doRightAnimation}
                        className="go-back-to-main-menu"
                    >
                        Back
                    </div>
                )}
            </>
        );
    };

    const doLeftAnimation = () => {
        const options = document.querySelectorAll(".option-container");
        options.forEach((option) => {
            option.classList.add("slideLeft");
        });
        tireRef.current.classList.add(Style.tireGoBottomLeft);
        setTimeout(() => {
            options.forEach((option) => {
                option.classList.remove("slideLeft");
            });
            tireRef.current.classList.remove(Style.tireGoBottomLeft);
            setShowPracticeMenu(true);
            setTimeout(() => {
                const options = document.querySelectorAll(".link");
                options.forEach((option) => {
                    option.classList.remove("slideRight");
                });
            }, 1000);
        }, 600);
    };
    const doRightAnimation = () => {
        const options = document.querySelectorAll(".option-container");
        options.forEach((option) => {
            option.classList.add(Style.slideToLeft);
        });
        tireRef.current.classList.add(Style.tireGoBottomRight);
        goBackMainMenuRef.current.classList.add("fadeOut");
        setTimeout(() => {
            options.forEach((option) => {
                option.classList.remove(Style.slideToLeft);
            });
            tireRef.current.classList.remove(Style.tireGoBottomRight);
            setShowPracticeMenu(false);
            setAfterPracticeAnimation(true);
            setTimeout(() => {
                setAfterPracticeAnimation(false);
            }, 1000);
        }, 1000);
    };

    return (
        <>
            {renderNavBar()}
            <div className="outer-main-container">
                {showDropDown && renderDropDown()}
                <div className="main-container">
                    <img
                        ref={tireRef}
                        className={
                            showPracticeMenu
                                ? `${Style.designTirePractice}`
                                : showSetting
                                ? `${Style.designTireSetting}`
                                : `${Style.designTire}`
                        }
                        src="/images/design/tire.png"
                        loading="eager"
                    />
                    {!showSetting ? renderMenu() : <Settings />}
                </div>
            </div>
        </>
    );
}

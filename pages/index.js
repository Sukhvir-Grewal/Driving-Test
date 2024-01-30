import { userData } from "@/jotaiStorage";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Settings from "@/components/Settings";
import Style from "@/styles/Home.module.css";
import { darkMode, lightMode } from "./colorModes";

export default function Home() {
    const goBackContainerRef = useRef(null);
    const cartoonCarRef = useRef(null);
    const cartoonContainerRef = useRef(null);
    const menuOptionRef = Array.from({ length: 3 }, () => useRef());
    const tireRef = useRef(null);
    const goBackMainMenuRef = useRef(null);

    const [user, setUser] = useAtom(userData);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const [colorMode, setColorMode] = useState(false);
    const [showPracticeMenu, setShowPracticeMenu] = useState(false);
    const [afterPracticeAnimation, setAfterPracticeAnimation] = useState(false);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
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

    const renderMenu = () => {
        const MenuData = {
            name: ["Traffic Signs", "Rules of Road", "Full Test"],
            dataType: ["signData", "rorData", "FullTest"],
        };
        const PracticeMenuData = {
            name: ["Traffic Signs", "Rules of Road"],
            dataType: ["signData", "rorData"],
            pathname: ["/signData", "/rorData"],
        };
        return (
            <>
                <div className="heading-container">Canadian Driving Test</div>
                {!showPracticeMenu ? (
                    <>
                        {Array.from({ length: 3 }, (_, index) => (
                            <div
                                key={index}
                                ref={menuOptionRef[index]}
                                className={
                                    afterPracticeAnimation
                                        ? "option-container slideToLeft"
                                        : "option-container"
                                }
                            >
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/Quiz",
                                        query: {
                                            dataType: MenuData.dataType[index],
                                        },
                                    }}
                                >
                                    {MenuData.name[index]}
                                </Link>
                            </div>
                        ))}

                        <div
                            onClick={() => doLeftAnimation()}
                            className={
                                afterPracticeAnimation
                                    ? "option-container link slideToLeft"
                                    : "option-container link"
                            }
                        >
                            Practice
                        </div>
                    </>
                ) : (
                    <>
                        {Array.from({ length: 2 }, (_, index) => (
                            <div key={index} className="option-container">
                                <Link
                                    className="link slideRight"
                                    href={{
                                        pathname: "/practice",
                                        query: {
                                            dataType:
                                                PracticeMenuData.dataType[
                                                    index
                                                ],
                                        },
                                    }}
                                >
                                    {PracticeMenuData.name[index]}
                                </Link>
                            </div>
                        ))}
                        <div
                            ref={goBackMainMenuRef}
                            onClick={() => doRightAnimation()}
                            className="go-back-to-main-menu"
                        >
                            Back
                        </div>
                    </>
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
                    />
                    {!showSetting ? renderMenu() : <Settings />}
                </div>
            </div>
        </>
    );
}

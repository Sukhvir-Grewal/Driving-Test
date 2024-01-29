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
        let distance = 1;
        let totalDistance = cartoonContainerRef.current.offsetWidth 
        console.log(totalDistance)
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
                <div ref={cartoonContainerRef} className="cartoon-car-container">
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
                    <img
                        className={
                            showSetting
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

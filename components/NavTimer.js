import { useEffect, useRef, useState } from "react";
import Style from "@/styles/Home.module.css";
import { useRouter } from "next/router";

export default function NavTimer({ setResultData, setIsTryingToGoBack }) {
    const router = useRouter();

    const timeTickRef = useRef(null);
    const runningTimeoutRef = useRef(null);
    const goBackContainerRef = useRef(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        runningTimeoutRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(runningTimeoutRef.current);
    }, []);

    useEffect(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;

        if (timeTickRef.current) {
            timeTickRef.current.innerHTML = formattedTime;
        }

        setResultData((prevData) => ({
            ...prevData,
            time: {
                minutes: minutes,
                seconds: seconds,
            },
        }));
    }, [time]);

    const handleClickForGoBack = () => {
        // router.push("/");
        setIsTryingToGoBack(true)
    };

    return (
        <>
            <div className={Style.quizNavContainer}>
                <div
                    onClick={handleClickForGoBack}
                    ref={goBackContainerRef}
                    className={Style.goBackContainer}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div className={Style.timeMainContainer}>
                    <div
                        ref={timeTickRef}
                        className={Style.timeContainer}
                    ></div>
                    <div className={Style.clockContainer}>
                        <i className="fa-solid fa-clock"></i>
                    </div>
                </div>
            </div>
        </>
    );
}

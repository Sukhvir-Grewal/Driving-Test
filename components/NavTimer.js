import { useEffect, useRef, useState } from "react";
import Style from "@/styles/Home.module.css";

export default function NavTimer({ setResultData }) {
    const timeTickRef = useRef(null);
    const runningTimeoutRef = useRef(null);
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

    return (
        <>
            <div className={Style.quizNavContainer}>
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

import TestInfo from "@/components/TestInfo";
import { rorData } from "@/storage/rorData";
import { signData } from "@/storage/signsData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { darkMode, lightMode } from "./colorModes";
import { useAtom } from "jotai";
import { userData } from "@/jotaiStorage";
import Cookies from "js-cookie";

export default function Practice() {
    const router = useRouter();

    const queryType = router.query.dataType;
    const [dataType, setDataType] = useState([]);
    const [user, setUser] = useAtom(userData);

    useEffect(() => {
        const fetchData = async () => {
            const queryType = router.query.dataType;
            if (queryType === "signData") {
                setDataType([...signData]);
            } else {
                setDataType([...rorData]);
            }
        };

        fetchData();
    }, [router.query.dataType]);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
        console.log(user?.isDarkMode);
        user?.isDarkMode ? darkMode() : lightMode();
    }, [user?.isDarkMode]);

    const renderPracticeComponent = () => {
        if (queryType === "testInfo") return <TestInfo />;
        else
            return (
                <>
                    <div className="practice-outer-main-container">
                        {renderSignData()}
                    </div>
                </>
            );
    };

    const renderHeading = () => {
        switch (queryType) {
            case "testInfo":
                return "Information on the Knowledge Test";
            case "signData":
                return "Traffic Signs";
            case "rorData":
                return "Rules of Road";
            default:
                break;
        }
    };

    const renderSignData = () => {
        return dataType.map((data, _) => (
            <>
                <div className="practice-main-container">
                    <div className="practice-counter-container">{data.id}</div>

                    <div className="practice-image-main-container">
                        <div className="practice-image-container">
                            <img
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                                src={data.imageUrl}
                            />
                        </div>
                    </div>

                    <div className="practice-option-container">
                        {queryType === "rorData" && (
                            <div className="rorPractice-question-container">
                                {data.question}
                            </div>
                        )}
                        {data.options.map((option, index) => (
                            <>
                                <div
                                    className={
                                        data.correctAns === index + 1
                                            ? "practice-option bg-green"
                                            : "practice-option"
                                    }
                                >
                                    <div className="practice-counter ">
                                        {index + 1}.
                                    </div>
                                    {option}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </>
        ));
    };

    return (
        <>
            <div className="practice-nav-bar">
                <i
                    onClick={() => router.push("/")}
                    className="fa-solid fa-chevron-left practice-go-back"
                ></i>
                <div className="practice-heading">{renderHeading()}</div>
            </div>
            {renderPracticeComponent()}
        </>
    );
}

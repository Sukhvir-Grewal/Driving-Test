import { userData } from "@/jotaiStorage";
import { rorData } from "@/storage/rorData";
import { signData } from "@/storage/signsData";
import { useContext, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function Results({ resultData, data }) {
    const router = useRouter();

    const goBackRef = useRef(null);
    const [user, setUser] = useAtom(userData);

    const RED_COLOR = "rgb(255, 0, 0)";
    const GREEN_COLOR = "rgb(27, 148, 27)";

    const totalWrongAnswers = resultData.storedWrongAnswers.length;
    const finalResult = totalWrongAnswers > 4 ? "FAIL" : "PASS";

    useEffect(() => {
        const updateResults = async () => {
            try {
                const result = await axios.put("/api/updateResults", {
                    isPass: finalResult === "PASS",
                    username: user?.username,
                });
                if (result.status === 200) {
                    setUser((prevData) => ({
                        ...prevData,
                        totalQuizTaken: result.data.totalQuizTaken,
                        totalQuizPassed: result.data.totalQuizPassed,
                        totalQuizFailed: result.data.totalQuizFailed,
                    }));
                    console.log("Result updated successfully:", result.data);
                }
            } catch (error) {
                console.error("Error updating result:", error);
            }
        };

        updateResults();
    }, []);

    useEffect(() => {
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
    }, [user]);

    const getBackgroundColor = (index, optionIndex) => {
        const storedWrongAnswer = resultData.storedWrongAnswers[index];
        const correctOptionIndex =
            data[storedWrongAnswer.question].correctAns - 1;

        if (storedWrongAnswer.wrongAnswerIndex === optionIndex)
            return RED_COLOR;
        if (optionIndex === correctOptionIndex) return GREEN_COLOR;

        return ""; // Default background color (no match)
    };

    const renderWrongAnswers = () => {
        return resultData.storedWrongAnswers.map((_, index) => (
            <div key={index} className="wrong-ans-container">
                <div className="wrong-ans-counter">{index + 1}</div>
                {resultData.resultDataType[index] === "signData"
                    ? renderSign(index)
                    : renderQuestion(index)}
                <div className="wrong-ans-option-main-container">
                    {renderOptions(index)}
                </div>
            </div>
        ));
    };

    const renderSign = (index) => (
        <div className="wrong-ans-image-main-container">
            <div className="wrong-ans-image-container">
                <img
                    className="sign-image"
                    src={getImageURL(index)}
                    alt="Sign Image"
                />
            </div>
        </div>
    );
    const renderQuestion = (index) => (
        <div className="wrong-ans-question-container">
            {getQuestionText(index)}
        </div>
    );

    const renderOptions = (index) => {
        return Array.from({ length: 4 }, (_, optionIndex) => (
            <div
                style={{
                    backgroundColor: getBackgroundColor(index, optionIndex),
                }}
                className="wrong-ans-option-container"
                key={optionIndex}
            >
                {resultData.resultDataType[index] === "signData"
                    ? signData[resultData.storedWrongAnswers[index].question]
                          .options[optionIndex]
                    : rorData[resultData.storedWrongAnswers[index].question]
                          .options[optionIndex]}
            </div>
        ));
    };

    const getImageURL = (index) =>
        signData[resultData.storedWrongAnswers[index].question].imageUrl;

    const getQuestionText = (index) =>
        rorData[resultData.storedWrongAnswers[index].question].question;

    const handleClickForGoBack = () => {
        router.push("/");
    };

    return (
        <>
            <div className="result-outer-main-container">
                <div className="result-main-container">
                    <div
                        onClick={handleClickForGoBack}
                        ref={goBackRef}
                        className="result-go-back-container"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                    {/* first part */}
                    <div className="heading-container">
                        <div className="heading">Results</div>
                    </div>

                    {/* Result data */}
                    <div className="results-main-container">
                        <div className="result-name">Time</div>
                        <div className="result">
                            {resultData.time.minutes}mins{" "}
                            {resultData.time.seconds}sec
                        </div>
                    </div>
                    <div className="results-main-container">
                        <div className="result-name">Correct Ans</div>
                        <div className="result">
                            {resultData.totalQuestions - totalWrongAnswers < 0
                                ? 0
                                : resultData.totalQuestions - totalWrongAnswers}
                        </div>
                    </div>
                    <div className="results-main-container">
                        <div className="result-name">Wrong Ans</div>
                        <div className="result">{totalWrongAnswers}</div>
                    </div>
                    <div className="results-main-container">
                        <div className="result-name">OverAll</div>
                        <div className="result">{finalResult}</div>
                    </div>

                    {/* Second part */}
                    <div className="heading-container">
                        <div className="heading">Recheck</div>
                    </div>

                    <div className="wrong-ans-main-container">
                        {renderWrongAnswers()}
                    </div>
                </div>
            </div>
        </>
    );
}

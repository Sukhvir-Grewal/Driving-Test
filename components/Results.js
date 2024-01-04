import { useEffect, useRef } from "react";
import { signData } from "@/storage/signsData";

export default function Results({ resultData }) {
    const totalWrongAnswers = resultData.storedWrongAnswers.length;
    useEffect(() => {
        console.log(resultData);
        console.log(resultData.storedWrongAnswers);
    }, []);

    const getBackgroundColor = (index, optionIndex) => {
        const storedWrongAnswer = resultData.storedWrongAnswers[index];
        const correctOptionIndex = signData[storedWrongAnswer.question].correctAns - 1;
    
        if (storedWrongAnswer.wrongAnswerIndex === optionIndex) return "rgb(255, 0, 0)"; // Red
        if (optionIndex === correctOptionIndex) return "rgb(27, 148, 27)"; // Green
    
        return ""; // Default background color (no match)
    };
    

    const renderWrongAnswers = () => {
        return resultData.storedWrongAnswers.map((_, index) => (
            <div key={index} className="wrong-ans-container">
                <div className="wrong-ans-image-main-container">
                    <div className="wrong-ans-image-container">
                        <img
                            className="sign-image"
                            src={signData[resultData.storedWrongAnswers[index].question].imageUrl}
                            alt="Sign Image"
                        />
                    </div>
                </div>
                <div className="wrong-ans-option-main-container">
                    {renderOptions(index)}
                </div>
            </div>
        ));
    };
    

    const renderOptions = (index) => {
        return Array.from({ length: 4 }, (_, optionIndex) => (
            <div
                style={{ backgroundColor: getBackgroundColor(index, optionIndex) }}
                className="wrong-ans-option-container"
                key={optionIndex}
            >
                {signData[resultData.storedWrongAnswers[index].question].options[optionIndex]}
            </div>
        ));
    };
    
    return (
        <>
            <div className="result-outer-main-container">
                <div className="result-main-container">
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
                            {resultData.totalQuestions - totalWrongAnswers}
                        </div>
                    </div>
                    <div className="results-main-container">
                        <div className="result-name">Wrong Ans</div>
                        <div className="result">{totalWrongAnswers}</div>
                    </div>
                    <div className="results-main-container">
                        <div className="result-name">OverAll</div>
                        <div className="result">
                            {totalWrongAnswers > 4 ? "FAIL" : "PASS"}
                        </div>
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

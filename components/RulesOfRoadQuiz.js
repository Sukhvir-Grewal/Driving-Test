import { useEffect, useRef, useState } from "react";
import NavTimer from "./NavTimer";
import { rorData } from "@/storage/rorData";

export default function RulesOfRoadQuiz() {
    const MAX_QUESTIONS = 123;
    const [index, setIndex] = useState(60);
    const [isIntervalPaused, setIsIntervalPaused] = useState(false);

    const questionCountForTop = useRef();
    const confirmContainerRef = useRef();

    const optionContainerRef = Array.from({ length: 4 }, () => useRef());

    const [selectedOption, setSelectedOption] = useState(null);
    const [confirmDisplay, setConfirmDisplay] = useState(false);
    // const [currentOptionSet, setCurrentOptionSet] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    const [resultData, setResultData] = useState({
        time: { minutes: 0, seconds: 0 },
        totalQuestions: MAX_QUESTIONS,
        storedWrongAnswers: [],
    });

    // useEffect(() => {
    //     let intervalId;

    //     if (!isIntervalPaused) {
    //         intervalId = setInterval(() => {
    //             setIndex((prevIndex) => (prevIndex + 1) % MAX_QUESTIONS);
    //         }, 1000);
    //     }

    //     // Clear the interval on component unmount to prevent memory leaks
    //     return () => clearInterval(intervalId);
    // }, [isIntervalPaused]);

    useEffect(() => {
        confirmContainerRef.current.style.visibility = confirmDisplay
            ? "visible"
            : "hidden";
    }, [confirmDisplay]);

    const handleImageClick = () => {
        setIsIntervalPaused((prevPaused) => !prevPaused); // Toggle pause/resume
    };

    const renderOptions = () => {
        return Array.from({ length: 4 }, (_, optionIndex) => (
            <div
                key={optionIndex}
                ref={optionContainerRef[optionIndex]}
                onClick={() => handleOptionClick(optionIndex)}
                className="option-main-container"
            >
                <div className="option-count">{optionIndex + 1}</div>
                <div className="option">{rorData[index].options[optionIndex]}</div>
            </div>
        ));
    };

    const handleOptionClick = (index) => {
        if (selectedOption !== null) {
            optionContainerRef[selectedOption].current.style.backgroundColor =
                "";
        }

        if (selectedOption === index) {
            setSelectedOption(null);
            setConfirmDisplay(false);
        } else {
            setConfirmDisplay(true);
            setSelectedOption(index);
            setCurrentAnswer(index + 1);
            optionContainerRef[index].current.style.backgroundColor =
                "rgb(27, 148, 27)";
        }
    };

    const checkAnswer = () => {
        const correctAnswerIndex = rorData[currentOptionSet].correctAns;

        // Check if the selected answer is correct
        if (currentAnswer === correctAnswerIndex) {
            optionContainerRef[
                currentAnswer - 1
            ].current.style.backgroundColor = "rgb(27, 148, 27)";
        } else {
            // Set the selected option to red
            optionContainerRef[
                currentAnswer - 1
            ].current.style.backgroundColor = "rgb(255, 0, 0)";
            // Set the correct answer to green
            optionContainerRef[
                correctAnswerIndex - 1
            ].current.style.backgroundColor = "rgb(27, 148, 27)";

            const newWrongAnswer = {
                question: currentOptionSet,
                wrongAnswerIndex: currentAnswer - 1,
            };

            setResultData((prevData) => ({
                ...prevData,
                storedWrongAnswers: [
                    ...prevData.storedWrongAnswers,
                    newWrongAnswer,
                ],
            }));
        }
    };

    return (
        <>
            <NavTimer setResultData={setResultData} />

            <div className="quiz-outer-main-container">
                <div className="quiz-main-container">
                    <div className="question-count-container">
                        <div
                            ref={questionCountForTop}
                            className="question-count"
                        >
                            {index + 1}/{MAX_QUESTIONS}
                        </div>
                    </div>

                    <div className="ror-question-main-container">
                        <div className="ror-question-sign-container">
                            {/* Image will go here! */}
                            <img
                             onClick={handleImageClick}
                                className="sign-image"
                                src={rorData[index].imageUrl}
                            ></img>
                        </div>
                        <div className="ror-question-container">
                        {rorData[index].question}
                        </div>
                    </div>
                    {renderOptions()}
                    <div className="confirm-main-container">
                            <div
                                ref={confirmContainerRef}
                                onClick={() => {
                                    checkAnswer();
                                    if (questionCount !== MAX_QUESTIONS) {
                                        timeoutRef.current = setTimeout(() => {
                                            getRandomQuestion();
                                        }, 1000);
                                        doTheAnimation();
                                    } else setShowResults(true);
                                }}
                                className="confirm-container"
                            >
                                <i className="fa-solid fa-check"></i>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

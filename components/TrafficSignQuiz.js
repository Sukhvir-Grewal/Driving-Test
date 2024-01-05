import Results from "@/components/Results";
import { signData } from "@/storage/signsData";
import { useEffect, useRef, useState } from "react";
import NavTimer from "./NavTimer";

export default function TrafficSignQuiz() {
    const MAX_QUESTIONS = 5;

    const confirmContainerRef = useRef(null);
    const signContainerRef = useRef(null);
    const currentSignRef = useRef(null);
    const questionCountForTop = useRef(null);
    let timeoutRef = useRef(null);
    let runningTimeoutRef = useRef(null);

    const optionContainerRef = Array.from({ length: 4 }, () => useRef());
    const [confirmDisplay, setConfirmDisplay] = useState(false);
    const [currentOptionSet, setCurrentOptionSet] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    const [questionCount, setQuestionCount] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [tractIndex, setTractIndex] = useState([]);

    const [resultData, setResultData] = useState({
        time: { minutes: 0, seconds: 0 },
        totalQuestions: MAX_QUESTIONS,
        storedWrongAnswers: [],
    });

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(runningTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (!initialized) {
            getRandomQuestion();
            doInitialAnimation();
        }
        setInitialized(true);
    }, [initialized]);

    useEffect(() => {
        confirmContainerRef.current.style.visibility = confirmDisplay
            ? "visible"
            : "hidden";
    }, [confirmDisplay]);

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

    const renderOptions = () => {
        return Array.from({ length: 4 }, (_, index) => (
            <div
                key={index}
                ref={optionContainerRef[index]}
                onClick={() => handleOptionClick(index)}
                className="option-main-container"
            >
                <div className="option-count">{index + 1}</div>
                <div className="option">
                    {signData[currentOptionSet].options[index]}
                </div>
            </div>
        ));
    };

    const doInitialAnimation = () => {
        const onAnimationEnd = () => {
            // Remove event listeners to avoid potential issues
            signContainerRef.current.removeEventListener(
                "animationend",
                onAnimationEnd
            );
            confirmContainerRef.current.removeEventListener(
                "animationend",
                onAnimationEnd
            );
            optionContainerRef.forEach((option) => {
                option.current.removeEventListener(
                    "animationend",
                    onAnimationEnd
                );
            });

            if (
                signContainerRef.current &&
                confirmContainerRef.current &&
                optionContainerRef.every((option) => option.current)
            ) {
                // Remove animation classes
                signContainerRef.current.classList.remove("fadeIn");
                confirmContainerRef.current.classList.remove("fadeIn");
                optionContainerRef.forEach((option) => {
                    option.current.classList.remove("fadeIn");
                });
            }
        };

        if (
            signContainerRef.current &&
            confirmContainerRef.current &&
            optionContainerRef.every((option) => option.current)
        ) {
            // Apply animation classes
            signContainerRef.current.classList.add("fadeIn");
            confirmContainerRef.current.classList.add("fadeIn");
            optionContainerRef.forEach((option) => {
                option.current.classList.add("fadeIn");
            });

            // Add event listeners to handle animation end
            signContainerRef.current.addEventListener(
                "animationend",
                onAnimationEnd
            );
            confirmContainerRef.current.addEventListener(
                "animationend",
                onAnimationEnd
            );
            optionContainerRef.forEach((option) => {
                option.current.addEventListener("animationend", onAnimationEnd);
            });
        }
    };

    const doTheAnimation = () => {
        confirmContainerRef.current.style.backgroundColor = "rgb(27, 148, 27)";
        signContainerRef.current.classList.add("slideLeft");
        optionContainerRef.forEach((option) => {
            option.current.classList.add("slideLeft");
        });
        confirmContainerRef.current.classList.add("slideLeft");

        timeoutRef.current = setTimeout(() => {
            confirmContainerRef.current.style.backgroundColor = "transparent";
            signContainerRef.current.classList.remove("slideLeft");
            optionContainerRef.forEach((option) => {
                option.current.classList.remove("slideLeft");
            });
            confirmContainerRef.current.classList.remove("slideLeft");

            slideRightAnimation();
        }, 1000);
    };

    const slideRightAnimation = () => {
        signContainerRef.current.classList.add("slideRight");
        optionContainerRef.forEach((option) => {
            option.current.classList.add("slideRight");
        });
        confirmContainerRef.current.classList.add("slideRight");

        setConfirmDisplay(false);
        optionContainerRef.forEach((option) => {
            option.current.style.backgroundColor = "";
        });
        setQuestionCount((prev) => {
            var nextNumber = prev + 1;
            questionCountForTop.current.innerHTML = `${nextNumber}/${MAX_QUESTIONS}`;
            return nextNumber;
        });

        timeoutRef.current = setTimeout(() => {
            signContainerRef.current.classList.remove("slideRight");
            optionContainerRef.forEach((option) => {
                option.current.classList.remove("slideRight");
            });
            confirmContainerRef.current.classList.remove("slideRight");
        }, 1000);
    };

    const checkAnswer = () => {
        const correctAnswerIndex = signData[currentOptionSet].correctAns;

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

    const continueQuiz = () => {
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
                                1/{MAX_QUESTIONS}
                            </div>
                        </div>
                        <div
                            ref={signContainerRef}
                            className="sign-main-container"
                        >
                            <div className="sign-container">
                                {/* Image will go here! */}
                                <img
                                    ref={currentSignRef}
                                    className="sign-image"
                                    src=""
                                ></img>
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
    };

    const getRandomQuestion = () => {
        var randomOptionSet;
        while (true) {
            randomOptionSet = Math.floor(Math.random() * 77);
            if (tractIndex.includes(randomOptionSet)) continue;
            else {
                const newData = [...tractIndex, randomOptionSet];
                setTractIndex(newData);
                break;
            }
        }

        if (currentSignRef.current)
            currentSignRef.current.src = signData[randomOptionSet].imageUrl;
        setCurrentOptionSet(randomOptionSet);
    };

    return (
        <>
            {showResults ? (
                <>
                    <Results resultData={resultData} />
                </>
            ) : (
                continueQuiz()
            )}
        </>
    );
}

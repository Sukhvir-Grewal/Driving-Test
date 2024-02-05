import NavTimer from "@/components/NavTimer";
import Results from "@/components/Results";
import { rorData } from "@/storage/rorData";
import { signData } from "@/storage/signsData";
import { useRouter } from "next/router";
import { createRef, useEffect, useRef, useState } from "react";
import { darkMode, lightMode } from "../colorModes";
import { useAtom } from "jotai";
import { userData } from "@/jotaiStorage";
import Cookies from "js-cookie";
export default function Quiz() {
    const router = useRouter();
    const dataType = router.query.dataType;
    const MAX_QUESTIONS = dataType === "FullTest" ? 40 : 20;
    const RED_COLOR = "rgb(255, 0, 0)";
    const GREEN_COLOR = "rgb(27, 148, 27)";

    const [data, setData] = useState(
        dataType === "signData" ? [...signData] : [...rorData]
    );

    const confirmContainerRef = useRef(null);
    const signContainerRef = useRef(null);
    const currentSignRef = useRef(null);
    const questionCountForTop = useRef(null);
    const currentQuestionRef = useRef(null);
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
    const [trackIndexForBoth, setTrackIndexForBoth] = useState([]);
    const [trackIndexForSignQuiz, setTrackIndexForSignQuiz] = useState([]);
    const [trackIndexForRorQuiz, setTrackIndexForRorQuiz] = useState([]);
    const [isTryingToGoBack, setIsTryingToGoBack] = useState(false);

    const [isSignDiv, setIsSignDiv] = useState(
        dataType === "signData" ? true : false
    );

    const [resultData, setResultData] = useState({
        resultDataType: [],
        time: { minutes: 0, seconds: 0 },
        totalQuestions: MAX_QUESTIONS,
        storedWrongAnswers: [],
    });

    const [resultDataType, setResultDataType] = useState(null);
    const [user, setUser] = useAtom(userData);

    useEffect(() => {
        if (!isSignDiv && currentQuestionRef.current) {
            // Set the ror question when isSignDiv becomes false
            if (currentQuestionRef.current) {
                if (!initialized) {
                    currentQuestionRef.current.classList.add("fadeIn");
                    setTimeout(() => {
                        if (currentQuestionRef.current)
                            currentQuestionRef.current.classList.remove(
                                "fadeIn"
                            );
                    }, 1000);
                } else {
                    currentQuestionRef.current.classList.add("slideRight");
                    setTimeout(() => {
                        if (currentQuestionRef.current)
                            currentQuestionRef.current.classList.remove(
                                "slideRight"
                            );
                    }, 1000);
                }
            }
            currentQuestionRef.current.innerHTML =
                rorData[currentOptionSet].question;
        }
        if (currentSignRef.current) {
            currentSignRef.current.src = data[currentOptionSet]?.imageUrl;
        }
    }, [isSignDiv, currentQuestionRef, currentOptionSet]);

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

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setUser(userData);
        }
        console.log(user?.isDarkMode);
        user?.isDarkMode ? darkMode() : lightMode();
    }, [user?.isDarkMode]);

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
                GREEN_COLOR;
        }
    };

    const renderQuestions = () => {
        return (
            <>
                <div className="question-count-container">
                    <div ref={questionCountForTop} className="question-count">
                        1/{MAX_QUESTIONS}
                    </div>
                </div>
                {isSignDiv ? (
                    <div ref={signContainerRef} className="sign-main-container">
                        <div className="sign-container">
                            {/* Image will go here! */}
                            <img
                                ref={currentSignRef}
                                className="sign-image"
                                src=""
                            ></img>
                        </div>
                    </div>
                ) : (
                    <div
                        ref={signContainerRef}
                        className="ror-question-main-container"
                    >
                        <div className="ror-question-sign-container">
                            {/* Image will go here! */}
                            <img
                                ref={currentSignRef}
                                className="sign-image"
                                src=""
                            ></img>
                        </div>
                        <div
                            ref={currentQuestionRef}
                            className="ror-question-container"
                        ></div>
                    </div>
                )}
            </>
        );
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
                    {data[currentOptionSet].options[index]}
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
        confirmContainerRef.current.style.backgroundColor = GREEN_COLOR;
        currentSignRef.current.classList.add("slideLeft");
        optionContainerRef.forEach((option) => {
            option.current.classList.add("slideLeft");
        });
        confirmContainerRef.current.classList.add("slideLeft");

        if (currentQuestionRef.current)
            currentQuestionRef.current.classList.add("slideLeft");

        timeoutRef.current = setTimeout(() => {
            // confirmContainerRef.current.style.backgroundColor = "transparent";
            currentSignRef.current.classList.remove("slideLeft");
            optionContainerRef.forEach((option) => {
                option.current.classList.remove("slideLeft");
            });
            confirmContainerRef.current.classList.remove("slideLeft");
            if (currentQuestionRef.current)
                currentQuestionRef.current.classList.remove("slideLeft");

            slideRightAnimation();
        }, 1000);
    };

    const slideRightAnimation = () => {
        currentSignRef.current.classList.add("slideRight");
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
            if (currentSignRef.current)
                currentSignRef.current.classList.remove("slideRight");
            optionContainerRef.forEach((option) => {
                if (option.current)
                    option.current.classList.remove("slideRight");
            });
            if (confirmContainerRef.current)
                confirmContainerRef.current.classList.remove("slideRight");
        }, 1000);
    };

    const checkAnswer = () => {
        const correctAnswerIndex = data[currentOptionSet].correctAns;

        // Check if the selected answer is correct
        if (currentAnswer === correctAnswerIndex)
            highlightOption(currentAnswer - 1, GREEN_COLOR);
        else {
            //Wrong answer
            highlightOption(currentAnswer - 1, RED_COLOR);
            // Right One
            highlightOption(correctAnswerIndex - 1, GREEN_COLOR);

            const newWrongAnswer = {
                question: currentOptionSet,
                wrongAnswerIndex: currentAnswer - 1,
            };

            setResultData((prevData) => ({
                ...prevData,
                resultDataType: [...prevData.resultDataType, resultDataType],
                storedWrongAnswers: [
                    ...prevData.storedWrongAnswers,
                    newWrongAnswer,
                ],
            }));
        }
    };

    const highlightOption = (index, color) => {
        optionContainerRef[index].current.style.backgroundColor = color;
    };

    const continueQuiz = () => {
        return (
            <>
                <NavTimer
                    setIsTryingToGoBack={setIsTryingToGoBack}
                    setResultData={setResultData}
                />

                <div className="quiz-outer-main-container">
                    {isTryingToGoBack && renderGoBack()}

                    <div className="quiz-main-container">
                        {renderQuestions()}
                        {renderOptions()}
                        <div className="confirm-main-container">
                            <div
                                ref={confirmContainerRef}
                                onClick={() => handleConfirm()}
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

    const handleConfirm = () => {
        checkAnswer();
        if (questionCount !== MAX_QUESTIONS) {
            timeoutRef.current = setTimeout(() => {
                getRandomQuestion();
            }, 1000);
            doTheAnimation();
        } else setShowResults(true);
    };

    // This function is doing what it suppose to even thought it looks quite ugly
    // Purpose :: It's main responsibility is to get a unique number based on Quiz type
    //      1. It will check the Quiz type if it's just a Sign Quiz or Rules of Road quiz
    //         the logic is quite simple just get a random number when is not repeated
    //      2. But when we have Full Test we are suppose to get a random quiz type first,
    //         After that we need to check if the index which is tracking how many questions
    //         we have already asked in this case we are suppose to get 20 unique questions for
    //         Sign as well we  as Rules of Road
    const getRandomQuestion = () => {
        let randomOptionSet;

        const getUniqueNumber = (tracker, setTracker, limit) => {
            var randomNumber;
            while (true) {
                randomNumber = Math.floor(Math.random() * limit);
                if (tracker.includes(randomNumber)) continue;
                else {
                    const newData = [...tracker, randomNumber];
                    setTracker(newData);
                    break;
                }
            }
            return randomNumber;
        };

        if (dataType !== "FullTest") {
            setResultDataType(dataType);
            randomOptionSet = getUniqueNumber(
                trackIndexForBoth,
                setTrackIndexForBoth,
                data.length
            );
        } else {
            const randomDataType = getZeroOne();

            if (randomDataType === 0) {
                const newData = [...signData];
                setResultDataType("signData");

                if (trackIndexForSignQuiz.length < 10)
                    randomOptionSet = getUniqueNumber(
                        trackIndexForSignQuiz,
                        setTrackIndexForSignQuiz,
                        newData.length
                    );
                else
                    randomOptionSet = getUniqueNumber(
                        trackIndexForRorQuiz,
                        setTrackIndexForRorQuiz,
                        newData.length
                    );

                setIsSignDiv(true);
                setData(newData);
            } else {
                const newData = [...rorData];
                setResultDataType("rorData");

                if (trackIndexForRorQuiz.length < 10)
                    randomOptionSet = getUniqueNumber(
                        trackIndexForRorQuiz,
                        setTrackIndexForRorQuiz,
                        newData.length
                    );
                else
                    randomOptionSet = getUniqueNumber(
                        trackIndexForSignQuiz,
                        setTrackIndexForSignQuiz,
                        newData.length
                    );
                setIsSignDiv(false);
                setData(newData);
            }
        }
        if (currentSignRef.current) {
            currentSignRef.current.src = data[randomOptionSet]?.imageUrl;
        }
        if (currentQuestionRef.current) {
            currentQuestionRef.current.innerHTML =
                data[randomOptionSet].question;
        }
        setCurrentOptionSet(randomOptionSet);
    };

    const getZeroOne = () => {
        return Math.floor(Math.random() * 2);
    };

    const renderGoBack = () => (
        <div className="quiz-backDrop">
            <div className="confirm-go-back-main-container">
                <div className="go-back-warning">
                    Going back will erase your quiz progress. Are you sure?
                </div>
                <div className="go-back-options-container">
                    <div
                        onClick={() => setIsTryingToGoBack(false)}
                        className="go-back-option-cancel"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div
                        onClick={() => {
                            router.push("/");
                        }}
                        className="go-back-option-confirm"
                    >
                        <i className="fa-solid fa-check"></i>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {showResults ? (
                <>
                    <Results
                        resultData={resultData}
                        data={data}
                        dataType={dataType}
                        trackIndexForRorQuiz={trackIndexForRorQuiz}
                        trackIndexForSignQuiz={trackIndexForRorQuiz}
                    />
                </>
            ) : (
                continueQuiz()
            )}
        </>
    );
}
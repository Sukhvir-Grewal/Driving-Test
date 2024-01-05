import { useRef, useState } from "react";
import NavTimer from "./NavTimer";

export default function RulesOfRoadQuiz() {
    const MAX_QUESTIONS = 5;

    const questionCountForTop = useRef();
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

    const renderOptions = () => {
        return Array.from({ length: 4 }, (_, index) => (
            <div
                key={index}
                ref={optionContainerRef[index]}
                onClick={() => handleOptionClick(index)}
                className="option-main-container"
            >
                <div className="option-count">{index + 1}</div>
                <div className="option">Test 121</div>
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

                    <div className="ror-question-main-container">
                        <div className="ror-question-sign-container">
                            {/* Image will go here! */}
                            <img
                                className="sign-image"
                                src="/images/ror/13.jpg"
                            ></img>
                        </div>
                        <div className="ror-question-container">
                            As a leive on ediver. must must be accompaned by
                            class g or higher licnesed dfifvder, who has the
                            foloownig dfinv expericne moth than
                        </div>
                    </div>
                    {renderOptions()}
                </div>
            </div>
        </>
    );
}

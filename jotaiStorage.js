import { atom } from "jotai";

export const userData = atom(null);
export const colorMode = atom(false);
export const showPracticeMenuG = atom(false);

export const drivingTestInfo = {
    visionTest:
        "Before taking your knowledge test, you will be required to take a vision test. You will be asked to look into a machine and a read out the numbers that appear as well as the location of a flashing red light (Left or right side)",
    TypesOfQuestions: [
        "The knowledge test consists of a 40 multiple choice question: 20 Questions on traffic signs and 20 Questions on journal driving knowledge, in total, you may not score more than four incorrect answers in each section in order to pass the test.",
        "If you fail the knowledge test you may rewrite the test after three working days. There is an additional fee of $10 for each test you write",
    ],
    computerizedSystem: [
        "Read each multiple choice question carefully and choose the best answer out of four choices available. If you decide dead answer #4 Is the best answer, press '4' And when you are confident of your answer press 'OK', to confirm. If the answer you entered is correct, It will continue to the next question, otherwise it will let you know you have answered it incorrectly",
        "Example: If the best answer is 4... press '4' and then 'OK'",
    ],
};

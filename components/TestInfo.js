import { drivingTestInfo } from "@/jotaiStorage";
import { useRouter } from "next/router";

export default function TestInfo() {
    const router = useRouter();

    return (
        <>
            <div className="scrollable-container">
                <div className="driving-test-store-container">
                    <img
                        className="driving-test-store"
                        src="/images/drivingTestStore.jpg"
                    />
                </div>

                <div className="data-heading-container">Vision Test</div>
                <div className="data-container">
                    {drivingTestInfo.visionTest}
                </div>

                <div className="data-heading-container">Types of Questions</div>
                <div className="data-container">
                    {drivingTestInfo.TypesOfQuestions[0]}
                </div>
                <div className="data-container">
                    {drivingTestInfo.TypesOfQuestions[1]}
                </div>

                <div className="data-heading-container">
                    Using the computerized System
                </div>
                <ul>
                    <div className="data-container">
                        <li>{drivingTestInfo.computerizedSystem[0]}</li>
                    </div>
                    <div className="data-container">
                        <li>{drivingTestInfo.computerizedSystem[1]}</li>
                    </div>
                </ul>
            </div>
        </>
    );
}

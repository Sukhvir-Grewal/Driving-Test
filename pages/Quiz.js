import RulesOfRoadQuiz from "@/components/RulesOfRoadQuiz";
import TrafficSignQuiz from "@/components/TrafficSignQuiz";
import { useRouter } from "next/router";

export default function Quiz() {
    const router = useRouter();
    const { QuizType } = router.query;

    const renderQuiz = () => {
        switch (QuizType) {
            case "trafficSigns":
                return <TrafficSignQuiz />;
            case "rulesOfRoad":
                return <RulesOfRoadQuiz />;
            default:
                break;
        }
    };

    return <>{renderQuiz()}</>;
}

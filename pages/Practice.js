import TestInfo from "@/components/TestInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Practice() {
    const router = useRouter();

    const queryType = router.query.dataType;

    useEffect(() => {
        console.log(queryType);
    }, []);

    const renderPracticeComponent = ()=>{
        if(queryType === "testInfo")
        return <TestInfo />
        
       
        
    }

    return (
        <>
            <div className="scrollable-container">
                <div className="practice-nav-bar">
                    <i
                        onClick={() => router.push("/")}
                        className="fa-solid fa-chevron-left practice-go-back"
                    ></i>
                    <div className="practice-heading">
                        Information on the Knowledge Test
                    </div>
                </div>
                {renderPracticeComponent()}
            </div>
        </>
    );
}

import "@/styles/globals.css";
import "@/styles/Dashboard.css";
import "@/styles/Register.css";
import "@/styles/Login.css";
import "@/styles/Quiz.css";
import "@/styles/Results.css";
import "@/styles/Settings.css";
import "@/styles/TestInfo.css";
import "@/styles/Practice.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const pushToRoot = () => {
            // Check if it's the client side
            if (typeof window !== "undefined") {
                router.push("/");
            }
        };

        pushToRoot();
    }, []);

    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

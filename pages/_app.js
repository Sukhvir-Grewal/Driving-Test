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
import Head from "next/head";
export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                {/* Add other head elements here */}
            </Head>
            <Component {...pageProps} />
        </>
    );
}

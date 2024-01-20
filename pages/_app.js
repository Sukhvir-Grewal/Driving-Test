import "@/styles/globals.css";
import "@/styles/Dashboard.css";
import "@/styles/Register.css";
import "@/styles/Login.css";
import "@/styles/Quiz.css";
import "@/styles/Results.css";

import "@fortawesome/fontawesome-svg-core/styles.css";


export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

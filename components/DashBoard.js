import Link from "next/link";

export default function DashBoard() {
    return (
        <>
            <div className="nav-container">
                <div className="login-register-container">
                    <Link className="link" href="/Login">
                        Login
                    </Link>
                    &nbsp;|&nbsp;
                    <Link className="link" href="/Register">
                        Register
                    </Link>
                </div>
            </div>
            <div className="outer-main-container">
                <div className="main-container">
                    <div className="heading-container">Driving Test</div>
                    <div className="option-container">Traffic Signs</div>
                    <div className="option-container">Rules of Road</div>
                    <div className="option-container">Both</div>
                    <div></div>
                </div>
            </div>
        </>
    );
}

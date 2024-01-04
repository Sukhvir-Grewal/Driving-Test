import Link from "next/link";

export default function DashBoard({ setView }) {
    return (
        <>
            <div className="nav-container">
                <div className="login-register-container">
                    <Link className="link" href="/Login">
                        Login
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link className="link" href="/Register">
                        Register
                    </Link>
                </div>
            </div>
            <div className="outer-main-container">
                <div className="main-container">
                    <div className="heading-container">Driving Test</div>
                    <div className="option-container">
                        <Link className="link" href="/Quiz">
                            Traffic Signs
                        </Link>
                    </div>
                    <div className="option-container">
                        <Link className="link" href="/Quiz">
                            Rules of Road
                        </Link>
                    </div>
                    <div className="option-container">
                        <Link className="link" href="/Quiz">
                            Both
                        </Link>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}

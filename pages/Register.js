export default function Register() {
    return (
        <>
            <div className="outer-register-main-container">
                <div className="register-main-container">
                    <div className="register-container">Register New User</div>
                    <div className="all-options">
                        <div className="outer-username-option">
                            <div className="username">username</div>
                            <input className="username-container"></input>
                        </div>
                        <div className="outer-password-option">
                            <div className="password">password</div>
                            <input className="password-container"></input>
                        </div>
                        <div className="outer-confirmPassword-option">
                            <div className="confirmPassword">confirm Password</div>
                            <input className="confirmPassword-container"></input>
                        </div>
                        <div className="register-option">Register</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Register() {
    return (
        <>
            <div className="outer-register-main-container">
                <div className="register-main-container">
                    <div className="register-container">Register New User</div>
                    <div className="all-options">
                        <div className="outer-username-option">
                            <div className="register-username">username</div>
                            <div className="input-username-container">
                                <input className="input-username"></input>
                            </div>
                        </div>
                        <div className="outer-password-option">
                            <div className="register-password">password</div>
                            <div className="input-password-container">
                                <input className="input-password"></input>
                            </div>
                        </div>
                        <div className="outer-confirmPassword-option">
                            <div className="register-confirmPassword">
                                confirm
                            </div>
                            <div className="input-confirmPassword-container">
                                <input className="input-confirmPassword"></input>
                            </div>
                        </div>
                        <div className="register-button-container">
                            <button className="register-button">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

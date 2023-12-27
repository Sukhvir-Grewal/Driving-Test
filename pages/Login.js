export default function Register() {
    return (
        <>
            <div className="outer-login-main-container">
                <div className="login-main-container">
                    <div className="login-container">Welcome Back</div>
                    <div className="username-main-container">
                        <div className="login-username-container">username</div>
                        <div className="input-username-main-container">
                            <input className="input-boxes"></input>
                        </div>
                    </div>
                    <div className="password-main-container">
                        <div className="login-password-container">password</div>
                        <div className="input-password-main-container">
                            <input className="input-boxes"></input>
                        </div>
                    </div>
                    <div className="login-button-container">
                        <button className="login-button">login</button>
                    </div>
                </div>
            </div>
        </>
    );
}

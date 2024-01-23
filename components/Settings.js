import { userData } from "@/jotaiStorage";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export default function Settings() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useAtom(userData);

    const nameRef = useRef(null);

    useEffect(() => {
        if (nameRef.current) nameRef.current.value = user.username;
    }, [isEditing]);

    const submitForm = async () => {
        try {
            const response = await axios.put("/api/auth/update", {
                newName: nameRef.current.value,
                old: user.username
            });
            if (response.status === 200) {
                setUser((prevData)=>({
                    ...prevData,
                    username: nameRef.current.value
                }))
                Cookies.set("user", JSON.stringify(user), { expires: 7 });
                console.log("name updated");
            }
        } catch (error) {
            console.error("Error during Updating:", error);
        }
    };

    const renderEditName = () => (
        <div className="backdrop">
            <div className="edit-name-main-container">
                <div className="change-name-heading">
                    What should I call You
                </div>
                <input
                    type="text"
                    autoFocus
                    ref={nameRef}
                    className="edit-name"
                />

                <div className="confirm-cancel-container">
                    <i
                        onClick={() => setIsEditing(false)}
                        class="fa-solid fa-xmark cancel"
                    ></i>
                    <button
                        onClick={() => submitForm()}
                        className="confirm-name-btn"
                    >
                        <i class="fa-solid fa-check confirm"></i>
                    </button>
                </div>
            </div>
        </div>
    );
    return (
        <>
            {isEditing && renderEditName()}
            <div className="setting-image-main-container">
                <div className="setting-image-container">
                    <img
                        className="setting-user-image"
                        src="/images/defaultImage.webp"
                    ></img>
                </div>
            </div>

            <div className="setting-user-name-main-container">
                <div className="setting-user-name-container">
                    <div className="image-edit-button">
                        <i
                            onClick={() => setIsEditing(true)}
                            class="fa-solid fa-pen"
                        ></i>
                    </div>
                    <div className="setting-user-name">{user.username}</div>
                </div>
                <div className="line-break"></div>
            </div>
            <div className="stats-main-container">
                <div className="status-container">
                    <div className="stat">
                        <div className="data-type">Total Quiz Taken</div>
                        <div className="data">0</div>
                    </div>
                    <div className="stat">
                        <div className="data-type">Total Quizzes Passed</div>
                        <div className="data">0</div>
                    </div>
                    <div className="stat">
                        <div className="data-type">Total Quizzes Failed</div>
                        <div className="data">0</div>
                    </div>
                    <div className="stat">
                        <div className="data-type">Pass Percentage</div>
                        <div className="data">0%</div>
                    </div>
                </div>
            </div>
        </>
    );
}

import { userData } from "@/jotaiStorage";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export default function Settings() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useAtom(userData);

    const nameRef = useRef(null);
    const profileImageRef = useRef(null);
    const inputFileRef = useRef(null);

    useEffect(() => {
        if (nameRef.current) nameRef.current.value = user.username;
    }, [isEditing]);

    useEffect(() => {
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
    }, [user]);

    const submitForm = async () => {
        try {
            const response = await axios.put("/api/auth/update", {
                newName: nameRef.current.value,
                old: user.username,
            });
            if (response.status === 200) {
                setUser((prevData) => ({
                    ...prevData,
                    username: nameRef.current.value,
                }));
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
                        className="fa-solid fa-xmark cancel"
                    ></i>
                    <button
                        onClick={() => submitForm()}
                        className="confirm-name-btn"
                    >
                        <i className="fa-solid fa-check confirm"></i>
                    </button>
                </div>
            </div>
        </div>
    );

    const handleImageUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("username", user.username);

            const cloudinaryResponse = await axios.post(
                "/api/uploadImage",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (cloudinaryResponse.status === 200) {
                setUser((prevData) => ({
                    ...prevData,
                    profileImage: {
                        publicID: cloudinaryResponse.data.publicID,
                        imageUrl: cloudinaryResponse.data.imageUrl,
                    },
                }));
                console.log("Photo uploaded on cloud");
            }
        } catch (error) {
            console.error("Error during image upload:", error);
        }
    };

    return (
        <>
            {isEditing && renderEditName()}
            <div className="setting-image-main-container">
                <div className="setting-image-container">
                    <label htmlFor="input-file">
                        <img
                            ref={profileImageRef}
                            className="setting-user-image"
                            src={
                                user.profileImage?.imageUrl
                                    ? user.profileImage.imageUrl
                                    : "/images/defaultImage.webp"
                            }
                        ></img>
                    </label>
                </div>
                <input
                    onChange={(e) => {
                        profileImageRef.current.src = URL.createObjectURL(
                            e.target.files[0]
                        );
                        handleImageUpload(e.target.files[0]);
                    }}
                    ref={inputFileRef}
                    id="input-file"
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                />
            </div>

            <div className="setting-user-name-main-container">
                <div className="setting-user-name-container">
                    <div className="image-edit-button">
                        <i
                            onClick={() => setIsEditing(true)}
                            className="fa-solid fa-pen"
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
                        <div className="data">{user?.totalQuizTaken || 0}</div>
                    </div>
                    <div className="stat">
                        <div className="data-type">Total Quizzes Passed</div>
                        <div className="data">{user?.totalQuizPassed || 0}</div>
                    </div>
                    <div className="stat">
                        <div className="data-type">Total Quizzes Failed</div>
                        <div className="data">{user?.totalQuizFailed || 0}</div>
                    </div>
                    <div className="stat">
                        <div className="data-type">Pass Percentage</div>
                        <div className="data">
                            {(user.totalQuizPassed / user.totalQuizTaken) * 100}
                            %
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

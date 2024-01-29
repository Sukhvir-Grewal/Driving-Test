export const darkMode = ()=>{
    document.documentElement.style.setProperty("--bg", "black");
    document.documentElement.style.setProperty(
        "--nav-bg",
        "var(--gray-3)"
    );
    document.documentElement.style.setProperty(
        "--container-bg",
        "var(--gray-2)"
    );
    document.documentElement.style.setProperty(
        "--text-color-before-hover",
        "rgb(207, 207, 207)"
    );
    document.documentElement.style.setProperty(
        "--text-color-after-hover",
        "white"
    );
    document.documentElement.style.setProperty(
        "--nav-user-name-color",
        "white"
    );
    document.documentElement.style.setProperty(
        "--drop-down-bg",
        "var(--gray-3)"
    );
    document.documentElement.style.setProperty(
        "--quiz-nav-bg",
        "var(--gray-3)"
    );
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty(
        "--goBack-bg",
        "var(--gray-2)"
    );
    document.documentElement.style.setProperty(
        "--wrong-ans-counter",
        "var(--gray-2)"
    );
    document.documentElement.style.setProperty(
        "--wrong-ans-container",
        "var(--gray-3)"
    );
    document.documentElement.style.setProperty(
        "--edit-name-container",
        "var(--gray-3)"
    );
    document.documentElement.style.setProperty(
        "--button-bg",
        "var(--gray-3)"
    );
    document.documentElement.style.setProperty("--name-container-bg", "var(--gray-3)");

}

export const lightMode= ()=>{
    document.documentElement.style.setProperty("--bg", "white");
    document.documentElement.style.setProperty("--nav-bg", "white");
    document.documentElement.style.setProperty(
        "--container-bg",
        "white"
    );
    document.documentElement.style.setProperty(
        "--text-color-before-hover",
        "rgb(94, 92, 92)"
    );
    document.documentElement.style.setProperty(
        "--text-color-after-hover",
        "black"
    );
    document.documentElement.style.setProperty(
        "--nav-user-name-color",
        "black"
    );
    document.documentElement.style.setProperty(
        "--drop-down-bg",
        "white"
    );
    document.documentElement.style.setProperty(
        "--quiz-nav-bg",
        "white"
    );
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--goBack-bg", "white");
    document.documentElement.style.setProperty(
        "--wrong-ans-counter",
        "white"
    );
    document.documentElement.style.setProperty(
        "--wrong-ans-container",
        "white"
    );
    document.documentElement.style.setProperty(
        "--edit-name-container",
        "white"
    );
    document.documentElement.style.setProperty("--button-bg", "white");
    document.documentElement.style.setProperty("--name-container-bg", "white");
}
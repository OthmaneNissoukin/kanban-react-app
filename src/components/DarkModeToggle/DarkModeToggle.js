import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import "./DarkModeToggle.css";

export default function DarkModeToggle({ width, height, darkMode, setDarkMode }) {
    function handleDarkMode() {
        setDarkMode(!darkMode);
        window.localStorage.setItem("kanban_dark_mode", JSON.stringify(!darkMode));
    }
    return (
        <div
            className={`toggler ${darkMode ? "dark" : "light"}`}
            style={{ width: `${width}px`, height: `${height}px`, backgroundColor: "#333", borderRadius: "20px" }}
            onClick={handleDarkMode}
        >
            <span>
                <BsFillSunFill />
            </span>
            <span>
                <BsFillMoonStarsFill />
            </span>
        </div>
    );
}

import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import "./DarkModeToggle.css";
import { useContext } from "react";
import { KanbanContext } from "../../App";

export default function DarkModeToggle({ width, height }) {
    const { darkMode, setDarkMode } = useContext(KanbanContext);
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

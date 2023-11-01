import { useContext } from "react";
import { KanbanContext } from "../../App";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Header.css";
export default function Header() {
    const { darkMode, showAppNav, setShowAppNav } = useContext(KanbanContext);
    return (
        <header className={`${darkMode ? "dark" : "light"}`}>
            <button onClick={() => setShowAppNav(!showAppNav)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h2>Kanban</h2>
            <DarkModeToggle width={80} height={35} />
        </header>
    );
}

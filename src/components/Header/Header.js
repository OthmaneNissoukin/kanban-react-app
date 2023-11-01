import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Header.css";
export default function Header({ darkMode, setDarkMode }) {
    return (
        <header className={`${darkMode ? "dark" : "light"}`}>
            <h2>Kanban</h2>
            <DarkModeToggle setDarkMode={setDarkMode} darkMode={darkMode} width={80} height={35} />
        </header>
    );
}

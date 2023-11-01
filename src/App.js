import { useState, createContext, useContext } from "react";
import AppNav from "./components/AppNav/AppNav";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";
import Form from "./components/Form/Form";

const KanbanContext = createContext();

function App() {
    const [tasks, setTasks] = useState(() =>
        window.localStorage.getItem("kanban_todos") ? JSON.parse(window.localStorage.getItem("kanban_todos")) : []
    );
    const [activeProject, setActiveProject] = useState(null);
    const [newTask, setNewTask] = useState(false);
    const [toCategory, setToCategory] = useState(null);
    const [toUpdate, setToUpdate] = useState(null);
    const [createNewProject, setCreateNewProject] = useState(false);

    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [labelInput, setLabelInput] = useState("#00e01a");
    const [showAppNav, setShowAppNav] = useState(true);
    const [darkMode, setDarkMode] = useState(() =>
        window.localStorage.getItem("kanban_dark_mode")
            ? JSON.parse(window.localStorage.getItem("kanban_dark_mode"))
            : false
    );

    return (
        <KanbanContext.Provider
            value={{
                activeProject,
                setActiveProject,
                tasks,
                setTasks,
                setNewTask,
                createNewProject,
                setCreateNewProject,
                darkMode,
                toCategory,
                setToCategory,
                toUpdate,
                setToUpdate,
                titleInput,
                setTitleInput,
                descriptionInput,
                setDescriptionInput,
                labelInput,
                setLabelInput,
                showAppNav,
                setShowAppNav,
            }}
        >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className={`main ${darkMode ? "dark" : "light"}`}>
                <AppNav />
                {newTask ? <Form /> : activeProject ? <Tasks /> : <HomeScreen />}
            </main>
        </KanbanContext.Provider>
    );
}

function HomeScreen() {
    const { setCreateNewProject } = useContext(KanbanContext);
    return (
        <section className="home">
            <p>Start creating your new project 🚀!</p>
            <button onClick={() => setCreateNewProject(true)}>Create New</button>
        </section>
    );
}

export default App;
export { KanbanContext };

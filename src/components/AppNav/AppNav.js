import { useState, useContext, useEffect, useRef } from "react";
import { BsPlus } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import "./AppNav.css";
import { KanbanContext } from "../../App.js";
export default function AppNav() {
    const [projectTitleInput, setProjectTitleInput] = useState("");
    const nav = useRef(null);
    console.log(nav);
    const {
        setActiveProject,
        setNewTask,
        setCreateNewProject,
        tasks,
        setTasks,
        darkMode,
        createNewProject,
        activeProject,
        showAppNav,
    } = useContext(KanbanContext);

    useEffect(() => {
        nav.current.classList.toggle("show");
    }, [showAppNav]);

    function handleClick(projectName) {
        setActiveProject(projectName);
        setCreateNewProject(false);
        setNewTask(false);
    }

    function handleNewProject() {
        setCreateNewProject(true);
    }

    function handleCreate() {
        if (!projectTitleInput) return;

        if (tasks.filter((item) => item.projectName.toLowerCase() === projectTitleInput.toLowerCase()).length) return;

        // TODO: Show alert notification when trying to insert an existing name
        const newProject = {
            projectName: projectTitleInput,
            projectTasks: [],
        };

        setTasks([newProject, ...tasks]);

        window.localStorage.setItem("kanban_todos", JSON.stringify([newProject, ...tasks]));
        setCreateNewProject(false);
        setProjectTitleInput("");
    }

    function handleDeleteProject(projectName) {
        const projectsUpdate = tasks.filter((item) => item.projectName !== projectName);
        setActiveProject(null);
        setTasks(projectsUpdate);
        window.localStorage.setItem("kanban_todos", JSON.stringify(projectsUpdate));
    }

    function handleCancel() {
        setProjectTitleInput("");
        setCreateNewProject(false);
    }

    return (
        <nav ref={nav} className={`app-nav show ${darkMode ? "dark" : "light"}`}>
            {createNewProject ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={projectTitleInput}
                        onChange={(e) => setProjectTitleInput(e.target.value)}
                    />
                    <button type="button" className="create" onClick={handleCreate}>
                        Create
                    </button>
                    <button type="button" className="cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            ) : (
                <button onClick={handleNewProject} className="create">
                    New Project <span>{<BsPlus />}</span>
                </button>
            )}

            <ul>
                {tasks.map((project, index) => (
                    <li className={`${activeProject === project.projectName ? "active" : ""}`} key={index}>
                        <span onClick={() => handleClick(project.projectName)}>{project.projectName}</span>
                        <button className="delete-icon" onClick={() => handleDeleteProject(project.projectName)}>
                            <BsTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

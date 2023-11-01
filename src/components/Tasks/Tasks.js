import { useContext } from "react";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsDashCircle } from "react-icons/bs";
import { KanbanContext } from "../../App";
import "./Tasks.css";

// TODO: Create dynamic cols numbers and set dynamic bg-colors according to the label color

export default function Tasks() {
    const { tasks, activeProject, darkMode } = useContext(KanbanContext);

    const activeTasks = tasks.filter((item) => item.projectName === activeProject).at(0)["projectTasks"];

    // NOTE: Keep This For Later Use
    // const columns = activeTasks
    //     .map((item) => item.status)
    //     .filter((title) => title.length)
    //     .reduce((curr, next) => (curr.includes(next) ? curr : [...curr, next]), []);

    // TODO: Adjust the object of tasks to hold columns names so that we can dynamically show it in the dashboard
    // TODO: Because trying to get cols names from existed data will lead to bring mis-cols or nothing at all in case of no task
    const columns = ["Todo", "In Progress", "Verify", "Done"];

    return (
        <section className={`tasks-section ${darkMode ? "dark" : "light"}`}>
            <h2>{activeProject}</h2>
            <div className="tasks">
                {/* TODO: Use reduce method to create dynamic cols */}
                {columns.map((item, index) => (
                    <Column key={index} title={item} projectTasks={activeTasks} />
                ))}
            </div>
        </section>
    );
}

function Column({ projectTasks, title }) {
    const {
        tasks,
        setToCategory,
        setNewTask,
        setTasks,
        activeProject,
        setTitleInput,
        setDescriptionInput,
        setToUpdate,
        darkMode,
        setLabelInput,
    } = useContext(KanbanContext);

    const columnTasks = projectTasks.filter((item) => item.status.toLowerCase() === title.toLowerCase());

    function handleNewTask(category) {
        setToCategory(category);
        setNewTask(true);
    }

    function handleDelete(id) {
        const tasksList = tasks.map((item) =>
            item.projectName === activeProject
                ? { ...item, projectTasks: item.projectTasks.filter((element) => element.id !== id) }
                : item
        );
        setTasks(tasksList);

        window.localStorage.setItem("kanban_todos", JSON.stringify(tasksList));
    }

    function handleUpdate(id, title, description, label) {
        setTitleInput(title);
        setDescriptionInput(description);
        setLabelInput(label);
        setNewTask(true);
        setToUpdate(id);
    }

    // Handle Drop Event
    function handleDrop(ev, state) {
        const taskId = ev.dataTransfer.getData("taskId");
        setTasks(
            tasks.map((item) =>
                item.projectName === activeProject
                    ? {
                          ...item,
                          projectTasks: item.projectTasks.map((element) =>
                              element.id === Number(taskId) ? { ...element, status: state } : element
                          ),
                      }
                    : item
            )
        );
    }

    return (
        <div onDragOver={(e) => e.preventDefault()} onDrop={(ev) => handleDrop(ev, title)}>
            <h3>
                <span>
                    {title} ({columnTasks.length})
                </span>
                <button className="new-task" onClick={() => handleNewTask(title)}>
                    <BsFillPlusCircleFill />
                </button>
            </h3>

            {columnTasks.map((item) => (
                <article
                    key={item.id}
                    className={`${darkMode ? "dark" : "light"}`}
                    onDragStart={(e) => e.dataTransfer.setData("taskId", item.id)}
                    draggable
                >
                    <h4>
                        {item.title} <span style={{ backgroundColor: item.label }}></span>
                    </h4>
                    <p>{item.description}</p>

                    <aside>
                        <button
                            className="next-icon"
                            onClick={() => handleUpdate(item.id, item.title, item.description, item.label)}
                        >
                            {<BsPencilSquare />}
                        </button>
                        <button className="next-icon" onClick={() => handleDelete(item.id)}>
                            {<BsDashCircle />}
                        </button>
                    </aside>
                </article>
            ))}
        </div>
    );
}

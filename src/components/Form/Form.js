import { useContext } from "react";
import { KanbanContext } from "../../App";

import "./Form.css";

export default function Form() {
    const {
        titleInput,
        setTitleInput,
        descriptionInput,
        setDescriptionInput,
        tasks,
        setTasks,
        activeProject,
        toCategory,
        setToCategory,
        setNewTask,
        toUpdate,
        setToUpdate,
        darkMode,
        labelInput,
        setLabelInput,
    } = useContext(KanbanContext);

    function handleCreateTask() {
        if (!(titleInput && descriptionInput)) return;

        const newTask = {
            id: Math.trunc(Math.random() * 1000),
            title: titleInput,
            description: descriptionInput,
            label: labelInput,
            status: toCategory,
        };

        const tasksLists = tasks.map((item) => {
            return item.projectName === activeProject
                ? { ...item, projectTasks: [...item.projectTasks, newTask] }
                : item;
        });

        setTasks(tasksLists);

        window.localStorage.setItem("kanban_todos", JSON.stringify(tasksLists));

        setTitleInput("");
        setDescriptionInput("");
        setLabelInput("");
        setNewTask(false);
        setToCategory(null);
    }

    function handleCancel() {
        setTitleInput("");
        setDescriptionInput("");
        setLabelInput("#00e01a");
        setNewTask(false);
        setToCategory(null);
    }

    function handleEdit() {
        const tasksUpdatedList = tasks.map((item) =>
            item.projectName === activeProject
                ? {
                      ...item,
                      projectTasks: item.projectTasks.map((element) =>
                          element.id === toUpdate
                              ? { ...element, title: titleInput, description: descriptionInput, label: labelInput }
                              : element
                      ),
                  }
                : item
        );
        setTasks(tasksUpdatedList);

        window.localStorage.setItem("kanban_todos", JSON.stringify(tasksUpdatedList));

        setTitleInput("");
        setDescriptionInput("");
        setToUpdate(null);
        setNewTask(false);
    }

    return (
        <form className={`${darkMode ? "dark" : "light"} project-form`} onSubmit={(e) => e.preventDefault()}>
            <h1>{toUpdate ? "Edit" : "Create"} New Project</h1>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    placeholder="e.g: Storage Management"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />
            </div>
            <div>
                <label>Label</label>
                <input type="color" value={labelInput} onChange={(e) => setLabelInput(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    placeholder="e.g: Create design prototype"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    rows={7}
                />
            </div>
            <aside>
                <button type="button" onClick={handleCancel} className="cancel">
                    Cancel
                </button>
                <button type="button" onClick={() => (toUpdate ? handleEdit() : handleCreateTask())} className="save">
                    Save
                </button>
            </aside>
        </form>
    );
}

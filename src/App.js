import React from "react";
import "./App.css";
import { TODO_ACTIONS } from "./constants";
import todoReducer from "./Reducers/TodoReducer";
import SVGIcon from "./components/SVGIcon";

function App() {
  const sideBarRef = React.createRef();
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);
  const titleFieldRef = React.createRef();
  const descriptionFieldRef = React.createRef();
  const [state, dispatch] = React.useReducer(todoReducer, {
    tasks: {},
    currentTask: null,
  });

  const TaskItem = ({ taskId }) => {
    const { tasks } = state;
    return (
      <li>
        <span onClick={() => handleSelection(taskId)}>
          {tasks[taskId]?.title}
        </span>
        <span onClick={() => handleDelete(taskId)}>
          <SVGIcon icon="trash" />
        </span>
      </li>
    );
  };

  const TaskList = ({ tasks }) => {
    const taskIds = Object.keys(tasks);
    return (
      <div className="tasks">
        <ul>
          {taskIds.map((taskId) => {
            return <TaskItem taskId={taskId} />;
          })}
        </ul>
      </div>
    );
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: TODO_ACTIONS.UPDATE_TASK_TITLE,
      payload: {
        [name]: value,
      },
    });
  };

  const handleDescriptionChange = (event) => {
    const { value, name } = event.target;
    dispatch({
      type: TODO_ACTIONS.UPDATE_TASK_DESCRIPTION,
      payload: {
        [name]: value,
      },
    });
  };

  const handleSelection = (taskId) => {
    dispatch({
      type: TODO_ACTIONS.UPDATE_CURRENT_TASK,
      payload: { id: taskId },
    });
  };

  const handleDelete = (taskId) => {
    dispatch({
      type: TODO_ACTIONS.DELETE_TASK,
      payload: {
        id: taskId,
      },
    });
  };

  const toggle = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="App">
      <div className={`container ${isSideBarOpen ? "open" : "close"}`}>
        <aside ref={sideBarRef}>
          {isSideBarOpen && (
            <button type="button" onClick={toggle}>
              <SVGIcon icon="chevron-left" />
            </button>
          )}
          <TaskList tasks={state.tasks} />
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.ADD_TASK })}
          >
            Add Task
          </button>
        </aside>
        <main>
          {!isSideBarOpen && (
            <button type="button" onClick={toggle}>
              <SVGIcon icon="chevron-right" />
            </button>
          )}
          {Object.keys(state.tasks).length > 0 ? (
            <>
              <label htmlFor="title">
                Title
                <input
                  onChange={handleTitleChange}
                  value={state.tasks[state?.currentTask]?.title}
                  ref={titleFieldRef}
                  name="title"
                />
              </label>
              <label htmlFor="description">
                Description
                <input
                  ref={descriptionFieldRef}
                  onChange={handleDescriptionChange}
                  value={state.tasks[state.currentTask].description}
                  name="description"
                />
              </label>
            </>
          ) : (
            "Create a new task"
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

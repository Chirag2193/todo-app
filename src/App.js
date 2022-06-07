import React from "react";
import "./App.css";
import { TODO_ACTIONS } from "./constants";
import todoReducer from "./Reducers/TodoReducer";
import SVGImage from "./assets/feather-sprite.svg";

function App() {
  const sideBarRef = React.createRef();
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);
  const titleFieldRef = React.createRef();
  const descriptionFieldRef = React.createRef();

  const [state, dispatch] = React.useReducer(todoReducer, {
    tasks: {},
    currentTask: null,
  });

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
              <svg class="feather">
                <use href={`${SVGImage}#chevron-left`} />
              </svg>
            </button>
          )}
          <div className="tasks">
            <ul>
              {Object.keys(state.tasks).map((taskId) => {
                return (
                  <li>
                    <span
                      style={{
                        border:
                          state.currentTask === taskId ? "1px solid red" : "",
                      }}
                      onClick={() => handleSelection(taskId)}
                    >
                      {state.tasks[taskId]?.title}
                    </span>
                    <span onClick={() => handleDelete(taskId)}>
                      <svg class="feather">
                        <use href={`${SVGImage}#trash`} />
                      </svg>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
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
              <svg class="feather">
                <use href={`${SVGImage}#chevron-right`} />
              </svg>
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

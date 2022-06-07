import { TODO_ACTIONS, STATUS } from "../constants";
import { v4 as uuidv4 } from "uuid";

export default function todoReducer(state, action) {
  let tasksClone = {};
  switch (action.type) {
    case TODO_ACTIONS.ADD_TASK:
      const uniqueId = uuidv4();
      tasksClone = {
        ...state.tasks,
        [uniqueId]: {
          id: uniqueId,
          title: "New Task",
          description: "New Description",
          status: STATUS.PENDING,
        },
      };

      return {
        tasks: { ...tasksClone },
        currentTask: uniqueId,
      };

    case TODO_ACTIONS.UPDATE_TASK_TITLE:
      tasksClone = { ...state.tasks };
      tasksClone[state.currentTask].title = action.payload.title;
      return {
        tasks: tasksClone,
        currentTask: state.currentTask,
      };

    case TODO_ACTIONS.UPDATE_TASK_DESCRIPTION:
      tasksClone = { ...state.tasks };
      tasksClone[state.currentTask].description = action.payload.description;
      return {
        tasks: tasksClone,
        currentTask: state.currentTask,
      };

    case TODO_ACTIONS.UPDATE_CURRENT_TASK:
      return {
        tasks: state.tasks,
        currentTask: action.payload.id,
      };

    case TODO_ACTIONS.DELETE_TASK:
      tasksClone = { ...state.tasks };
      const taskIds = Object.keys(tasksClone);
      const indexOfTaskToBeDeleted = taskIds.indexOf(action.payload.id);
      let newCurrentTask = null;
      const isTaskToBeDeletedLastItem =
        indexOfTaskToBeDeleted === taskIds.length - 1;
      const isTaskToBeDeletedFirstItem = indexOfTaskToBeDeleted === 0;

      if (isTaskToBeDeletedFirstItem && taskIds.length > 1) {
        newCurrentTask = taskIds[indexOfTaskToBeDeleted + 1];
      }

      if (
        (isTaskToBeDeletedLastItem ||
          (!isTaskToBeDeletedFirstItem && !isTaskToBeDeletedLastItem)) &&
        taskIds.length > 1
      ) {
        newCurrentTask = taskIds[indexOfTaskToBeDeleted - 1];
      }

      delete tasksClone[action.payload.id];

      return {
        tasks: tasksClone,
        currentTask:
          action.payload.id === state.currentTask
            ? newCurrentTask
            : state.currentTask,
      };

    default:
      return state;
  }
}

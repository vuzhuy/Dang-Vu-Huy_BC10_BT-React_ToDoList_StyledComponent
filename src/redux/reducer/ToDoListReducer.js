import { ToDoListDarkTheme } from "../../JSS_StyledComponents/Themes/ToDoListDarkTheme";
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
} from "../types/ToDoListType";
import { arrTheme } from "../../JSS_StyledComponents/Themes/ThemeManager";
// import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "Task-1", done: true },
    { id: "task-2", taskName: "Task-2", done: false },
    { id: "task-3", taskName: "Task-3", done: true },
    { id: "task-4", taskName: "Task-4", done: false },
  ],
  taskEdit: { id: "task-2", taskName: "Task-2", done: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      if (action.newTask.taskName.trim() === "") {
        alert("Task name is required!");
        return { ...state };
      }
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert("task name alrealdy exsts!");
        return { ...state };
      }
      taskListUpdate.push(action.newTask);

      state.taskList = taskListUpdate;

      return { ...state };
    }
    case change_theme: {
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      if (theme) {
        console.log(theme);
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    }
    case done_task: {
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }
      return { ...state, taskList: taskListUpdate };
    }

    case delete_task: {
      let taskListUpdate = [...state.taskList];

      let index =taskListUpdate.findIndex(task=>task.id === action.taskId);
      if(index!==-1){
          taskListUpdate.splice(index,1);
      }
      return { ...state, taskList: taskListUpdate };

    //   Gán lại giá trị cho mảng taskListUpdate = chính nó nhưng filter ko có taskId đó
    //   let taskListUpdate = [...state.taskList];
    //   taskListUpdate = taskListUpdate.filter(
    //     (task) => task.id !== action.taskId
    //   ); 
    //   return { ...state, taskList: taskListUpdate };

    //   Cách 3: return {...state, taskList: state.taskList.filter(task => task.id !== action.taskId) }
    }
    case edit_task: {
      return {...state, taskEdit: action.task}
    }
    default:
      return { ...state };
  }
};

import {
  Action,
  createSlice,
  Dispatch,
  MiddlewareAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { Task } from "../interfaces";
import { db } from "../services/app";

const defaultTasks: Task[] = [
  {
    title: "Tarea 1",
    important: true,
    description: "Hacer el proyecto para aplicaciones de escritorio",
    date: "2023-09-20",
    dir: "Principal",
    completed: true,
    id: "t2",
  },
 
  {
    title: "Tarea 2",
    important: false,
    description: "Taller de infraestructura",
    date: "2023-09-21",
    dir: "Principal",
    completed: false,
    id: "t3",
  },
];


const getSavedDirectories = (): string[] => {
  let dirList: string[] = [];
  if (localStorage.getItem("directories")) {
    dirList = JSON.parse(localStorage.getItem("directories")!);
    const mainDirExists = dirList.some((dir: string) => dir === "Main");
    if (!mainDirExists) {
      dirList.push("Main");
    }
  } else {
    dirList.push("Principales");
  }

  if (localStorage.getItem("tasks")) {
    const savedTasksList = JSON.parse(localStorage.getItem("tasks")!);
    let dirNotSaved: string[] = [];
    savedTasksList.forEach((task: Task) => {
      if (!dirList.includes(task.dir)) {
        if (!dirNotSaved.includes(task.dir)) {
          dirNotSaved.push(task.dir);
        }
      }
    });
    dirList = [...dirList, ...dirNotSaved];
  }
  return dirList;
};

const initialState: {
  tasks: Task[];
  directories: string[];
} = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks")!)
    : defaultTasks,
  directories: getSavedDirectories(),
};


const getProduct = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'task'));
    querySnapshot.forEach((doc: any) => {
      initialState.tasks.push({ ...doc.data(), id: doc.id });
    });
  } catch (error) {
  }
}
getProduct();

const tasksSlice = createSlice({
  name: "tareas",
  initialState: initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<Task>) {
     state.tasks = [action.payload, ...state.tasks];
     
     const createTask = async ()  => {
      try {
        const docRef = await addDoc(collection(db, "task"), action.payload);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
     }

     createTask()

    },
    removeTask(state, action) {
      const newTasksList = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      state.tasks = newTasksList;
    },
    markAsImportant(state, action: PayloadAction<string>) {
      const newTaskFavorited = state.tasks.find(
        (task) => task.id === action.payload
      );
      newTaskFavorited!.important = !newTaskFavorited!.important;
    },
    editTask(state, action: PayloadAction<Task>) {
      const taskId = action.payload.id;

      const newTaskEdited: Task = state.tasks.find(
        (task: Task) => task.id === taskId
      )!;
      const indexTask = state.tasks.indexOf(newTaskEdited);
      state.tasks[indexTask] = action.payload;
    },
    toggleTaskCompleted(state, action: PayloadAction<string>) {
      const taskId = action.payload;

      const currTask = state.tasks.find((task) => task.id === taskId)!;

      currTask.completed = !currTask.completed;
    },
    deleteAllData(state) {
      state.tasks = [];
      state.directories = ["Principal"];
    },
    createDirectory(state, action: PayloadAction<string>) {
      const newDirectory: string = action.payload;
      const directoryAlreadyExists = state.directories.includes(newDirectory);
      if (directoryAlreadyExists) return;
      state.directories = [newDirectory, ...state.directories];
    },
    deleteDirectory(state, action: PayloadAction<string>) {
      const dirName = action.payload;

      state.directories = state.directories.filter((dir) => dir !== dirName);
      state.tasks = state.tasks.filter((task) => task.dir !== dirName);
    },
    editDirectoryName(
      state,
      action: PayloadAction<{ newDirName: string; previousDirName: string }>
    ) {
      const newDirName: string = action.payload.newDirName;
      const previousDirName: string = action.payload.previousDirName;
      const directoryAlreadyExists = state.directories.includes(newDirName);
      if (directoryAlreadyExists) return;

      const dirIndex = state.directories.indexOf(previousDirName);

      state.directories[dirIndex] = newDirName;
      state.tasks.forEach((task) => {
        if (task.dir === previousDirName) {
          task.dir = newDirName;
        }
      });
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
    const nextAction = next(action);
    const actionChangeOnlyDirectories =
      tasksActions.createDirectory.match(action);

    const isADirectoryAction: boolean = action.type
      .toLowerCase()
      .includes("directory");

    if (action.type.startsWith("tasks/") && !actionChangeOnlyDirectories) {
      const tasksList = store.getState().tasks.tasks;
      localStorage.setItem("tasks", JSON.stringify(tasksList));
    }
    if (action.type.startsWith("tasks/") && isADirectoryAction) {
      const dirList = store.getState().tasks.directories;
      localStorage.setItem("directories", JSON.stringify(dirList));
    }

    if (tasksActions.deleteAllData.match(action)) {
      localStorage.removeItem("Tareas");
      localStorage.removeItem("Directorio");
      localStorage.removeItem("darkmode");
    }

    if (tasksActions.removeTask.match(action)) {
      console.log(JSON.parse(localStorage.getItem("tasks")!));
      if (localStorage.getItem("tasks")) {
        const localStorageTasks = JSON.parse(localStorage.getItem("tasks")!);
        if (localStorageTasks.length === 0) {
          localStorage.removeItem("tasks");
        }
      }
    }
    return nextAction;
  };

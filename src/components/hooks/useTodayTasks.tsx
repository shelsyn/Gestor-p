import { useState, useEffect } from "react";
import { Task } from "../../interfaces"; // Se importa el tipo Task desde un módulo de interfaces.
import { useAppSelector } from "../../store/hooks"; // Se importa el hook useAppSelector desde el almacenamiento de la aplicación.

const useTodayTasks = (): Task[] => {
  // Utiliza useAppSelector para obtener las tareas del estado de la aplicación.
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);

  // Obtiene la fecha actual y extrae el año, mes y día.
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // Se suma 1 porque los meses en JavaScript se indexan desde 0.
  const day: number = date.getDate();

  // Formatea la fecha actual en el formato "AAAA-MM-DD".
  const dateTimeFormat = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    // Filtra las tareas que tienen la fecha igual a la fecha actual en dateTimeFormat.
    let filteredTasks: Task[] = tasks.filter(
      (task: Task) => task.date === dateTimeFormat
    );

    // Actualiza el estado todaysTasks con las tareas filtradas.
    setTodaysTasks(filteredTasks);
  }, [dateTimeFormat, tasks]); // El efecto se ejecuta cuando cambia dateTimeFormat o tasks.

  // Devuelve las tareas programadas para el día actual.
  return todaysTasks;
};

export default useTodayTasks;


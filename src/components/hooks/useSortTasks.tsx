import { useState, useEffect } from "react";
import { Task } from "../../interfaces"; // Importa el tipo Task desde un módulo de interfaces.

const useSortTasks = (tasks: Task[]) => {
  const [sortedBy, setSortedBy] = useState<string>(""); // Estado para almacenar el criterio de ordenamiento seleccionado.

  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasks); // Estado para almacenar las tareas ordenadas.

  useEffect(() => {
    // Función para ordenar por fecha (ascendente o descendente).
    const sortByDate = (order: "max-date" | "min-date"): Task[] => {
      const toMilliseconds = (date: string) => Date.parse(date);
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((task1, task2) => {
        const date1 = toMilliseconds(task1.date);
        const date2 = toMilliseconds(task2.date);

        if (date1 < date2) {
          return -1;
        }

        if (date1 > date2) {
          return 1;
        }

        return 0;
      });

      if (order === "min-date") {
        return sorted;
      }

      if (order === "max-date") {
        return sorted.reverse();
      }

      return tasks; // Si el orden no es válido, devuelve las tareas sin cambios.
    };

    // Función para ordenar por estado de completado (completado primero o no completado primero).
    const sortByCompletedStatus = (completed: boolean): Task[] => {
      const tasksCopy = [...tasks];
      const sorted = tasksCopy.sort((task1) => {
        if (task1.completed) {
          return -1;
        }
        return 0;
      });

      if (completed) {
        return sorted;
      }

      if (!completed) {
        return sorted.reverse();
      }

      return tasks; // Si el orden no es válido, devuelve las tareas sin cambios.
    };

    // Verifica el criterio de ordenamiento seleccionado y actualiza las tareas ordenadas en consecuencia.
    if (sortedBy === "min-date" || sortedBy === "max-date") {
      setSortedTasks(sortByDate(sortedBy));
    }
    if (sortedBy === "" || sortedBy === "order-added") {
      setSortedTasks(tasks);
    }
    if (sortedBy === "completed-first") {
      setSortedTasks(sortByCompletedStatus(true));
    }
    if (sortedBy === "uncompleted-first") {
      setSortedTasks(sortByCompletedStatus(false));
    }
  }, [sortedBy, tasks]); // El efecto se ejecuta cuando cambia sortedBy o tasks.

  // Devuelve el criterio de ordenamiento actual, la función para cambiarlo y las tareas ordenadas.
  return { sortedBy, setSortedBy, sortedTasks };
};

export default useSortTasks;

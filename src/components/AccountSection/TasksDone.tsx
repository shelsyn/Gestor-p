import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import useCompletedTasks from "../hooks/useCompletedTasks";
import useTodayTasks from "../hooks/useTodayTasks";

const TasksDone: React.FC = () => {
  // Utiliza custom hooks para obtener las tareas completadas de hoy y todas las tareas.
  const todaysTasks = useTodayTasks();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  // Utiliza otro custom hook para obtener las tareas completadas de hoy y todas las tareas.
  const { tasks: todayTasksDone } = useCompletedTasks({
    tasks: todaysTasks,
    done: true,
  });
  const { tasks: allTasksDone } = useCompletedTasks({
    tasks: tasks,
    done: true,
  });

  // Calcula el porcentaje de tareas completadas de hoy y todas las tareas.
  const percentageTodayTasks =
    (todayTasksDone.length * 100) / todaysTasks.length;
  const percentageAllTasks = (allTasksDone.length * 100) / tasks.length;

  // Obtiene las primeras 3 tareas de hoy para mostrar.
  const todaysTasksToShow = todaysTasks.slice(0, 3);

  // Determina si hay más tareas por mostrar.
  const showMore = todaysTasks.length > todaysTasksToShow.length;

  return (
    <>
      {todaysTasks.length !== 0 && (
        <div className="mt-8">
          <span className="flex justify-between mb-2">
            <span>Tareas hoy</span> {todayTasksDone.length}/
            {todaysTasks.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageTodayTasks + "%" }}></div>
          </div>
        </div>
      )}
      {tasks.length !== 0 && (
        <div className="mt-6">
          <span className="flex justify-between mb-2">
            <span>Todas las tareas</span> {allTasksDone.length}/{tasks.length}
          </span>
          <div className="barProgress">
            <div style={{ width: percentageAllTasks + "%" }}></div>
          </div>
        </div>
      )}

      {todaysTasks.length === 0 && (
        <span className="mt-6 block pt-4 border-t-slate-200 dark:border-t-slate-700/[.3] border-t-2">
          Tareas para hoy
        </span>
      )}

      {todaysTasks.length > 0 && (
        <div className="mt-8">
          <span className="mb-2 block">Tareas actuales</span>
          <ul>
            {todaysTasksToShow.map((task) => (
              <li key={task.id} className="py-2 pl-6 text-slate-200 list-item">
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
          {showMore && (
            <Link to="/today" className="pl-6">
              Mostrar más
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(TasksDone); // Exporta el componente TasksDone como un componente memoizado para mejorar el rendimiento.

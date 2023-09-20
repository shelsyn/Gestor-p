import React from "react";
import useDescriptionTitle from "../hooks/useDescriptionTitle";
import useTodayTasks from "../hooks/useTodayTasks";
import LayoutRoutes from "../Utilities/LayoutRoutes";

const TodaysTasks: React.FC = () => {
  const todaysTasks = useTodayTasks();

  useDescriptionTitle("Tareas actuales", "Tareas actuales");

  return (
    <LayoutRoutes title="Tareas actuales" tasks={todaysTasks}></LayoutRoutes>
  );
};

export default TodaysTasks;

import React from "react";
import LayoutRoutes from "../Utilities/LayoutRoutes";
import { useAppSelector } from "../../store/hooks";
import useDescriptionTitle from "../hooks/useDescriptionTitle";

const Home: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  useDescriptionTitle("Organiza las tareas", "Todas las tareas");
  return <LayoutRoutes title="Todas las tareas" tasks={tasks}></LayoutRoutes>;
};

export default Home;

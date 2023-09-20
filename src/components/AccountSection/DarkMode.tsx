import React, { useEffect, useState } from "react";

const DarkMode: React.FC = () => {
  // Define un estado llamado isCurrentDarkmode para controlar el modo oscuro.
  const [isCurrentDarkmode, setIsCurrentDarkmode] = useState<boolean>(() => {
    // Al inicializar el estado, verifica si el modo oscuro estaba configurado previamente en el almacenamiento local.
    const darkModeWasSet = localStorage.getItem("darkmode");
    if (darkModeWasSet) {
      return true; // Si estaba configurado, establece el modo oscuro como true.
    } else {
      return false; // Si no estaba configurado, establece el modo oscuro como false.
    }
  });

  // Define una función llamada toggleDarkMode para alternar entre los modos claro y oscuro.
  const toggleDarkMode = () => {
    setIsCurrentDarkmode((prevState) => !prevState);
  };

  useEffect(() => {
    // Dentro del useEffect, se ajustan las clases CSS y las propiedades según el modo oscuro actual.

    const html = document.querySelector<HTMLHtmlElement>("html")!;

    if (isCurrentDarkmode) {
      // Si el modo oscuro está habilitado:
      html.classList.add("dark"); // Agrega la clase "dark" al elemento HTML.
      localStorage.setItem("darkmode", "true"); // Almacena "true" en el almacenamiento local para recordar la elección del usuario.
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#0f172a"); // Cambia el color de tema en la barra de navegación, en este caso, a un tono oscuro.
    } else {
      // Si el modo oscuro está deshabilitado:
      html.classList.remove("dark"); // Elimina la clase "dark" del elemento HTML.
      localStorage.removeItem("darkmode"); // Elimina la configuración de modo oscuro del almacenamiento local.
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#e2e8f0"); // Cambia el color de tema en la barra de navegación, en este caso, a un tono claro.
    }
  }, [isCurrentDarkmode]); // Este efecto se ejecuta cuando cambia el valor de isCurrentDarkmode.

  return (
    // Renderiza un botón que permite al usuario cambiar entre los modos claro y oscuro.
    <button
      className="mt-8 text-left flex items-center justify-between"
      onClick={toggleDarkMode}
    >
      <span className="dark:text-slate-200">Modo oscuro</span>
      <div className="w-10 h-5 bg-slate-200 rounded-full px-0.5 dark:bg-slate-900 relative flex items-center dark:justify-end">
        <div className="w-4 h-4 rounded-full bg-pink-400 absolute"></div>
      </div>
    </button>
  );
};

export default React.memo(DarkMode); // Exporta el componente DarkMode como un componente memoizado para mejorar el rendimiento.

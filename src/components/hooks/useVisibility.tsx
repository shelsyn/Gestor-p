import { useEffect, useState } from "react";

// Define la función useVisibility que toma un array de elementos HTMLElement y una función opcional fnClose.
const useVisibility = (elements: HTMLElement[], fnClose?: () => void) => {
  // Utiliza el hook useState para crear un estado elementIsVisible que comienza en false.
  const [elementIsVisible, setElementIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Define una función checkClick que se ejecutará cuando se haga clic en cualquier parte del documento.
    const checkClick = (e: MouseEvent) => {
      if (!elements) return;

      // Comprueba si se hizo clic fuera de todos los elementos en el array.
      const clickedOutsideElement = elements.every((element) => {
        if (!element) return false;
        if (
          e.target !== element &&
          !element.contains(e.target as HTMLElement)
        ) {
          return true;
        }
        return false;
      });

      // Si se hizo clic fuera de los elementos, establece elementIsVisible en false y, si se proporciona fnClose, ejecuta esa función.
      if (clickedOutsideElement) {
        setElementIsVisible(false);
        if (fnClose) fnClose();
      }
    };

    // Agrega un event listener para escuchar los clics en el documento.
    document.addEventListener("click", checkClick);

    // Devuelve una función que removerá el event listener cuando el componente se desmonte o cuando los elementos o fnClose cambien.
    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, [elements, fnClose]);

  // Define dos funciones: closeElement para ocultar el elemento y showElement para mostrarlo.
  const closeElement = () => {
    setElementIsVisible(false);
  };

  const showElement = () => {
    setElementIsVisible(true);
  };

  // Devuelve un objeto con el estado de visibilidad y las funciones para mostrar y ocultar el elemento.
  return { elementIsVisible, closeElement, showElement };
};

// Exporta la función useVisibility como el valor predeterminado del módulo.
export default useVisibility;

const useDate = (date: string): string => {
  // Crea un objeto Date a partir de la cadena de fecha proporcionada, reemplazando guiones por barras.
  const fullDate: Date = new Date(date.replaceAll("-", "/"));

  // Obtiene el año, mes y día de la fecha.
  const year: number = fullDate.getFullYear();
  const month: number = fullDate.getMonth() + 1; // Se suma 1 porque los meses en JavaScript se indexan desde 0.
  const day: number = fullDate.getDate();

  // Formatea la fecha en el formato "MM/DD/AAAA" usando padStart para agregar ceros a la izquierda si es necesario.
  const dateFormated: string =
    month.toString().padStart(2, "0") +
    "/" +
    day.toString().padStart(2, "0") +
    "/" +
    year;

  // Devuelve la fecha formateada.
  return dateFormated;
};

export default useDate;

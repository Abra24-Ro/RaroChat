export const formatDate = (date?: Date | string | null) => {
  if (!date) return "—";

  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";

  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("EN-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

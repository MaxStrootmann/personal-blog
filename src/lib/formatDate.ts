export default function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

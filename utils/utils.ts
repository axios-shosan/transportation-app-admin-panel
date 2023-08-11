export function parseDate(date: Date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatTime(date: Date): string {
	const hour = date.getHours().toString().padStart(2, '0');
	const minute = date.getMinutes().toString().padStart(2, '0');
	const second = date.getSeconds().toString().padStart(2, '0');
	return `${hour}:${minute}:${second}`;
}

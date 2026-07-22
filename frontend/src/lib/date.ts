/**
 * Форматирует дату в удобочитаемую строку на русском языке.
 * Возвращает "сегодня", "вчера", "завтра" для соответствующих дат,
 * иначе возвращает дату в формате "день месяц год" (год опускается, если он текущий).
 *
 * @param date  - Дата для форматирования
 * @returns {string} Строка с отформатированной датой
 *
 * @example
 * // Если сегодня 2026-05-20
 * getFormattedDateString(new Date('2026-05-20')) // "сегодня"
 * getFormattedDateString(new Date('2026-05-19')) // "вчера"
 * getFormattedDateString(new Date('2026-05-21')) // "завтра"
 * getFormattedDateString(new Date('2025-12-31')) // "31 декабря 2025"
 * getFormattedDateString(new Date('2026-01-15')) // "15 января" (год опущен)
 */
export function getFormattedDateString(date: Date): string {
	// Вспомогательная функция: начало дня (00:00:00)
	const getStartOfDay = (d: Date): Date => {
		const copy = new Date(d.getTime());
		copy.setHours(0, 0, 0, 0);
		return copy;
	};

	const currentDate = new Date(date.getTime());
	const today = new Date();

	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	// Начало дня для today, yesterday, tomorrow и переданной даты
	const startOfToday = getStartOfDay(today);
	const startOfYesterday = getStartOfDay(yesterday);
	const startOfTomorrow = getStartOfDay(tomorrow);
	const startOfCurrentDay = getStartOfDay(currentDate);

	const isCurrentYear = currentDate.getFullYear() === today.getFullYear();

	// Сравниваем timestamp начала дня
	if (startOfCurrentDay.getTime() === startOfToday.getTime()) {
		return 'сегодня';
	} else if (startOfCurrentDay.getTime() === startOfYesterday.getTime()) {
		return 'вчера';
	} else if (startOfCurrentDay.getTime() === startOfTomorrow.getTime()) {
		return 'завтра';
	} else {
		return currentDate.toLocaleDateString('ru', {
			day: 'numeric',
			month: 'long',
			year: isCurrentYear ? undefined : 'numeric',
		});
	}
}
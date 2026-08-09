/**
 * Записывает данные в LocalStorage.
 * @param key - Ключ хранилища
 * @param value - Данные для сохранения
 */
export function setLocalStorage(key: string, value: unknown): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error('Ошибка при сохранении в localStorage:', error);
	}
}

/**
 * Получает значение из локального хранилища.
 * @param key - Ключ хранилища
 * @returns Расшифрованные данные или null
 */
export function getFromLocalStorage<T>(key: string): T | null {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : null;
}

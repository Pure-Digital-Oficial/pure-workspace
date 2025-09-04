export function setItemLocalStorageService<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

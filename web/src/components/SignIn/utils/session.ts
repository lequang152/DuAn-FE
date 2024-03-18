export function saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function loadFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || "{}")
}

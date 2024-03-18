export const SURVEY_KEY = process.env.STORAGE_SURVEY || "survey"
export const SURVEY_AUDIO_KEY = process.env.STORAGE_AUDIO_KEY || "audio"
export const SURVEY_INPUT_KEY = process.env.STORAGE_INPUT_KEY || "current_input"

export class LocalStorageService {
    private KEY = "survey_data"
    private storage: Storage = localStorage
    public constructor(storage: Storage, key: string = "") {
        this.KEY = key
        this.storage = storage
    }

    private static _instance: LocalStorageService

    public static getLocalStorageInstance(storage: Storage = localStorage) {
        if (this._instance) {
            return this._instance
        }
        return new LocalStorageService(storage, SURVEY_KEY)
    }

    private insertNestedValue(keys: string[], key: string, value: any, data: any) {
        if (keys.length == 1) {
            const lastIndex = keys[0]
            const _x = {
                ...data,
                [lastIndex]: {
                    ...data[lastIndex],
                    [key]: value,
                },
            }
            return _x
        }
        if (keys.length == 0) {
            data[key] = value
            return data
        }
        const currentKey = keys[0]
        keys = keys.slice(1)

        if (!(currentKey in data)) {
            data[currentKey] = {}
        }

        data[currentKey] = this.insertNestedValue(keys, key, value, data[currentKey])
        return data
    }

    public set(keys: string[] | string, key: string, data: any) {
        if (typeof keys == "string") {
            keys = [keys]
        }
        let valueInStorage = JSON.parse(this.storage.getItem(this.KEY) || "{}")
        const _value = this.insertNestedValue(keys, key, data, valueInStorage)
        this.storage.setItem(this.KEY, JSON.stringify(_value))
        return _value
    }

    public get(keys: string[] | string) {
        if (typeof keys == "string") {
            keys = [keys]
        }

        let data = JSON.parse(this.storage.getItem(this.KEY) || "{}")
        let temp: any

        for (let i of keys) {
            temp = data[i]
            if (!temp) {
                return temp
            }
            data = temp
        }

        return temp
    }

    public remove(keys: string[] | string, stopKey: string) {
        return this.set(keys, stopKey, undefined)
    }
}

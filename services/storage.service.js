import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs'

const filePath = join(homedir(), 'weather-data.json')

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

// Повторение кода намеренно
export const saveKeyValue = async (key, value) => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data))
}

// Повторение кода намеренно
export const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }

    return undefined;
}

const isExist = async (path) => {
    try {
        await promises.stat(filePath)
        return true
    } catch (e) {
        console.error(e.message)
    }
}
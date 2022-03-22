#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        // get raw data
        const weather = await getWeather(city)
        // print formatted data
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (e) {
        console.error(e.message)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.h) {
        return printHelp()
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForecast()
}

initCLI();
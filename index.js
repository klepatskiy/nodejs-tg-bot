import TelegramBot from 'node-telegram-bot-api'
import bodyParser from 'body-parser'
import express from 'express'
import axios from 'axios';

const TOKEN = '313966249:AAF7yyifZ8oeUcYMxGmZVFqZWx_ygKiu2PU'
const SERVER_URL = 'https://71c8-37-204-100-117.ngrok.io'
const TELEGRAM_API = 'https://api.telegram.org/bot' + TOKEN
const URI = '/webhook/' + TOKEN
const WEBHOOK_URL = SERVER_URL + URI

const bot = new TelegramBot(TOKEN)
const app = new express()

app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(TELEGRAM_API + '/setWebhook?url=' + WEBHOOK_URL)
    await bot.setMyCommands([
        {command: '/help', description: 'Помощь'},
        {command: '/start', description: 'start'},
        {command: '/yandex', description: 'kontora'},
    ])
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body)
    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    if (text === '/help') {
        await bot.sendMessage(chatId, 'Тут больше нет команд, бот обезьяничает')
    } else if (text === '/start') {
        await bot.sendMessage(chatId, 'Привет')
    } else if (text === '/yandex') {
        await bot.sendMessage(chatId, 'kontora horoshih lud')
    } else {
        await bot.sendMessage(chatId, text)
    }

    return res.send()
})

app.listen(process.env.PORT || 3000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 3000)
    await init()
})

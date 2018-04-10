import TelegramBot from 'node-telegram-bot-api'
import {category, post, sequelize} from "../model";
require('dotenv').config()
const bot = new TelegramBot(process.env.TELEGRAM_BOT, {polling: true})
export const telPost = () => {
	post.findAll(
		{
			where: {
				telegramSend: 0
			},
			order: [['createdAt', 'ASC']],
			include: [
				{
					model: category
				}
			]
		}).then(items => {
		items.map(item => {
			const message = '<i style="font-size: 20px">' + item.title + '</i><b>' + item.shortText + '...</b>'
			const options = {
				parse_mode: 'html',
				reply_markup: JSON.stringify({
					inline_keyboard: [
						[{text: 'Перейти и прочитать полностью', url: 'http://mirror-universe.ru' + '/' + item.cat.alias + '/' + item.alias}]
					]
				})
			}
			bot.sendMessage('@zerkalnaya_vselenayaa', message, options).then((status) => {
				item.update({
					telegramSend: 1
				}).then(msg => {
					console.log('Успешно обновленно')
				})
			}).catch((err) => {
				console.log(err)
			})
		})
	})
}
export default bot
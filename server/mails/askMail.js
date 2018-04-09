import nodemailer from 'nodemailer'
const mail = nodemailer.createTransport({
	host: 'smtp.yandex.ru',
	port: 465,
	secure: 'ssl',
	auth: {
		user: 'xolms@bmb-design.ru',
		pass: '657216as'
	}
})
export const askMail = (req, res, next) => {
	mail.sendMail({
		from: 'xolms@bmb-desing.ru',
		to: 'xolms@bmb-desing.ru',
		subject: 'Новый вопрос с сайта',
		html: '<p>С сайта пришел новый вопрос<br/>На тему ' + req.body.theme + '<br/> Имя отправителя: ' + req.body.name + '<br/>E-mail для обратной связи: '+ req.body.email + 'Вопрос: '+ req.body.message + '</p>'
	}, (error, response) => {
		if (error) {
			console.log(error)
			res.json({status: false, message: 'Ошибка при отправке'})
		}
		else {
			res.json({status: true , message: 'Сообщение успешно отправленно'})
		}

	})
}
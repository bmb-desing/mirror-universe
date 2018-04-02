import { Router } from 'express'
const router = Router()
const category = [
	{
		alias: '/katastrofy',
		name: 'Катастрофы'
	},
	{
		alias: 'politica',
		name: 'Политика'
	},
	{
		alias: 'vojny',
		name: 'Войны'
	},
	{
		alias: 'kriminal',
		name: 'Криминал'
	},
	{
		alias: 'bolezni',
		name: 'Болезни'
	},
	{
		alias: 'zdorove',
		name: 'Здоровье'
	},
	{
		alias: 'ekologiya',
		name: 'Экология'
	},
	{
		alias: 'tekhologii',
		name: 'Технологии'
	},
	{
		alias: 'tvorchestvo',
		name: 'Творчество'
	},
	{
		alias: 'soznanie',
		name: 'Сознание'
	}

]

router.get('/categories', function (req, res, next) {
	res.json(category)
})

/* GET user by ID. */
router.get('/categories/:id', function (req, res, next) {
	const id = parseInt(req.params.id)
	if (id >= 0 && id < users.length) {
		res.json(users[id])
	} else {
		res.sendStatus(404)
	}
})

export default router
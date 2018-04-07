import { Router } from 'express'
import {category} from "../model"

const router = Router()


router.get('/categories', function (req, res, next) {
	category.findAll().then(categories => {
		res.json(categories)
	})
})


export default router
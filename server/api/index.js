import { Router } from 'express'
import {category} from "../model"
import posts from './posts'
const router = Router()

// Add USERS Routes

router.use(posts)
router.get('/sitemap', function (req, res, next) {
    category.findAll({include: [{model: post}]}).then((cat) => {
        res.json(cat)
    })
})
export default router

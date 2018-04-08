import { Router } from 'express'

import users from './users'
import categories from './category'
import posts from './posts'
import {category, post} from "../model";
const router = Router()
// Add USERS Routes
router.use(users)
router.use(categories)
router.use(posts)
router.get('/sitemap', function (req, res, next) {
    var pages = []
    category.findAll({include: [{model: post}]}).then(cats => {
        cats.map(cat => {
            cat.posts.map(post => {
                return pages.push('/' + cat.alias + '/' + post.alias)
            })
            return pages.push('/' + cat.alias)

        })
        res.json(pages)

    })
})

export default router

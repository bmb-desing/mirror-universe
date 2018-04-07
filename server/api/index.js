import { Router } from 'express'

import users from './users'
import categories from './category'
import posts from './posts'
const router = Router()

// Add USERS Routes
router.use(users)
router.use(categories)
router.use(posts)
export default router

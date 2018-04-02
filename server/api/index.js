import { Router } from 'express'

import users from './users'
import categories from './category'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(categories)

export default router

import {category, post} from "../model"
const sitemap = category.findAll({include: [{model: post}]})
export default sitemap

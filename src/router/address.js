import Router from 'koa-router'

import CitiesController from '../controller/city/cities'
import SearchController from '../controller/city/search'

const router = new Router()

router.get('/cityes', CitiesController.cityes)
router.get('/search', SearchController.search)

export default router
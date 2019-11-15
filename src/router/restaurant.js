import Router from 'koa-router'

import RestaurantCateController from './../controller/restaurant'

const router = new Router()

router.get('/homeCategory', RestaurantCateController.getHomeCategory)
router.get('/getRestaurants', RestaurantCateController.getRestaurants)

export default router
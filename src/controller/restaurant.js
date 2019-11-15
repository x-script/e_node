import AddressController from './Address'
import CategoryController from './category'
import HomeCategory from './../model/homeCategory'
import RestaurantModel from './../model/restaurant'

class Restaurant extends AddressController {
  constructor() {
    super()

    this.getHomeCategory = this.getHomeCategory.bind(this)
    this.getRestaurants = this.getRestaurants.bind(this)
  }

  /**
   * 获取首页分类信息
	 * @return {Object} home_category_info
   */
  async getHomeCategory(ctx) {
    try {
      let home_category_info = await HomeCategory.find({}, '-_id')

      ctx.body = {
        code: 0,
        message: '',
        data: home_category_info
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        message: '获取数据失败'
      }
    }
  }

  async getRestaurants(ctx) {
    const {
			latitude,
      longitude,
      paging_count,
      paging_pages,
      keyword,
			restaurant_category_id,
			restaurant_category_ids,
			sort,
			extras,
			delivery_mode,
			support_ids
    } = ctx.query
    let query_where = {}
    let query_sort = {}
    let query_offset = Number(paging_count) * (Number(paging_pages) - 1)
    let origin = `${latitude},${longitude}`
    let destination = ''
    let restaurants_data

    let reg_keyword = new RegExp(keyword, 'i')

    // 检测
    if (Number(paging_pages) <= 0) {
      ctx.body = {
        code: 1,
        message: `paging_pages 参数错误`
      }

      return
    }

    // 关键字搜索
    if (keyword) {
      Object.assign(query_where, {
        $or: [
          {name: {$regex: reg_keyword}}
        ]
      })
    }

    // 排序
    switch (Number(sort)) {
      case 1:
        Object.assign(query_sort, {minimum_consumption: 1})
        break
      case 2:
        Object.assign(query_where, {location: {$near: [longitude, latitude]}})
        break
      case 3:
        Object.assign(query_sort, {rating: -1})
        break
      case 5:
        Object.assign(query_where, {location: {$near: [longitude, latitude]}})
        break
      case 6:
        Object.assign(query_sort, {recent_order_num: -1})
        break
    }
    
    try {
      restaurants_data = await RestaurantModel
        .find(query_where, {'__v': 0})
        .sort(query_sort)
        .limit(Number(paging_count))
        .skip(query_offset)

      // 测距参数范式
      if (restaurants_data.length > 0) {
        restaurants_data.forEach((item, index) => {
          let separator = (index === restaurants_data.length -1) ? '' : '|'

          destination += `${item.latitude},${item.longitude}${separator}`
        })
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        message: '获取数据失败'
      }
    }

    try {
      if (restaurants_data.length <= 0) return

      // let distances_data = await this.getDistance(origin, destination)
      var distances_data = [ { distance: '1744.7公里', order_duration_time: '18小时41分钟' } ]
      // console.log(distances_data)
      // ctx.body = {
      //   code: 0,
      //   message: '',
      //   data: distances_data
      // }
      // return
      // 测距结果合并
      restaurants_data.map((item, index) => {
        console.log(index, distances_data[index])
        return Object.assign(item, distances_data[index])
      })
    } catch (error) {
      // 优化百度地图达到上限后会导致加车失败
			restaurants_data.map((item, index) => {
				return Object.assign(item, {
          distance: '10公里',
          order_duration_time: '40分钟'
        })
			})
    }

    try {
      ctx.body = {
        code: 0,
        message: '',
        data: restaurants_data
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        message: '获取数据失败'
      }
    }
  }
}

export default new Restaurant()
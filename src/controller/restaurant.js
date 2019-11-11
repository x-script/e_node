import AddressController from './Address'
import HomeCategory from './../model/homeCategory'

class Restaurant extends AddressController {
  constructor() {
    super()

    this.getHomeCategory = this.getHomeCategory.bind(this)
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
    try {
      
    } catch (error) {
      
    }
  }
}

export default new Restaurant()
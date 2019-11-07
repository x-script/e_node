import AddressController from './../Address'
import CitiesController from './cities'
import CityModel from './../../model/city'

class Search extends AddressController {
  constructor() {
    super()

    this.search = this.search.bind(this)
  }

  /**
   * 
   * @query {String} city_id, keyword
   * @return {Object} searchAddress
   */
  async search(ctx) {
    let {city_id, keyword} = ctx.query

    if (keyword === '') {
      ctx.body = {
        code: 9,
        message: '参数错误'
      }

      return
    } else if (isNaN(city_id)) {
      try {
        const city_name_pinyi = await CitiesController.getCityName(ctx.req)
        const city_info = await CityModel.cityGuess(city_name_pinyi)

        city_id = city_info.id
      } catch (error) {
        ctx.body = {
          code: 1,
          message: '获取数据失败'
        }
      }
    }

    try {
      const city_info = await CityModel.getCityById(city_id)
      const search_address_info = await this.searchAddress(city_info.name, keyword)
      const searchAddress = []

      search_address_info.data.forEach((item, index) => {
        searchAddress.push({
					name: item.title,
					address: item.address,
					latitude: item.location.lat,
					longitude: item.location.lng,
					geohash: `${item.location.lat}, ${item.location.lng}`,
				})
      })

      ctx.body = {
        code: 0,
        message: '',
        data: searchAddress
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        message: '获取地址信息失败'
      }
    }
  }
}

export default new Search()
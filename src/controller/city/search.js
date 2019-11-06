import AddressController from './../Address'
import CitiesController from './cities'
import CityModel from './../../model/city'

class Search extends AddressController {
  constructor() {
    super()

    this.search = this.search.bind(this)
  }

  async search(ctx) {
    let {_city_id, _keyword} = ctx.query

    if (_keyword === '') {
      ctx.body = {
        code: 9,
        message: '参数错误'
      }

      return
    } else if (isNaN(_city_id)) {
      try {
        const _city_pinyi = await CitiesController.getCityName(ctx.req)
        const _city_info = await CityModel.cityGuess(_city_pinyi)

        _city_id = _city_info.id
      } catch (error) {
        console.log(`搜索地址时，获取定位城失败 ${JSON.stringify(error)}`)
        ctx.body = {
          code: 1,
          message: `获取数据失败 ${error}`
        }
      }
    }

    try {
      const _city_info = await CityModel.getCityById(_city_id)
      const _search_info = await this.searchPath(_city_info.name, _keyword)
      const searchPath = []

      _search_info.data.forEach((item, index) => {
        searchPath.push({
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
        data: searchPath
      }
    } catch (error) {
      console.log(`获取地址信息失败 ${JSON.stringify(error)}`)
      ctx.body = {
        code: 1,
        message: `获取地址信息失败 ${error}`
      }
    }
  }
}

export default new Search()
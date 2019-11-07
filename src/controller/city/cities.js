import pinyin from 'pinyin'
import AddressController from '../Address'
import CityModel from '../../model/city'

class Cityes extends AddressController {
  constructor() {
    super()

    this.cityes = this.cityes.bind(this)
    this.getCityName = this.getCityName.bind(this)
  }

  /**
   * 获取城市信息
   * @query {String} type guess | hot | group
	 * 		guess - 定位城市
	 * 		hot - 热门城市
	 * 		group - 所有城市
	 * @return {Object} cityInfo
   */
  async cityes(ctx) {
    let type = ctx.query.type
    let cityInfo = null

		try {
			switch (type) {
				case 'guess':
          const city_name_pinyi = await this.getCityName(ctx.req)

					cityInfo = await CityModel.cityGuess(city_name_pinyi)
					break
				case 'hot':
					cityInfo = await CityModel.cityHot()
					break
				case 'group':
					cityInfo = await CityModel.cityGroup()
					break
				default:
					ctx.body = {
						code: 9,
						message: '参数错误'
					}
					return
			}
			
			ctx.body = {
				code: 0,
				message: '',
				data: cityInfo
			}
		} catch(error) {
			ctx.body = {
				code: 1,
				message: '获取数据失败'
			}
		}
  }

	/**
	 * 获取城市名称（拼音）
	 * @return {String} cityName 
	 */
  async getCityName(req) {
		try {
			const position_info = await this.guessPosition(req)
			// 汉字转换成拼音
	    const pinyin_arr = pinyin(position_info.city, {
		  	style: pinyin.STYLE_NORMAL
			})
			let cityName = ''

			pinyin_arr.forEach(item => {
				cityName += item[0]
			})

			return cityName
		} catch (error) {
			return 'beijing'
		}
	}
}

export default new Cityes()
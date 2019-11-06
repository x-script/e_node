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
   * @query {String} type: guess-定位城市，hot-热门城市，group-所有城市
   */
  async cityes(ctx) {
    let _type = ctx.query.type
    let cityInfo = null

		try {
			switch (_type) {
				case 'guess':
          const _city_pinyi = await this.getCityName(ctx.req)

					cityInfo = await CityModel.cityGuess(_city_pinyi)
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
			console.log(`获取数据失败 ${JSON.stringify(error)}`)
			ctx.body = {
				code: 1,
				message: '获取数据失败'
			}
		}
  }

	// 获取城市名称（拼音）
  async getCityName(req) {
		try {
			const _position_result = await this.guessPosition(req)
			// 汉字转换成拼音
	    const _pinyin_arr = pinyin(_position_result.city, {
		  	style: pinyin.STYLE_NORMAL
			})
			let cityName = ''

			_pinyin_arr.forEach(item => {
				cityName += item[0]
			})

			return cityName
		} catch (error) {
			return 'beijing'
		}
	}
}

export default new Cityes()
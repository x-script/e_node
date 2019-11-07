import BaseController from './Base'

export default class AddressController extends BaseController {
  constructor() {
    super()

    this.tencentkey1 = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL'
		this.tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X'
		this.tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN'
		this.tencentkey4 = 'Z2BBZ-QBSKJ-DFUFG-FDGT3-4JRYV-JKF5O'
  }

  //获取定位地址
	async guessPosition(req) {
    const DEFAULT_IP = '180.158.102.141'
    const POSITION_URL = 'https://apis.map.qq.com/ws/location/v1/ip'
    let ip = ''
    let ip_arr = []
    let position_info = ''

    if (process.env.NODE_ENV === 'development') ip = DEFAULT_IP

    try {
      ip = req.headers['x-forwarded-for'] 
        || req.connection.remoteAddress 
        || req.socket.remoteAddress 
        || req.connection.socket.remoteAddress

      ip_arr = ip.split(':')
        
      ip = ip_arr[ip_arr.length -1] || DEFAULT_IP
    } catch (error) {
      ip = DEFAULT_IP
    }
    
    ip = DEFAULT_IP
    try {
      position_info = await this.fetch(POSITION_URL, {
        ip,
        key: this.tencentkey1
      })

      if (position_info.status !== 0) {
        position_info = await this.fetch(POSITION_URL, {
          ip,
          key: this.tencentkey2
        })
      }

      if (position_info.status !== 0) {
        position_info = await this.fetch(POSITION_URL, {
          ip,
          key: this.tencentkey3
        })
      }

      if (position_info.status !== 0) {
        position_info = await this.fetch(POSITION_URL, {
          ip,
          key: this.tencentkey4
        })
      }

      if (position_info.status === 0) {
        let cityInfo = {
          lat: position_info.result.location.lat,
          lng: position_info.result.location.lng,
          city: position_info.result.ad_info.city
        }

        cityInfo.city = cityInfo.city.replace(/市$/, '')

        return cityInfo
      } else {
        throw new Error(`定位失败 ${JSON.stringify(position_info)}`)
      }
    } catch (error) {
      throw new Error(`定位失败 ${JSON.stringify(error)}`)
    }
  }
  
  // 搜索地址
  async searchAddress(cityName, keyword) {
    const SEARCH_PATH = 'https://apis.map.qq.com/ws/place/v1/search'
    const PAGE_SIZE = 10

    try {
      let search_info = await this.fetch(SEARCH_PATH, {
        key: this.tencentkey1,
        keyword: encodeURIComponent(keyword),
        boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
        page_size: PAGE_SIZE
      })
      
      if (search_info.status !== 0) {
        throw new Error(`搜索位置信息失败 ${JSON.stringify(search_info)}`)
      }

      return search_info
    } catch (error) {
      throw new Error(`搜索位置信息失败 ${JSON.stringify(error)}`)
    }
  }
}
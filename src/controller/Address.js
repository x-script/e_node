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
    let _ip = ''
    let _ip_arr = []
    let _position_result = ''

    if (process.env.NODE_ENV === 'development') ip = DEFAULT_IP

    try {
      _ip = req.headers['x-forwarded-for'] 
        || req.connection.remoteAddress 
        || req.socket.remoteAddress 
        || req.connection.socket.remoteAddress

      _ip_arr = _ip.split(':')
        
      _ip = _ip_arr[_ip_arr.length -1] || DEFAULT_IP
    } catch (error) {
      _ip = DEFAULT_IP
    }
    
    _ip = DEFAULT_IP
    try {
      _position_result = await this.fetch(POSITION_URL, {
        ip: _ip,
        key: this.tencentkey1
      })

      if (_position_result.status !== 0) {
        _position_result = await this.fetch(POSITION_URL, {
          ip: _ip,
          key: this.tencentkey2
        })
      }

      if (_position_result.status !== 0) {
        _position_result = await this.fetch(POSITION_URL, {
          ip: _ip,
          key: this.tencentkey3
        })
      }

      if (_position_result.status !== 0) {
        _position_result = await this.fetch(POSITION_URL, {
          ip: _ip,
          key: this.tencentkey4
        })
      }

      if (_position_result.status === 0) {
        let cityInfo = {
          lat: _position_result.result.location.lat,
          lng: _position_result.result.location.lng,
          city: _position_result.result.ad_info.city
        }

        cityInfo.city = cityInfo.city.replace(/市$/, '')

        return cityInfo
      } else {
        console.log(`定位失败 ${JSON.stringify(_position_result)}`)
        throw new Error(`定位失败 ${JSON.stringify(_position_result)}`)
      }
    } catch (error) {
      console.log(`定位失败 ${JSON.stringify(error)}`)
      throw new Error(`定位失败 ${JSON.stringify(error)}`)
    }
  }
  
  // 搜索地址
  async searchPath(cityName, keyword) {
    const SEARCH_PATH = 'https://apis.map.qq.com/ws/place/v1/search'
    const PAGE_SIZE = 10

    try {
      let searchResult = await this.fetch(SEARCH_PATH, {
        key: this.tencentkey1,
        keyword: encodeURIComponent(keyword),
        boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
        page_size: PAGE_SIZE
      })
      
      if (searchResult.status !== 0) {
        console.log(`搜索位置信息失败 ${JSON.stringify(searchResult)}`)
        throw new Error(`搜索位置信息失败 ${JSON.stringify(searchResult)}`)
      }

      return searchResult
    } catch (error) {
      console.log(`搜索位置信息失败 ${JSON.stringify(error)}`)
      throw new Error(`搜索位置信息失败 ${JSON.stringify(error)}`)
    }
  }
}
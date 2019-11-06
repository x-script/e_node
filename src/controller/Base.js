
import fetch from 'node-fetch'
import Jwt from '../util/Jwt'

export default class BaseController {
  constructor() {
    this.verifyToken = this.verifyToken.bind(this)
  }

  async verifyToken(ctx) {
    let token = ctx.request.header.token
    const jwt = new Jwt(token)
    let verifyToken = jwt.verifyToken()

    if (!verifyToken) throw new Error('身份过期')
  }

  async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
    type = type.toUpperCase()
    resType = resType.toUpperCase()
    let _data = {
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
    }
    
    if (type === 'GET') {
      let _query = ''
      
			Object.keys(data).forEach(key => {
				_query += key + '=' + data[key] + '&'
			})

			if (_query !== '') {
				_query = _query.substr(0, _query.lastIndexOf('&'))
				url = url + '?' + _query
			}
    }
    
    if (type === 'POST') {
			Object.defineProperty(_data, 'body', {
				value: JSON.stringify(data)
			})
    }
    
    try {
      const data_result = await fetch(url, _data)

      if (resType === 'TEXT') {
				return await data_result.text();
			}else{
				return await data_result.json();
      }
    } catch (error) {
      console.log('fetch获取数据失败', error);
			throw new Error(error)
    }
  }
}
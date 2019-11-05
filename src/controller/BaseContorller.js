import Jwt from './../util/Jwt'

export default class BaseController {
  constructor() {
    this.verifyToken = this.verifyToken.bind(this)
  }

  async verifyToken(ctx) {
    let token = ctx.request.header.token
    const jwt = new Jwt(token)
    let verifyToken = jwt.verifyToken()

    if (!verifyToken) throw new Error('身份过期')

    // if (!verifyToken) {
    //   ctx.body = {
    //     code: 0,
    //     message: '身份过期',
    //   }

    //   return false
    // }

    // return true
  }
}
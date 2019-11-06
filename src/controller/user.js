import BaseContorller from './Base'
import UserModel from './../model/user'
import Jwt from './../util/Jwt'

class User extends BaseContorller {
  constructor() {
    super()

    this.signup = this.signup.bind(this)
    this.signin = this.signin.bind(this)
    this.me = this.me.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }

  // 注册
  async signup(ctx) {
    let _data = ctx.request.body
    let _username = data.username

    try {
      let result_find = await UserModel.findOne({username: _username}).exec()

      if (result_find) {
        ctx.body = {
          code: 1,
          message: '用户名重复'
        }
      } else {
        const userModel = new UserModel(_data)

        await userModel.save()

        ctx.body = {
          code: 0,
          message: '注册成功'
        }
      }
    } catch (error) {
      ctx.body = {
        code: 1,
        message: error
      }
    }
  }

  // 登录
  async signin(ctx) {
    let _data = ctx.request.body
    let _username = _data.username
    let _password = _data.password

    try {
      let userModel = new UserModel()
      let result_find = await UserModel.findOne({username: _username}).exec()
      let result_comparePassword = await userModel.comparePassword(_password, result_find.password)
      let userid = result_find.userid

      if (result_find && result_comparePassword) {
        const jwt = new Jwt(_username)
        let token = jwt.generateToken()

        ctx.body = {
          code: 200,
          message: '',
          data: {
            userid: userid,
            token: token
          }
        }
      } else {
        ctx.body = {
          code: 0,
          message: '用户名或密码错误'
        }
      }
    } catch (error) {
      console.log(error)
      
      ctx.body = {
        code: 1,
        message: error
      }
    }
  }

  // 获取登录用户信息接口
  async me(ctx) {
    let _data = ctx.request.body
    let _token = ctx.request.header.token
    // let userid = data.userid
    let _username = _data.username

    try {
      await this.verifyToken(ctx)

      // let result_find = await User.findOne({userid: userid}).exec()
      let _result_find = await UserModel.findOne({username: _username}).exec()

      if (_result_find) {
        let data = {
          portraitUrl: _result_find.portraitUrl,
          nickname: _result_find.nickname
        }

        ctx.body = {
          code: 0,
          message: '',
          data: data
        }
      } else {
        ctx.body = {
          code: 0,
          message: '没有数据',
        }
      }
    } catch (error) {
      console.log(error + '')

      ctx.body = {
        code: 0,
        message: error + '',
      }
    }
  }

  // 修改密码接口
  async changePassword(ctx) {
    let data = ctx.request.body
    let username = data.username
    let oldPassword = data.password
    let newPassword = data.newPassword
    let userModel = new UserModel()

    try {
      await this.verifyToken(ctx)
      let result_find = await UserModel.findOne({username: username}).exec()
      let result_comparePassword = await userModel.comparePassword(oldPassword, result_find.password)

      if (result_find && result_comparePassword) {
        result_find.password = newPassword

        result_find.save()
        // let result_update = await UserModel.update({username: username}, {password: newPassword}).exec()
        // console.log(result_update)

        ctx.body = {
          code: 0,
          message: '修改成功'
        }
      } else if (!result_find) {
        throw new Error('未找到当前用户')
      } else if (!result_comparePassword) {
        throw new Error('密码错误')
      }
    } catch (error) {
      console.log(error + '')

      ctx.body = {
        code: 1,
        message: error + ''
      }
    }
  }
}

export default new User()
import Router from 'koa-router'

import UserController from './../controller/user'

const router = new Router()

/**
 * 注册接口
 * @param {String} username [用户名]
 * @param {String} password [密码]
 */
router.post('/signup', UserController.signup)


/**
 * 登录接口
 * @param {String} username [用户名]
 * @param {String} password [密码]
 */
router.post('/signin', UserController.signin)


/**
 * 获取登录用户信息接口
 * @param {Number} userid [用户 id]
 */
router.post('/me', UserController.me)


/**
 * 修改密码接口
 * @param {String} username [用户 id]
 * @param {String} password [密码]
 * @param {String} newPassword [新密码]
 */
router.post('/changePassword', UserController.changePassword)

export default router
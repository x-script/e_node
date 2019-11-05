import User from './user'

export default router => {
  router.use('/user', User.routes())
  // router.use('/user', User.routes())
}
import User from './user'
import Address from './address'

export default router => {
  router.use('/user', User.routes())
  router.use('/address', Address.routes())
}
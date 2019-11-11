import User from './user'
import Address from './address'
import Restaurant from './restaurant'

export default router => {
  router.use('/user', User.routes())
  router.use('/address', Address.routes())
  router.use('/restaurant', Restaurant.routes())
}
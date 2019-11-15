import AddressController from './Address'
import CategoryModel from './../model/category'

class Category extends AddressController {
  constructor() {
    super()
  }

  async findById(id) {
    try {
      const CateEntity = await CategoryModel.findOne({'sub_categories.id': id});
      console.log(CateEntity)
			let categoName = CateEntity.name;
			CateEntity.sub_categories.forEach(item => {
				if (item.id == id) {
					categoName += '/' + item.name;
				}
			})
			return categoName
    } catch (error) {
      
    }
  }
}
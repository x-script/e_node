import Mongoose from 'mongoose'
import categoryData from './../InitData/category'

const categorySchema = new Mongoose.Schema({

})

const CategoryModel = Mongoose.model('CategoryModel', categorySchema)

CategoryModel.findOne((error, data) => {
  if (!data) {
    for (let i = 0; i < categoryData.length; i++) {
			CategoryModel.create(categoryData[i])
		}
  }
})

export default CategoryModel
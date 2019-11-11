import Mongoose from 'mongoose'
import homeCategory from './../InitData/entry'

const HomeCategorySchema = new Mongoose.Schema({
  id: Number,
	is_in_serving: Boolean,
	description: String,
	title: String,
	link: String,
	image_url: String,
	icon_url: String,
  title_color: String
})

const HomeCategory = Mongoose.model('HomeCategory', HomeCategorySchema)

HomeCategory.findOne((error, data) => {
	if (!data) {
		for (let i = 0; i < homeCategory.length; i++) {
			HomeCategory.create(homeCategory[i])
		}
	}
})

export default HomeCategory
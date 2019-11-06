import Mongoose from 'mongoose'
import citiesData from '../InitData/cities'

const citySchema = new Mongoose.Schema({
  data: {}
})

// 定位城市信息
citySchema.statics.cityGuess = function(name) {
	return new Promise(async (resolve, reject) => {
    const _toUpperCase_alphabet = name.substr(0, 1).toUpperCase()
    
		try {
      const _cities_result = await this.findOne()
      
			Object.entries(_cities_result.data).forEach(item => {
				if (item[0] === _toUpperCase_alphabet) {
					item[1].forEach(cityItem => {
						if (cityItem.pinyin === name) {
							resolve(cityItem)
						}
					})
				}
			})
		} catch (error) {
			console.log(`查找数据失败 ${JSON.stringify(error)}`)
			reject(`查找数据失败 ${JSON.stringify(error)}`)
		}
	})
}

// 热门城市列表
citySchema.statics.cityHot = function() {
	return new Promise(async (resolve, reject) => {
		try {
      const _cities_result = await this.findOne()
      
			resolve(_cities_result.data.hotCities)
		} catch (error) {
			console.log(`查找数据失败 ${JSON.stringify(error)}`)
			reject(`查找数据失败 ${JSON.stringify(error)}`)
		}
	})
}

// 城市列表
citySchema.statics.cityGroup = function() {
	return new Promise(async (resolve, reject) => {
		try {
			const _cities_result = await this.findOne()
			let citiesGroup = _cities_result.data

			delete(citiesGroup.hotCities)
			resolve(citiesGroup)
		} catch (error) {
			console.log(`查找数据失败 ${JSON.stringify(error)}`)
			reject(`查找数据失败 ${JSON.stringify(error)}`)
		}
	})
}



// 获取城市信息
citySchema.statics.getCityById = function(city_id) {
	return new Promise(async (resolve, reject) => {
		try {
			let _cities_result = await this.findOne()

			Object.entries(_cities_result.data).forEach(item => {
				if (item[0] !== '_id' && item[0] !== 'hotCities') {
					item[1].forEach(cityItem => {
						if (cityItem.id === +city_id) {
							resolve(cityItem)
						}
					})
				}
			})
		} catch (error) {
			console.log(`查找数据失败 ${JSON.stringify(error)}`)
			reject(`查找数据失败 ${JSON.stringify(error)}`)
		}
	})
}

const CityModel = Mongoose.model('City', citySchema)

CityModel.findOne((error, data) => {
  if (!data) {
    CityModel.create({data: citiesData})
  }
})

export default CityModel
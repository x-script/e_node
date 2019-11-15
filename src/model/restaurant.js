import Mongoose from 'mongoose'

const restaurantSchema = new Mongoose.Schema({
  activities: [{
		description: String,
		icon_color: String,
		icon_name: String,
		id: Number,
		name: String,
	}],
	address: String,
	delivery_mode: {
		color: String,
		id: Number,
		is_solid: Boolean,
		text: String
	},
	description: { type: String, default: "" },
	order_duration_time: { type: String, default: "" },
	distance: { type: String, default: "" },
	location:{type:[Number],index: '2d'},
	float_delivery_fee: { type: Number, default: 0 },
	float_minimum_order_amount: { type: Number, default: 0 },
	id: Number,
	category: String,
	identification: {
		company_name: { type: String, default: "" },
		identificate_agency: { type: String, default: "" },
		identificate_date: { type: Date, default: Date.now },
		legal_person: { type: String, default: "" },
		licenses_date: { type: String, default: "" },
		licenses_number: { type: String, default: "" },
		licenses_scope: { type: String, default: "" },
		operation_period: { type: String, default: "" },
		registered_address: { type: String, default: "" },
		registered_number: { type: String, default: "" },
	},
	image_path: { type: String, default: "" },
	is_premium: { type: Boolean, default: false },
	is_new: { type: Boolean, default: false },
	latitude: Number,
	longitude: Number,
	license: {
		business_license_image: { type: String, default: "" },
		catering_service_license_image: { type: String, default: "" },
	},
	name: {
        type: String,
        required: true 
    },
	opening_hours: { type: Array, default: ["08:30/20:30"] },
	phone: {
        type: String,
        required: true 
    },
	piecewise_agent_fee: {
		tips: String
	},
	promotion_info: { type: String, default: "欢迎光临，用餐高峰请提前下单，谢谢" },
	rating: { type: Number, default: 0 },
	rating_count: { type: Number, default: 0 },
	recent_order_num: { type: Number, default: 0 },
	status: { type: Number, default: 0 },
	supports: [{
		description: String,
		icon_color: String,
		icon_name: String,
		id: Number,
		name: String
	}],
})

restaurantSchema.index({ id: 1 }); //primary_key 主键

const RestaurantModel = Mongoose.model('Restaurant', restaurantSchema)

RestaurantModel.findOne((error, data) => {
  if (!data) {
    RestaurantModel.create({
      "name": "北京烤鸭23454566",
      "address": "北京市顺义区",
      "id": 3269,
      "latitude": 30.879755,
      "longitude": 104.239917,
      "location": [
          113.76077,
          34.73822
      ],
      "phone": "000001111",
      "category": "快餐便当/盖浇饭",
      "supports": [
          {
              "description": "已加入“外卖保”计划，食品安全有保障",
              "icon_color": "999999",
              "icon_name": "保",
              "id": 7,
              "name": "外卖保",
              "_id": "5bfc9a30d51a913e8655d397"
          },
          {
              "description": "准时必达，超时秒赔",
              "icon_color": "57A9FF",
              "icon_name": "准",
              "id": 9,
              "name": "准时达",
              "_id": "5bfc9a30d51a913e8655d396"
          },
          {
              "description": "该商家支持开发票，请在下单时填写好发票抬头",
              "icon_color": "999999",
              "icon_name": "票",
              "id": 4,
              "name": "开发票",
              "_id": "5bfc9a30d51a913e8655d395"
          }
      ],
      "status": 0,
      "recent_order_num": 100,
      "rating_count": 218,
      "rating": 5,
      "promotion_info": "欢迎光临，用餐高峰请提前下单，谢谢",
      "piecewise_agent_fee": {
          "tips": "配送费约¥5"
      },
      "opening_hours": [
          "06:30/09:00"
      ],
      "license": {
          "catering_service_license_image": "",
          "business_license_image": ""
      },
      "is_new": true,
      "is_premium": true,
      "image_path": "16e07de610557177.jpg",
      "identification": {
          "registered_number": "",
          "registered_address": "",
          "operation_period": "",
          "licenses_scope": "",
          "licenses_number": "",
          "licenses_date": "",
          "legal_person": "",
          "identificate_date": null,
          "identificate_agency": "",
          "company_name": ""
      },
      "float_minimum_order_amount": 20,
      "float_delivery_fee": 5,
      "distance": "10公里",
      "order_duration_time": "40分钟",
      "description": "00",
      "delivery_mode": {
          "color": "57A9FF",
          "id": 1,
          "is_solid": true,
          "text": "蜂鸟专送"
      },
      "activities": [
          {
              "icon_name": "减",
              "name": "满减优惠",
              "description": "满30减5，满60减8",
              "icon_color": "f07373",
              "id": 1,
              "_id": "5bfc9a30d51a913e8655d398"
          }
      ],
      "__v": 0
    })
  }
})

export default RestaurantModel
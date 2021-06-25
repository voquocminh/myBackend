const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")

const moment = require("moment")


// Schema là lược đồ database
let activities_schema = mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    distance:{
        type: Number,
        default: 0
    },
    time:{
        type: Number,
        default: 0
    },
    avgPace:{
        type: Number,
        default: 0
    },
    calories:{
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        default:  Date.now()+25200000 // date.now ở múi giờ UTC 00:00 , cộng thêm 25200000 milisercond ra múi giờ UTC +07:00
    },
    routes:{
        type: Array,
        default: []
    },
    marketOnRoute:{
        type: Array,
        default: []
    },
    level:{
        type: String,
        default: []
    },
    centerCoordinate:{
        latitude:{type: String, default: ""},
        longitude:{type: String, default: ""},
        latituDetal:{type: String, default: ""},
        longituDetal:{type:String, default: ""},
    }     
})


// Xác thực Unique trường duy nhất)
activities_schema.plugin(uniqueValidator)

exports.Activities = mongoose.model("Activities", activities_schema);


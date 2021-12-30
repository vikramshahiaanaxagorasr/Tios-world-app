const mongoose=require('mongoose');
const Schema=mongoose.Schema
const collectionSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:[true,"Please fill the Product Name"]
    },
    slug: {
        type: String,
        required: [true, 'Please fill the Slug Name'],
    },
    products:{
    type:String,
    required: [true, 'Please fill the Product Name']
},
    regularDetails:{
    type:String,
    required:[true, 'Please fill the Regular Details']
},
    organicSubCategoryDetails:{
    type:String,
    required:[true, 'Please fill the product Name']
},
    status:{
    type:Boolean,
    required:true
},
    image:{
    type:String,
    required:true
}
},{timestamps:true})

const collectionModel=mongoose.model('collection',collectionSchema)
module.exports=collectionModel;
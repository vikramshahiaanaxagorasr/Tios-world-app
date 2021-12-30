const { Schema, model } = require("mongoose");
let mongoose = require("mongoose");
// let User = require("./user");
var productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Please fill the product name'],
    },
    slug: {
        type: String,
        required: [true, 'Please fill the product name'],
    },
    category: {
        type: String,
        required: [true, 'Please fill the product category name'],
    },

    url: {
        type: String,
        required: [true, 'Please fill the product Url'],
        lowercase: true,
    },
    product_mrp: {
        type: Number,
        required: [true, 'Please fill the  product mrp '],
    },
    price: {
        type: Number,
        required: [true, 'Please fill the product price'],
    },
    product_code: {
        type: Number,
        required: [true, 'Please fill the product code'],
    },
    short_description: {
        type: String,
        required: [true, 'Please fill the Short Description'],
    },
    description: {
        type: String,
        required: [true, 'Please fill the Description'],
    },
    image: {
        type: String,
        required: [true, 'Please upload image'],
    },
    show_in: {
        type: String,
        required: [true, 'Please upload image'],
    },
    status: {
        type: Boolean,
        enum: [false, true],
        // default: false
    },
    subcategory_id: {
        type: Schema.Types.ObjectId,
        ref: 'subproductlineModel'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const productModel = model('product', productSchema);

productModel.schema.path('product_code').validate(
    {
        validator: async function ()
        {
            const pline = await productModel.findOne({ product_code: this.product_code });
            console.log(pline)
            if (pline)
            {
                if (this._id.toString() == pline._id.toString())
                {
                    return true
                } else
                {
                    return false
                }
            } else
            {
                return true;
            }
        },
        message: 'Category name must be uniuqe'
    }
);



module.exports = productModel
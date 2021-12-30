const { Schema, model } = require("mongoose");
var subproductlineSchema = new Schema({

    category_name: {
        type: String,
        required: [true, 'Please fill the category name'],
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'productlineModel'
    },
    subcategory_name: {
        type: String,
        required: [true, 'Please fill the category name'],
    },
    slug: {
        type: String,
        required: [true, 'Please fill the category name'],
    },
    url: {
        type: String,
        required: [true, 'Please fill the Category Url'],
        lowercase: true,
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
    banner_image: {
        type: String,
        required: [true, 'Please upload image'],
    },

    status: {
        type: Boolean,
        enum: [false, true],
        // default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const subproductlineModel = model('subproductline', subproductlineSchema);


// subproductlineModel.schema.path('category_name').validate(
//     {
//         validator: async function ()
//         {
//             const pline = await productlineModel.findOne({ subcategory_name: this.subcategory_name });
//             console.log(pline)
//             if (pline)
//             {
//                 if (this._id.toString() == pline._id.toString())
//                 {
//                     return true
//                 } else
//                 {
//                     return false
//                 }
//             } else
//             {
//                 return true;
//             }
//         },
//         message: 'Category name must be uniuqe'
//     }
// );


subproductlineModel.schema.path('url').validate(
    {
        validator: async function ()
        {
            const pline = await subproductlineModel.findOne({ url: this.url });
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
        message: 'category url must be unique!'
    }
);

module.exports = subproductlineModel
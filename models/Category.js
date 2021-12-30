const { Schema, model } = require("mongoose");
var productlineSchema = new Schema({

    category_name: {
        type: String,
        required: [true, 'Please fill the category name'],
    },
    slug: {
        type: String,
        required: [true, 'Please fill the category name'],
    },
    subcategories_Id: [{
        type: Schema.Types.ObjectId,
        ref: 'subproductlineModel'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const productlineModel = model('productline', productlineSchema);


productlineModel.schema.path('category_name').validate(
    {
        validator: async function ()
        {
            const pline = await productlineModel.findOne({ category_name: this.category_name });
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


productlineModel.schema.path('slug').validate(
    {
        validator: async function ()
        {
            const pline = await productlineModel.findOne({ slug: this.slug });
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
        message: 'category slug must be unique!'
    }
);

module.exports = productlineModel
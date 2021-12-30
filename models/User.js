const { Schema, model } = require("mongoose");
let mongoose = require("mongoose")
const bcrypt = require("bcrypt");
let jwt = require('jsonwebtoken');
require('dotenv').config();
var userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Please fill the name field'],
    },

    email: {
        type: String,
        required: [true, 'Please fill email field'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, 'Please fill phone number field'],
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        // required: [true, 'Please fill username field'],
        match: [
            /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
            "Username canot have any special charecter and length must be between 6 to 20 charecters"
        ],
    },
    password: {
        type: String,
        // required: [true, 'Please fill the password field'],
    },
    type: {
        type: String,
        enum: ['admin', 'seller', 'user'],
        default: 'user',
        required: [true, 'Please fill the type field'],
    },
    businessName: {
        type: String,
        required: [true, 'Please fill the business name field'],
    },
    tagline: {
        type: String,
        required: [true, 'Please fill the business name field'],
    },
    wesiteURL: {
        type: String,
        required: [true, 'Please fill the business name field'],
    },
    aboutBusiness: {
        type: String,
        required: [true, 'Please fill the business name field'],
    },
    status: {
        type: Boolean,
        enum: [false, true],
        // default: false
    },
    image: {
        type: String,
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

userSchema.pre("validate", async function (next)
{
    if (this.password)
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
});


userSchema.methods.verifyPassword = async function (password)
{
    try
    {
        let result = await bcrypt.compare(password, this.password);

        return result;
    } catch (error)
    {
        return error;
    }
};

userSchema.methods.createToken = async function (password)
{
    try
    {
        let profileData = this;
        let payload = {
            username: profileData.username,
            userID: profileData.id,
            userPassword: password
        };

        let token = await jwt.sign(payload, process.env.TOKEN_KEY);

        return token;
    } catch (error)
    {
        return error;
    }
};

const userModel = model('user', userSchema);

userModel.schema.path('username').validate(
    {
        validator: async function ()
        {
            const user = await userModel.findOne({ username: this.username });
            if (user)
            {
                if (this._id.toString() == user._id.toString())
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
        message: 'A user already exist with this username'
    }
);
userModel.schema.path('email').validate(
    {
        validator: async function ()
        {
            const user = await userModel.findOne({ email: this.email });
            if (user)
            {
                if (this._id.toString() == user._id.toString())
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
        message: 'A user already exist with this email'
    }
);

userModel.schema.path('phone').validate(
    {
        validator: async function ()
        {
            const user = await userModel.findOne({ phone: this.phone });
            if (user)
            {
                if (this._id.toString() == user._id.toString())
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
        message: 'A user already exist with this phone number'
    }
);


module.exports = userModel
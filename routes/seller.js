var express = require('express');
var router = express.Router();
var userModel = require("../models/User");
var ProductlineModel = require("../models/Category")
var Product = require("../models/Product");
const { NotExtended } = require('http-errors');
const auth = require('../middlewares/auth');


router.get('/', async (req, res) =>
{
    res.send("This is seller routes")
})


// adding product by seller
router.post('/product/add', auth.isLoggedIn, async (req, res) =>
{

    try
    {

        req.body.createdBy = req.user.userID;

        let subcategory = await subProductlineModel.find({ subcategory_name: req.body.category });

        req.body.subcategory_id = subcategory[0]._id

        const product = await Product.create(req.body);

        res.json({ product, message: "product created sucessfully" })

    } catch (err)
    {
        res.status(400).json({ success: false, err })

    }

})

//all product list added by the seller

router.get('/product', auth.isLoggedIn, async (req, res) =>
{
    try
    {

        // const type = req.session.type
        const id = req.user.userID;
        const product = await Product.find({ createdBy: id })

        res.json({ product, sucsess: true })

    } catch (err)
    {
        res.status(400).json({ success: false, err })
    };

})


//edit product by seller

router.put("/product/edit/:id", auth.isLoggedIn, async (req, res) =>
{

    try
    {
        const id = req.params.id;

        let subcategory = await subProductlineModel.find({ subcategory_name: req.body.category });

        req.body.subcategory_id = subcategory[0].id;

        let product = await Product.findByIdAndUpdate(id, req.body);

        res.json({ product, message: "product updated Sucessfully" })

    } catch (err)
    {
        res.status(400).json({ success: false, err })
    }

})


//deleting seller product

router.delete("/product/delete/:id", auth.isLoggedIn, async (req, res) =>
{

    try
    {
        const id = req.params.id;

        let data = await Product.deleteOne({ id });

        res.json({ data, success: true })

    } catch (err)
    {
        res.status(400).json({ success: false, err })
    }
})





module.exports = router;
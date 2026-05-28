const express = require('express')
const multer = require('multer')
const path = require('path')
const PRODUCT = require('../models/product')
const { restrictTo } = require('../middleware/auth')
// const fs = require('fs')
const router = express.Router()

const uploadDir = path.join(__dirname, '../productsImages/')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }
}
)

router.post('/add', upload.single('image'), restrictTo(['ADMIN', 'SELLER']), async (req, res) => {
  const { title, description, price, category, stock, brand } = req.body
  const file = req.file
  console.log(req.user, "USER REQ")
  const seller = req.user._id
  // console.log(file)
  if (!title || !description || !price || !category || !stock || !brand) {
    return res.json({ success: false, message: "All fields are mandatory" })
  }
  if (!file) {
    return res.json({ success: false, message: "File is not selected" })
  }
  // console.log(file)
  try {
    await PRODUCT.create({
      seller: seller,
      title: title,
      description: description,
      price: price,
      category: category,
      stock: stock,
      brand: brand,
      images: [`/productsImages/${req.file.filename}`],
    })
    return res.status(200).json({ success: true, message: "Product successfully added" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error!" })

  }
})

router.get('/', async (req, res) => {
  try {
    // console.log(req.query)
    const { limit = 8, page = 1, category, metal } = req.query;
    // console.log(category)
    // console.log(page, "page")
    // console.log(limit, "limit")
    const query = {}
    if (category) query.category = category;
    if (metal) query.brand = metal;

    const products = await PRODUCT.find(query).skip((page - 1) * limit).limit(Number(limit))

    // let products;
    // if (category) {
    //     products = await PRODUCT.find({ category: category }).skip((page-1)*limit).limit(limit);
    // }else if(metal){
    //     products = await PRODUCT.find({ brand: metal }).skip((page-1)*limit).limit(limit);
    // }
    //  else {
    //     products = await PRODUCT.find().skip((page-1)*limit).limit(limit);
    // }
    // const products = await PRODUCT.find({})
    if (!products) {
      return res.json({ success: true, message: "No products available" })
    }

    const total = await PRODUCT.countDocuments(query)
    // console.log("total", total)
    return res.status(200).json({ success: true, message: "Products fetched Successfully", products, page: Number(page), total, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error: ${error}` })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const product = await PRODUCT.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
})

router.post('/:id', async (req, res) => {

  const id = req.params.id
  const { user, name, rating, comment } = req.body;
  console.log(req.body)
  try {
    const prod = await PRODUCT.findByIdAndUpdate({ _id: id }, { $push: { reviews: { user, name, rating, comment } } })
    return res.status(200).json({ success: true, message: "Review added successfully" })

  } catch (error) {
    console.log(error, "Internal server error in adding review")
  }
})


router.post('/delete/:id', restrictTo(['ADMIN', 'SELLER']), async (req, res) => {
  const id = req.params.id
  try {
    console.log(id)
    const ress = await PRODUCT.findByIdAndDelete({ _id: id })
    return res.status(200).json({ success: true, message: "Product Deleted Successfully", ress })
  } catch (error) {
    return res.json({ success: false, message: "Internal Server Error" })
  }
})

router.post('/edit/:id', upload.single("image"), restrictTo(['ADMIN', 'SELLER']), async (req, res) => {
  const id = req.params.id
  const body = req.body
  console.log(body)
  console.log(req.file)
  try {
    if (req.file) {
      body.images = [`/productsImages/${req.file.filename}`]
    }

    const product = await PRODUCT.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )

    console.log(product)

    return res.status(200).json({
      success: true,
      message: "Product Details Updated Successfully",
      product
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
})

router.get('/mine/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const prod = await PRODUCT.find({ seller: id })
    console.log(prod)
    return res.status(200).json({ success: true, message: "Products fetched successfully", prod })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
})

module.exports = router;

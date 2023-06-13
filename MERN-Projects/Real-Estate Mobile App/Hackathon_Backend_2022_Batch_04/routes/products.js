const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const multer = require('multer');

// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg', 
//     'image/jpg': 'jpg'
// };

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if (isValid) {
//             uploadError = null;
//         }
//         cb(uploadError, 'public/uploads');
//     },
//     filename: function (req, file, cb) {
//         const fileName = file.originalname.split(' ').join('-');
//         const extension = FILE_TYPE_MAP[file.mimetype];
//         cb(null, `${fileName}-${Date.now()}.${extension}`);
//     }
// });

// const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    console.log("request up and running")
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') };
    }

    const productList = await Product.find(filter).populate('category');

    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
});

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
});
// uploadOptions.single('image'),
router.post(`/`,  async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    // const file = req.file;
    // if (!file) return res.status(400).send('No image in the request');

    // const fileName = file.filename;
    // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
        tital: req.body.tital,
        location: req.body.location,
        finishType: req.body.finishType,
        noOfBedrooms: req.body.noOfBedrooms,
        noOfBathrooms: req.body.noOfBathrooms,
        livingRooms: req.body.livingRooms,
        reception: req.body.reception,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        area: req.body.area,
        diningRooms: req.body.diningRooms,
        kitchen: req.body.kitchen,
        ownerPhoneNumber: req.body.ownerPhoneNumber
    });

    product = await product.save();

    if (!product) return res.status(500).send('The product cannot be created');

    res.send(product);
});
// uploadOptions.single('image'),
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid Product!');

    // const file = req.file;
    // let imagepath;

    // if (file) {
    //     const fileName = file.filename;
    //     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    //     imagepath = `${basePath}${fileName}`;
    // } else {
    //     imagepath = product.image;
    // }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            tital: req.body.tital,
            location: req.body.location,
            finishType: req.body.finishType,
            noOfBedrooms: req.body.noOfBedrooms,
            noOfBathrooms: req.body.noOfBathrooms,
            livingRooms: req.body.livingRooms,
            reception: req.body.reception,
            // image: imagepath,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
            area: req.body.area,
            diningRooms: req.body.diningRooms,
            kitchen: req.body.kitchen,
            ownerPhoneNumber: req.body.ownerPhoneNumber
        },
        { new: true }
    );

    if (!updatedProduct) return res.status(500).send('the product cannot be updated!');

    res.send(updatedProduct);
});

router.delete('/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {  //this code is extra then tutor code but valid code
        res.status(400).json('Invalid Product Id')
    }

    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: 'the product is deleted!'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'product not found!'
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});

router.get(`/get/count`, async (req, res) => {
    //let count;  //this code is extra then tutor code but valid code
    const productCount = await Product.countDocuments((count) => count);  //({ count: count });

    if (!productCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        productCount: productCount
    });
});

router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    
    const products = await Product.find({ isFeatured: true }).limit(+count);

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

// router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).send('Invalid Product Id');
//     }
//     const files = req.files;
//     let imagesPaths = [];
//     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

//     if (files) {
//         files.map((file) => {
//             imagesPaths.push(`${basePath}${file.filename}`);
//         });
//     }

//     const product = await Product.findByIdAndUpdate(
//         req.params.id, 
//         {
//             images: imagesPaths 
//         },
//         { new: true } 
//     );

//     if (!product) return res.status(500).send('the gallery cannot be updated!');

//     res.send(product);
// });

module.exports = router;

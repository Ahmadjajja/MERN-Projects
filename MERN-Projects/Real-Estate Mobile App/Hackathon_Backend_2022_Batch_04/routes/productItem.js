const {ProductItem} = require('../models/productItem');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const productItemList = await ProductItem.find();

    if(!productItemList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(productItemList);
})

router.get('/:id', async(req,res)=>{
    const productItem = await ProductItem.findById(req.params.id);

    if(!productItem) {
        res.status(500).json({message: 'The productItem with the given ID was not found.'})
    } 
    res.status(200).send(productItem);
})



router.post('/', async (req,res)=>{
    let productItem = new ProductItem({
        quantity: req.body.quantity,
        product: req.body.product
    })
    productItem = await productItem.save();

    if(!productItem)
    return res.status(400).send('the productItem cannot be created!')

    res.send(productItem);
})


router.put('/:id',async (req, res)=> {
    const productItem = await ProductItem.findByIdAndUpdate(
        req.params.id,
        {
            quantity: req.body.quantity,
            product: req.body.product
        },
        { new: true}
    )

    if(!productItem)
    return res.status(400).send('the productItem cannot be created!')

    res.send(productItem);
}) 

router.delete('/:id', (req, res)=>{
    ProductItem.findByIdAndRemove(req.params.id).then(productItem =>{
        if(productItem) {
            return res.status(200).json({success: true, message: 'the productItem is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "productItem not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;
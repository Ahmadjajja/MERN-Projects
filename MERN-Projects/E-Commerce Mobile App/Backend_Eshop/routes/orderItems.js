const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const orderItemList = await OrderItem.find();

    if(!orderItemList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(orderItemList);
})

router.get('/:id', async(req,res)=>{
    const orderItem = await OrderItem.findById(req.params.id);

    if(!orderItem) {
        res.status(500).json({message: 'The orderItem with the given ID was not found.'})
    } 
    res.status(200).send(orderItem);
})



router.post('/', async (req,res)=>{
    let orderItem = new OrderItem({
        quantity: req.body.quantity,
        product: req.body.product
    })
    orderItem = await orderItem.save();

    if(!orderItem)
    return res.status(400).send('the orderItem cannot be created!')

    res.send(orderItem);
})


router.put('/:id',async (req, res)=> {
    const orderItem = await OrderItem.findByIdAndUpdate(
        req.params.id,
        {
            quantity: req.body.quantity,
            product: req.body.product
        },
        { new: true}
    )

    if(!orderItem)
    return res.status(400).send('the orderItem cannot be created!')

    res.send(orderItem);
}) 

router.delete('/:id', (req, res)=>{
    OrderItem.findByIdAndRemove(req.params.id).then(orderItem =>{
        if(orderItem) {
            return res.status(200).json({success: true, message: 'the orderItem is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "orderItem not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;
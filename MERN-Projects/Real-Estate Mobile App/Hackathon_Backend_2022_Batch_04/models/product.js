const mongoose = require('mongoose');
const { Category } = require('./category');
const productSchema = mongoose.Schema({
    tital: { //
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    finishType: { //
        type: String,
        required: true
    },
    noOfBedrooms: { //
        type: Number,
        required: true
    },
    noOfBathrooms: { //
        type: Number,
        required: true
    },
    livingRooms: { //
        type: Number,
        required: true
    },
    reception: { //
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    price : {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    area: {
        type: Number,
        default:0
    },
    diningRooms:{
        type: Number,
        default:0
    },
    kitchen:{
        type: Number,
        default:0
    },
    ownerPhoneNumber:{
        type: String,
        required: true
    }
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);

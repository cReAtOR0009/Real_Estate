const mongoose = require('mongoose');

// Sub-schema for property address
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipcode: String,
});

// Sub-schema for property amenities
const AmenitySchema = new mongoose.Schema({
    swimmingPool: {
        type: Boolean,
        description: '',
        default: false,
    },
    garden: {
        type: Boolean,
        description: '',
        default: false,
    },
    garage: {
        type: Boolean,
        description: '',
        default: false,
    },
    gym: {
        type: Boolean,
        description: { type:String,  maxlength: 200 },
        default: false,
    },
    securitySystem: {
        type: Boolean,
        description: { type:String,  maxlength: 200 },
        default: false,
    },
    balcony: {
        type: Boolean,
        description: { type:String,  maxlength: 200 },
        default: false,
    },
    centralHeating: {
        type: Boolean,
        description: { type:String,  maxlength: 200 },
        default: false,
    },
    airConditioning: {
        type: Boolean,
        description:  { type:String,  maxlength: 200 },
        default: false,
    },
});

// Sub-schema for additional features of the property
const AdditionalFeaturesSchema = new mongoose.Schema({
    name: String,
    description:  { type:String,  maxlength: 200 },
});

// Sub-schema for property ratings
const ratingSchema = new mongoose.Schema({
    value: {
        type: Number,
        min: 1,
        max: 5,
    },
    review: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    default:1
});

// Sub-schema for property historical information
const propertyHistorySchema = new mongoose.Schema({
    previousOwners: [
        {
            name: String,
            contact: String,
        },
    ],
    saleHistory: [
        {
            soldPrice: Number,
            soldDate: Date,
            buyer: String,
        },
    ],
    rentalHistory: [
        {
            rentPrice: Number,
            rentStartDate: Date,
            rentEndDate: Date,
            tenant: String,
        },
    ],
});

// Main property schema
const propertySchema = new mongoose.Schema({
    name: String,
    description:{ type:String,  maxlength: 500 },
    price: Number,
    bedrooms: {
        type: Number,
        min: 0,
        default: 0,
    },
    bathrooms: {
        type: Number,
        min: 0,
        default: 0,
    },
    size: {
        type: Number,
        min: 0,
        default: 0,
    },
    address: addressSchema,
    amenities: AmenitySchema,
    additionalFeatures: [AdditionalFeaturesSchema],
    rating: [ratingSchema],
    images: [
        {
            url: String,
        },
    ],
    propertyType: {
        type: String,
        enum: ['House', 'Apartment', 'Condo', 'Land', 'Commercial', 'Villa'],
    },
    agent: {
        id: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: [String],
    status: {
        type: String,
        enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
        default: 'For Sale',
    },
    virtualTour: {
        url: String,
    },
    propertyHistory: propertyHistorySchema,
    nearbyAmenities: [
        {
            type: String,
        },
    ],
    availability: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Property', propertySchema);


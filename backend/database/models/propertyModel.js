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

});

// Sub-schema for property historical information
const propertyHistorySchema = new mongoose.Schema({
    previousOwners: {
        type: [
            {
                name: String,
                contact: String,
            },
        ],
        default: [],
    },
    saleHistory: {
        type: [
            {
                soldPrice: Number,
                soldDate: Date,
                buyer: String,
            },
        ],
        default: [],
    },
    rentalHistory: {
        type: [
            {
                rentPrice: Number,
                rentStartDate: Date,
                rentEndDate: Date,
                tenant: String,
            },
        ],
        default: [],
    },
});


// Main property schema
const propertySchema = new mongoose.Schema({
    name: String,
    description:{ type:String,  maxlength: 15000 },
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
            // url: String,
        },
    ],
    propertyType: {
        type: String,
        enum: ['House', 'Apartment', 'Condo', 'Land', 'Commercial', 'Villa'],
    },
    agent: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        // ref: String // Assuming 'User' is a Mongoose model with a 'ref' property
    },
    tags: [String],
    status: {
        type: String,
        enum: ['For Sale', 'For Rent', 'Sold', 'Rented', "For Lease", "Leased"],
        default: 'For Sale',
    },
    virtualTour: {
        type: String,
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

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

// module.exports = mongoose.model('Property', propertySchema);


const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street:String,
    city:String,
    state:String,
    zipcode:String,
})

const AmenitySchema = new mongoose.Schema({
    swimmingPool: {
        type: Boolean,
        description: String,
    },
    garden: {
        type: Boolean,
        description: String,
    },
    garage: {
        type: Boolean,
        description: String,
    },
    gym: {
        type: Boolean,
        description: String,
    },
    securitySystem: {
        type: Boolean,
        description: String,
    },
    balcony: {
        type: Boolean,
        description: String,
    },
    centralHeating: {
        type: Boolean,
        description: String,
    },
    airConditioning: {
        type: Boolean,
        description: String,
    },
    // Add more unique amenities with descriptions as needed
});

  const AdditionalFeaturesSchema = new mongoose.Schema({
    fireplace: {
        type: Boolean,
        description: String,
    },
    hardwoodFloors: {
        type: Boolean,
        description: String,
    },
    walkInClosets: {
        type: Boolean,
        description: String,
    },
    updatedKitchen: {
        type: Boolean,
        description: String,
    },
    highCeilings: {
        type: Boolean,
        description: String,
    },
});

const ratingSchema = new mongoose.Schema({
    value: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
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


const propertySchema = new mongoose.Schema({
  title: String,
  description:String,
  price:Number,
  bedrooms: Number,
  bathrooms: Number,
  size:Number,
  address: addressSchema,
  amenities:AmenitySchema,
  additionalFeatures: AdditionalFeaturesSchema,
  rating:[ratingSchema],
  images: [  { type: String},],
  propertyType: {
    type: String,
    enum: ['House', 'Apartment', 'Condo', 'Land', 'Commercial', 'Villa']
  },
  locationTags: [String],
  status: {
    type: String,
    enum: ['For Sale', 'For Rent', 'Sold', 'Rented'],
    default: 'For Sale',
},
virtualTour: String, // URL or reference to virtual tour
propertyHistory: {
    // ... (customize based on your needs)
},
nearbyAmenities: [
    {
        type: String, // e.g., 'School', 'Hospital', 'Park'
    },
],
energyEfficiency: {
    // ... (customize based on your needs)
},
  availability: {
    type: Boolean,
    default: true,},
});

module.exports = mongoose.model('Property', propertySchema);

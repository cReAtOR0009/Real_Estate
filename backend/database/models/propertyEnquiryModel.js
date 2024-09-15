const mongoose = require('mongoose');

// Define the schema for a property enquiry
const propertyEnquirySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email format is invalid'], // Simple email format validation
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, 'Phone number is invalid'], // Example for validating phone numbers
  },
  selectedProperty: {
    type: String,
    required: [true, 'Selected property is required'],
    trim: true,
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a Property document
    ref: 'Property', // Assuming you have a Property model defined
    required: [true, 'Property ID is required'],
  },
  agreeToTerms: {
    type: Boolean,
    required: [true, 'Agreement to terms is required'],
    default: false,
  }, 
  replied:{
    type:Boolean,
    required:true,
    default: false,
  }
 })

 module.exports = mongoose.model("Enquiry", propertyEnquirySchema);

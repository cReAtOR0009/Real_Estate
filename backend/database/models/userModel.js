const mongoose = require('mongoose');

const purchasedProperty = mongoose.Schema({
    name: String,
    id: mongoose.Schema.Types.ObjectId,
});


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    nationality: String,
    avatar:{type:String, default:"image"}, // "image" should be substituted for default image, if user is yet to upload image
    purchasedProperty: [purchasedProperty],
    role: {
        type: String,
        enum: ['buyer', 'seller', 'agent'],
        default:"buyer",
        required: true,
    },
    permissions: {
        type: [String],
    },
}, {
    timestamp: true,
    toObject: {
        transform: (doc, ret, options) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password
            return ret;

        }
    }
});

module.exports = mongoose.model('User', userSchema);
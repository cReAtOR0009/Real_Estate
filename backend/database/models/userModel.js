const mongoose = require("mongoose");
const Property = require("./propertyModel");

const purchasedPropertySchema = mongoose.Schema({
  name: String,
  id: mongoose.Schema.Types.ObjectId,
});

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    password: String,
    nationality: String,
    verified: { type: Boolean, default: false },
    avatar: { type: String, default: "image" }, // "image" should be substituted for default image, if user is yet to upload image
    purchasedProperty: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "agent"],
      default: "buyer",
      required: true,
    },
    permissions: {
      type: [String],
      default: ["level1"],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.virtual("propertyInfo", {
  ref: "Property",
  localField: "purchasedProperty",
  foreignField: "_id",
  justOne: false,
});
module.exports = mongoose.model("User", userSchema);

const constants = require("../constants/index");
const Property = require("../database/models/propertyModel");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const jwt = require("jsonwebtoken");

const serverResponse = constants.serverResponse.defaultResponse;

module.exports.createProduct = async (req, res) => {
  let response = serverResponse;
  try {
    const {
      propertyName,
      description,
      price,
      bedrooms,
      bathrooms,
      size,
      address,
      amenities,
      additionalFeatures,
      propertyType,
      images,
      tags,
      status,
      virtualTour,
      nearbyAmenities,
      availability,
    } = req.body;
    const existingPropertyName = await Property.findOne({ name: propertyName });

    if (existingPropertyName) {
      throw new Error(
        "this property already exist, kindly change prperty name "
      );
    }

    // const {}

    let newProperty = new Property({
      name: propertyName,
      description: description,
      price: price,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      size: size,
      address: address,
      amenities: amenities,
      additionalFeatures: additionalFeatures,
      images: images,
      propertyType: propertyType,
      agent: agent,
      tags: tags,
      status: status,
      virtualTour: virtualTour,
      propertyHistory: propertyHistory,
      nearbyAmenities: nearbyAmenities,
      availability: availability,
    });

 await newProperty.save()

  } catch (error) {}
};
